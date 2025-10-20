import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';
import { translations } from '../translations';

const GEMINI_API_KEY = process.env.API_KEY;

const recipeSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "The creative and appealing name of the recipe." },
        description: { type: Type.STRING, description: "A short, enticing description of the dish." },
        prepTime: { type: Type.STRING, description: "Estimated preparation time, e.g., '15 minutes'." },
        cookTime: { type: Type.STRING, description: "Estimated cooking time, e.g., '30 minutes'." },
        difficulty: { type: Type.STRING, description: "Difficulty level: 'Easy', 'Medium', or 'Hard'." },
        yield: { type: Type.STRING, description: "Number of servings, e.g., '4 servings'." },
        ingredientsList: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    quantity: { type: Type.STRING, description: "Quantity of the ingredient, e.g., '1 cup'." },
                    name: { type: Type.STRING, description: "Name of the ingredient, e.g., 'all-purpose flour'." }
                },
                required: ["quantity", "name"]
            }
        },
        instructions: {
            type: Type.ARRAY,
            description: "Step-by-step cooking guide.",
            items: { type: Type.STRING }
        },
        calories: { type: Type.STRING, description: "Estimated calories per serving, e.g., '450 kcal'." },
        protein: { type: Type.STRING, description: "Estimated protein per serving, e.g., '30g'." },
        carbs: { type: Type.STRING, description: "Estimated carbohydrates per serving, e.g., '45g'." },
        fat: { type: Type.STRING, description: "Estimated fat per serving, e.g., '15g'." },
        variations: {
            type: Type.ARRAY,
            description: "2-3 creative variations for the recipe.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "Title of the variation." },
                    description: { type: Type.STRING, description: "Description of the variation." }
                },
                required: ["title", "description"]
            }
        }
    },
    required: ["title", "description", "prepTime", "cookTime", "difficulty", "yield", "ingredientsList", "instructions", "calories", "protein", "carbs", "fat", "variations"],
};

/**
 * A helper function that uses a reliable model (Gemini) to parse unstructured
 * text into a valid Recipe JSON object. This is used as a fallback.
 */
const convertTextToJson = async (text: string, languageName: string): Promise<Recipe | null> => {
    if (!GEMINI_API_KEY) {
        console.warn("Gemini API key not available for JSON repair attempt.");
        return null;
    }
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const repairPrompt = `You are a data extraction API. Your sole purpose is to convert unstructured recipe text into a structured JSON object that strictly follows the provided schema. Do not add any commentary, explanations, or markdown formatting. Your entire response must be a single, raw JSON object.

The recipe text is written in ${languageName}.

Parse the following text and convert it into the specified JSON format.

RECIPE TEXT TO PARSE:
---
${text}
---

Your response must be a JSON object and nothing else.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: repairPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
                temperature: 0.1, // Low temperature for deterministic output
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText); 
    } catch (e) {
        console.error("JSON repair attempt with Gemini failed.", e);
        return null;
    }
};


const generateFinalPrompt = (
    languageName: string, 
    ingredients: string[], 
    cookingMode: 'regular' | 'dietary', 
    dietaryRestrictions: string
): string => {
    let basePrompt = `You are an expert chef and nutritionist. Create a delicious and easy-to-follow recipe in ${languageName} using ONLY the following ingredients: ${ingredients.join(', ')}. Also provide the number of servings this recipe yields, the estimated prep time, cook time, a difficulty level (Easy, Medium, or Hard), and an estimated nutritional breakdown per serving (calories, protein, carbs, and fat). Be creative. If essential ingredients are missing for a common dish, adapt the recipe or create something new. The recipe should be suitable for a home cook.`;

    if (cookingMode === 'dietary' && dietaryRestrictions.trim() !== '') {
        basePrompt += `\n\n**IMPORTANT:** The recipe MUST strictly adhere to the following dietary needs and restrictions: "${dietaryRestrictions}". Ensure all ingredients, quantities, and preparation methods are fully compliant. If the provided ingredients cannot form a compliant recipe, explain why.`;
    }
  
    return basePrompt + ` Finally, provide 2-3 creative variations of this recipe. These can be different flavor profiles (e.g., spicy, herby), dietary adaptations (e.g., vegetarian, gluten-free), or suggest a different cooking method.`;
}

// --- Gemini-specific Functions ---
const fetchWithGemini = async (finalPrompt: string, generateImage: boolean): Promise<Recipe> => {
    if (!GEMINI_API_KEY) {
        throw new Error("Gemini API key is not configured.");
    }
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    // Step 1: Generate recipe text
    const recipeResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: finalPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: recipeSchema,
            temperature: 0.7,
        },
    });

    const jsonText = recipeResponse.text.trim();
    const parsedRecipe = JSON.parse(jsonText);

    if (!generateImage) {
        return parsedRecipe as Recipe;
    }

    // Step 2: Generate image
    const imagePrompt = `A vibrant, high-quality, professional food photograph of "${parsedRecipe.title}". It should look delicious and appealing, styled to match this description: "${parsedRecipe.description}". Centered on a clean, bright background.`;
    
    const imageResponse = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: imagePrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    const imageBase64 = imageResponse.generatedImages[0].image.imageBytes;
    if (!imageBase64) {
        console.warn("Image generation failed, returning recipe without image.");
        return parsedRecipe as Recipe;
    }

    return { ...parsedRecipe, imageBase64 } as Recipe;
};

// --- OpenRouter-specific Functions ---
const fetchWithOpenRouter = async (
  finalPrompt: string, 
  openRouterKey: string, 
  openRouterModel: string, 
  generateImage: boolean, 
  language: string,
  openRouterImageModel: string,
  negativePrompt: string,
  topP: number,
  presencePenalty: number
): Promise<Recipe> => {
    // Step 1: Generate recipe text using a text model
    const textGenerationBody: any = {
        model: openRouterModel || "google/gemini-flash-1.5",
        messages: [{ role: "user", content: finalPrompt }],
        response_format: { "type": "json_object" },
        temperature: 0.7,
    };
    if (topP !== 1.0) textGenerationBody.top_p = topP;
    if (presencePenalty !== 0) textGenerationBody.presence_penalty = presencePenalty;

    const recipeResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${openRouterKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://pantrychef.ai", // Recommended by OpenRouter
            "X-Title": "Pantry Chef AI", // Recommended by OpenRouter
        },
        body: JSON.stringify(textGenerationBody),
    });

    if (!recipeResponse.ok) {
        const errorData = await recipeResponse.json();
        throw new Error(`OpenRouter API error: ${errorData.error?.message || recipeResponse.statusText}`);
    }

    const recipeData = await recipeResponse.json();
    const jsonText = recipeData.choices[0]?.message?.content;
    
    let parsedRecipe: Recipe;
    try {
        // Attempt to parse directly, assuming the model followed instructions.
        parsedRecipe = JSON.parse(jsonText);
        
        // Basic validation on the parsed object.
        if (!parsedRecipe.title || !parsedRecipe.ingredientsList || !parsedRecipe.instructions) {
             throw new Error('Parsed JSON is missing required recipe fields.');
        }
    } catch (e) {
        console.warn(`Initial JSON parse for model '${openRouterModel}' failed. Attempting to repair the response.`, e);
        
        // Fallback: Use a reliable model (Gemini) to parse the text response into JSON.
        const languageName = translations[language]?.languageName || 'English';
        const repairedRecipe = await convertTextToJson(jsonText, languageName);

        if (!repairedRecipe) {
            console.error("Failed to parse JSON from OpenRouter even after repair attempt.", {
                model: openRouterModel,
                responseText: jsonText,
            });
            const errorMessage = translations[language]?.errorOpenRouterModelResponse || translations['en'].errorOpenRouterModelResponse;
            throw new Error(errorMessage);
        }
        console.log("Successfully repaired and parsed JSON from OpenRouter response.");
        parsedRecipe = repairedRecipe;
    }


    if (!generateImage) {
        return parsedRecipe as Recipe;
    }

    // Step 2: Generate an image using an image model
    const imagePrompt = `A vibrant, high-quality, professional food photograph of "${parsedRecipe.title}". It should look delicious and appealing, styled to match this description: "${parsedRecipe.description}". Centered on a clean, bright background.`;
    
    const imageGenerationBody: any = {
        model: openRouterImageModel || "stabilityai/sdxl",
        prompt: imagePrompt,
        n: 1,
        size: "1024x576", // Aspect ratio close to 16:9
        response_format: "b64_json",
    };

    if (negativePrompt.trim()) {
        imageGenerationBody.negative_prompt = negativePrompt.trim();
    }
    
    try {
        const imageGenResponse = await fetch("https://openrouter.ai/api/v1/images/generations", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openRouterKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://pantrychef.ai",
                "X-Title": "Pantry Chef AI",
            },
            body: JSON.stringify(imageGenerationBody),
        });

        if (!imageGenResponse.ok) {
            console.warn("Failed to generate an image via OpenRouter, returning recipe without image.");
            return parsedRecipe as Recipe;
        }

        const imageData = await imageGenResponse.json();
        const imageBase64 = imageData.data[0].b64_json;
        if (!imageBase64) {
             console.warn("Image data from OpenRouter is missing, returning recipe without image.");
            return parsedRecipe as Recipe;
        }

        return { ...parsedRecipe, imageBase64 } as Recipe;
    } catch(imageError) {
        console.warn("An error occurred during image generation via OpenRouter, returning recipe without image.", imageError);
        return parsedRecipe as Recipe;
    }
};

// --- Main Exported Function ---
export const fetchRecipe = async (
  ingredients: string[], 
  language: string,
  cookingMode: 'regular' | 'dietary',
  dietaryRestrictions: string,
  apiProvider: 'gemini' | 'openrouter',
  openRouterKey: string,
  openRouterModel: string,
  generateImage: boolean,
  openRouterImageModel: string,
  negativePrompt: string,
  topP: number,
  presencePenalty: number
): Promise<Recipe> => {
  const languageName = translations[language]?.languageName || 'English';
  const finalPrompt = generateFinalPrompt(languageName, ingredients, cookingMode, dietaryRestrictions);

  try {
    if (apiProvider === 'openrouter') {
        return await fetchWithOpenRouter(
          finalPrompt, openRouterKey, openRouterModel, generateImage, language, 
          openRouterImageModel, negativePrompt, topP, presencePenalty
        );
    } else {
        // Default to Gemini
        return await fetchWithGemini(finalPrompt, generateImage);
    }
  } catch (error) {
    console.error(`Error generating recipe with ${apiProvider}:`, error);
    const errorMessage = translations[language]?.errorApi || translations['en'].errorApi;
    if (error instanceof Error && error.message.includes('API key')) {
        throw new Error(translations[language]?.errorApiKey || translations['en'].errorApiKey);
    }
    throw new Error(error instanceof Error ? error.message : errorMessage);
  }
};