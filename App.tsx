import React, { useState, useCallback, useEffect } from 'react';
import type { Recipe } from './types';
import { fetchRecipe } from './services/geminiService';
import IngredientInput from './components/IngredientInput';
import RecipeDisplay from './components/RecipeDisplay';
import { ChefHatIcon, BookmarkIcon, CogIcon, LeafIcon, LemonIcon } from './components/icons';
import { BackgroundCarrotIcon, BackgroundTomatoIcon, BackgroundBroccoliIcon, BackgroundOnionIcon, BackgroundGrapesIcon, BackgroundAppleIcon, BackgroundJamJarIcon } from './components/icons';
import { LocaleProvider, useLocale } from './context/LocaleContext';
import { translations } from './translations';
import SavedRecipesModal from './components/SavedRecipesModal';
import ThemeToggle from './components/ThemeToggle';
import OnboardingOverlay from './components/OnboardingOverlay';
import SettingsModal from './components/SettingsModal';
import IntroAnimation from './components/IntroAnimation';

const SAVED_RECIPES_KEY = 'pantry-chef-saved-recipes';
const ONBOARDING_COMPLETED_KEY = 'pantry-chef-onboarding-completed';
const API_PROVIDER_KEY = 'pantry-chef-api-provider';
const OPENROUTER_API_KEY = 'pantry-chef-openrouter-key';
const OPENROUTER_MODEL_KEY = 'pantry-chef-openrouter-model';
const OPENROUTER_IMAGE_MODEL_KEY = 'pantry-chef-openrouter-image-model';
const OPENROUTER_NEGATIVE_PROMPT_KEY = 'pantry-chef-openrouter-negative-prompt';
const OPENROUTER_TOP_P_KEY = 'pantry-chef-openrouter-top-p';
const OPENROUTER_PRESENCE_PENALTY_KEY = 'pantry-chef-openrouter-presence-penalty';
const IMAGE_GENERATION_KEY = 'pantry-chef-image-generation';


const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useLocale();

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-1.5 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
        aria-label="Select language"
      >
        {Object.keys(translations).map((lang) => (
          <option key={lang} value={lang}>
            {translations[lang].languageName}
          </option>
        ))}
      </select>
       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['Tomatoes', 'Onion', 'Garlic']);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [cookingMode, setCookingMode] = useState<'regular' | 'dietary'>('regular');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');

  // --- API & Settings State ---
  const [apiProvider, setApiProvider] = useState<'gemini' | 'openrouter'>(() => {
    return (localStorage.getItem(API_PROVIDER_KEY) as 'gemini' | 'openrouter') || 'gemini';
  });
  const [openRouterKey, setOpenRouterKey] = useState<string>(() => {
    return localStorage.getItem(OPENROUTER_API_KEY) || '';
  });
  const [openRouterModel, setOpenRouterModel] = useState<string>(() => {
    return localStorage.getItem(OPENROUTER_MODEL_KEY) || 'google/gemini-flash-1.5';
  });
   const [openRouterImageModel, setOpenRouterImageModel] = useState<string>(() => {
    return localStorage.getItem(OPENROUTER_IMAGE_MODEL_KEY) || 'stabilityai/sdxl';
  });
   const [negativePrompt, setNegativePrompt] = useState<string>(() => {
    return localStorage.getItem(OPENROUTER_NEGATIVE_PROMPT_KEY) || '';
  });
  const [topP, setTopP] = useState<number>(() => {
    return parseFloat(localStorage.getItem(OPENROUTER_TOP_P_KEY) || '1.0');
  });
  const [presencePenalty, setPresencePenalty] = useState<number>(() => {
    return parseFloat(localStorage.getItem(OPENROUTER_PRESENCE_PENALTY_KEY) || '0');
  });
  const [generateImage, setGenerateImage] = useState<boolean>(() => {
    try {
        const stored = localStorage.getItem(IMAGE_GENERATION_KEY);
        return stored !== 'false'; // Default to true
    } catch {
        return true;
    }
  });

  const { t, locale } = useLocale();

  const [introCompleted, setIntroCompleted] = useState(() => {
    try {
        // Only show intro once per session
        return !!sessionStorage.getItem('pantry-chef-intro-shown');
    } catch {
        // Default to not showing intro if sessionStorage is unavailable
        return true; 
    }
  });

  const handleIntroComplete = () => {
      setIntroCompleted(true);
      try {
          sessionStorage.setItem('pantry-chef-intro-shown', 'true');
      } catch (e) {
          console.error("Could not write to sessionStorage", e);
      }
  };
  
  // --- Effects for persisting settings ---
  useEffect(() => { localStorage.setItem(API_PROVIDER_KEY, apiProvider); }, [apiProvider]);
  useEffect(() => { localStorage.setItem(OPENROUTER_API_KEY, openRouterKey); }, [openRouterKey]);
  useEffect(() => { localStorage.setItem(OPENROUTER_MODEL_KEY, openRouterModel); }, [openRouterModel]);
  useEffect(() => { localStorage.setItem(OPENROUTER_IMAGE_MODEL_KEY, openRouterImageModel); }, [openRouterImageModel]);
  useEffect(() => { localStorage.setItem(OPENROUTER_NEGATIVE_PROMPT_KEY, negativePrompt); }, [negativePrompt]);
  useEffect(() => { localStorage.setItem(OPENROUTER_TOP_P_KEY, String(topP)); }, [topP]);
  useEffect(() => { localStorage.setItem(OPENROUTER_PRESENCE_PENALTY_KEY, String(presencePenalty)); }, [presencePenalty]);

  useEffect(() => {
    try {
        localStorage.setItem(IMAGE_GENERATION_KEY, String(generateImage));
    } catch (e) {
        console.error("Could not write to localStorage", e);
    }
  }, [generateImage]);

  useEffect(() => {
    try {
      const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED_KEY);
      if (!onboardingCompleted) {
        setShowOnboarding(true);
      }
    } catch (e) {
      console.error("Could not read from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      const storedRecipes = localStorage.getItem(SAVED_RECIPES_KEY);
      if (storedRecipes) {
        const parsedRecipes: Recipe[] = JSON.parse(storedRecipes);
        // Data migration for recipes without a savedAt timestamp
        const migratedRecipes = parsedRecipes.map((recipe, index) => {
          if (!recipe.savedAt) {
            // Assign a legacy timestamp, older recipes get older dates
            return { ...recipe, savedAt: new Date(Date.now() - (parsedRecipes.length - index) * 60000).toISOString() };
          }
          return recipe;
        });
        setSavedRecipes(migratedRecipes);
      }
    } catch (e) {
      console.error("Failed to parse saved recipes from localStorage", e);
      setSavedRecipes([]);
    }
  }, []);

  const handleAddIngredient = (ingredient: string) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError(t('errorAddOneIngredient'));
      return;
    }
    if (cookingMode === 'dietary' && !dietaryRestrictions.trim()) {
      setError(t('errorSpecifyDiet'));
      return;
    }
    if (apiProvider === 'openrouter' && !openRouterKey.trim()) {
        setError(t('errorOpenRouterKey'));
        return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const generatedRecipe = await fetchRecipe(
        ingredients, locale, cookingMode, dietaryRestrictions, 
        apiProvider, openRouterKey, openRouterModel, generateImage,
        openRouterImageModel, negativePrompt, topP, presencePenalty
      );
      setRecipe(generatedRecipe);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorUnknown'));
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, locale, t, cookingMode, dietaryRestrictions, apiProvider, openRouterKey, openRouterModel, generateImage, openRouterImageModel, negativePrompt, topP, presencePenalty]);
  
  const handleSaveRecipe = (recipeToSave: Recipe) => {
    const recipeWithTimestamp = { ...recipeToSave, savedAt: new Date().toISOString() };
    const newSavedRecipes = [...savedRecipes, recipeWithTimestamp];
    setSavedRecipes(newSavedRecipes);
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(newSavedRecipes));
  };

  const handleDeleteRecipe = (recipeTitle: string) => {
    const newSavedRecipes = savedRecipes.filter(r => r.title !== recipeTitle);
    setSavedRecipes(newSavedRecipes);
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(newSavedRecipes));
  }

  const handleUpdateRecipe = (originalTitle: string, updatedRecipe: Recipe) => {
    const newSavedRecipes = savedRecipes.map(r => 
      r.title === originalTitle ? updatedRecipe : r
    );
    setSavedRecipes(newSavedRecipes);
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(newSavedRecipes));
  };
  
  const handleClearAllRecipes = () => {
    setSavedRecipes([]);
    try {
      localStorage.removeItem(SAVED_RECIPES_KEY);
    } catch(e) {
      console.error("Could not remove item from localStorage", e);
    }
  };

  const isRecipeSaved = (recipeToCheck: Recipe | null): boolean => {
    if (!recipeToCheck) return false;
    return savedRecipes.some(r => r.title === recipeToCheck.title);
  };
  
  const handleOnboardingComplete = () => {
    try {
      localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    } catch (e) {
      console.error("Could not write to localStorage", e);
    }
    setShowOnboarding(false);
  };

  if (!introCompleted) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 animate-fade-in relative isolate">
      {/* Background Decorations */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
              <LeafIcon className="absolute -top-4 -left-8 h-32 w-32 text-green-400 transform -rotate-12" />
              <BackgroundTomatoIcon className="absolute top-[10%] -right-12 h-40 w-40 text-red-400 transform rotate-12" />
              <BackgroundBroccoliIcon className="absolute top-1/2 -left-16 h-48 w-48 text-green-600 transform -rotate-20" />
              <BackgroundCarrotIcon className="absolute bottom-8 -right-8 h-36 w-36 text-orange-400 transform rotate-20" />
              <LemonIcon className="hidden md:block absolute bottom-1/4 right-[20%] h-24 w-24 text-yellow-300 transform rotate-45" />
              <BackgroundOnionIcon className="hidden lg:block absolute top-[15%] left-[25%] h-28 w-28 text-purple-300 transform -rotate-15" />
              {/* Added Decorative Icons */}
              <BackgroundGrapesIcon className="hidden md:block absolute bottom-[5%] -left-10 h-32 w-32 text-purple-400 transform rotate-12" />
              <BackgroundAppleIcon className="hidden lg:block absolute top-[45%] right-[25%] h-28 w-28 text-red-300 transform -rotate-12" />
              <BackgroundJamJarIcon className="hidden xl:block absolute top-[70%] left-[10%] h-24 w-24 text-pink-400 transform rotate-6" />
          </div>
      </div>

      {showOnboarding && <OnboardingOverlay onComplete={handleOnboardingComplete} />}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm dark:shadow-none dark:border-b dark:border-gray-700 sticky top-0 z-20 no-print">
        <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ChefHatIcon className="h-8 w-8 text-orange-500" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200 tracking-tight">
                  {t('appTitle')}
                </h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  id="saved-recipes-button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  aria-label={t('mySavedRecipes')}
                >
                  <BookmarkIcon className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">{t('mySavedRecipes')}</span>
                </button>
                <div id="header-controls" className="flex items-center space-x-2 sm:space-x-4">
                   <button
                    onClick={() => setIsSettingsModalOpen(true)}
                    className="p-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    aria-label={t('settings')}
                    title={t('settings')}
                  >
                    <CogIcon className="h-5 w-5" />
                  </button>
                  <ThemeToggle />
                  <LanguageSelector />
                </div>
              </div>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-700 dark:text-gray-300 mb-8 no-print bg-orange-50/80 dark:bg-orange-900/40 backdrop-blur-sm p-6 rounded-2xl" dangerouslySetInnerHTML={{ __html: t('appDescription') }} />
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 no-print">
            <IngredientInput
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              cookingMode={cookingMode}
              setCookingMode={setCookingMode}
              dietaryRestrictions={dietaryRestrictions}
              setDietaryRestrictions={setDietaryRestrictions}
            />
            
            <div className="mt-6 text-center">
              <button
                id="generate-recipe-button"
                onClick={handleGenerateRecipe}
                disabled={isLoading || ingredients.length === 0}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('buttonLoading')}
                  </>
                ) : (
                  t('buttonGenerate')
                )}
              </button>
            </div>
          </div>

          <div id="recipe-display-area" className="mt-8">
            <RecipeDisplay 
              recipe={recipe} 
              isLoading={isLoading} 
              error={error} 
              onSave={handleSaveRecipe}
              onUnsave={handleDeleteRecipe}
              isSaved={isRecipeSaved(recipe)}
            />
          </div>
        </div>
      </main>
       <footer className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm no-print">
          <p>{t('footerText')}</p>
        </footer>

        {isModalOpen && (
          <SavedRecipesModal 
            savedRecipes={savedRecipes}
            onClose={() => setIsModalOpen(false)}
            onDelete={handleDeleteRecipe}
            onUpdate={handleUpdateRecipe}
            onClearAll={handleClearAllRecipes}
            activeRecipe={recipe}
          />
        )}

        {isSettingsModalOpen && (
          <SettingsModal
            onClose={() => setIsSettingsModalOpen(false)}
            provider={apiProvider}
            setProvider={setApiProvider}
            apiKey={openRouterKey}
            setApiKey={setOpenRouterKey}
            textModel={openRouterModel}
            setTextModel={setOpenRouterModel}
            generateImage={generateImage}
            setGenerateImage={setGenerateImage}
            imageModel={openRouterImageModel}
            setImageModel={setOpenRouterImageModel}
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
            topP={topP}
            setTopP={setTopP}
            presencePenalty={presencePenalty}
            setPresencePenalty={setPresencePenalty}
          />
        )}
    </div>
  );
};


const App: React.FC = () => (
  <LocaleProvider>
    <AppContent />
  </LocaleProvider>
);


export default App;