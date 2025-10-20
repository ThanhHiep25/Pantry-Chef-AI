# Pantry Chef AI 🍳🤖

An intelligent recipe generator that creates delicious meals from the ingredients you already have. Simply list your available items, and let our AI chef craft a unique recipe just for you. This app leverages the power of generative AI to provide recipes, nutritional information, and even a unique, AI-generated image for your dish.

## ✨ Features

- **AI-Powered Recipe Generation:** Get creative recipes based on the ingredients you have on hand.
- **Customizable Cooking Styles:** Choose between "Creative Cooking" or specify "Dietary Needs" like vegetarian, gluten-free, etc.
- **Detailed Recipe Information:** Includes prep time, cook time, difficulty, yield, and a full nutritional breakdown (calories, protein, carbs, fat).
- **AI-Generated Imagery:** Automatically generates a unique, high-quality image for each recipe to visualize the final dish.
- **Multi-API Support:** Seamlessly switch between Google Gemini and OpenRouter, allowing you to use various AI models with your own API key.
- **Save & Manage Recipes:** Save your favorite recipes locally to access them anytime. Features include searching, sorting, editing, and deleting.
- **Multi-language Support:** The interface is available in English, Spanish, French, and Vietnamese.
- **Light & Dark Mode:** Switch between themes for comfortable viewing in any lighting.
- **Print & Share:** Easily print recipes for a physical copy or share them via the native share API or clipboard.
- **PWA Ready:** Installable on your device for an app-like experience with offline support for the UI shell.
- **User Onboarding:** A guided tour for first-time users to quickly learn how to use the app.

## 🛠️ Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **AI Models:** [Google Gemini API](https://ai.google.dev/gemini-api), [OpenRouter](https://openrouter.ai/)
- **PWA:** Service Workers, Web App Manifest
- **Styling:** Custom SVG icons, [Google Fonts](https://fonts.google.com/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- A package manager like `npm`, `yarn`, or `pnpm`

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/pantry-chef-ai.git
    cd pantry-chef-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    The application is designed to use the Google Gemini API by default. Create a `.env` file in the root of your project and add your API key.

    ```
    API_KEY=YOUR_GEMINI_API_KEY
    ```

    *Note: To use the OpenRouter provider, you will need to enter your OpenRouter API key directly in the application's settings modal after it's running.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## 📖 How to Use

1.  Add the ingredients you have available in the input field. You can add multiple at once by separating them with commas.
2.  (Optional) Select the "Dietary Needs" cooking style and specify any restrictions.
3.  Click the **Generate Recipe** button.
4.  Wait a moment while the AI creates your custom recipe, complete with an image and detailed information.
5.  Once generated, you can **Save**, **Share**, or **Print** the recipe.
6.  Click the **My Saved Recipes** button to view, edit, or delete recipes you've saved.
7.  Explore the **Settings** (cog icon) to switch between light/dark mode, change the language, or configure the API provider.
