import React, { useState, useEffect } from 'react';
import type { Recipe } from '../types';
import { ChefHatIcon, StarIcon, BookmarkIcon, ClockIcon, ChartBarIcon, FireIcon, BoltIcon, CubeIcon, DropletIcon, SparklesIcon, UsersIcon, CheckIcon, XMarkIcon, PrinterIcon, ShareIcon } from './icons';
import { useLocale } from '../context/LocaleContext';
import IngredientIcon from './IngredientIcon';

interface RecipeDisplayProps {
  recipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
  onSave: (recipe: Recipe) => void;
  onUnsave: (recipeTitle: string) => void;
  isSaved: boolean;
}

const RECIPE_RATING_PREFIX = 'pantry-chef-ai-rating:';

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, isLoading, error, onSave, onUnsave, isSaved }) => {
  const [rating, setRating] = useState({ average: 0, count: 0 });
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useLocale();

  const recipeId = recipe?.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  useEffect(() => {
    if (!recipeId) {
      setRating({ average: 0, count: 0 });
      return;
    }

    const storedData = localStorage.getItem(`${RECIPE_RATING_PREFIX}${recipeId}`);
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        const ratings: number[] = Array.isArray(data.ratings) ? data.ratings : [];
        const count = ratings.length;
        const sum = ratings.reduce((acc, r) => acc + r, 0);
        const average = count > 0 ? sum / count : 0;
        setRating({ average, count });
      } catch (e) {
        console.error("Failed to parse rating data from localStorage", e);
        setRating({ average: 0, count: 0 });
      }
    } else {
      setRating({ average: 0, count: 0 });
    }

    setUserRating(0);
    setHoverRating(0);
  }, [recipeId]);

  const handleRating = (newRatingValue: number) => {
    if (!recipeId || userRating > 0) return;

    const storedData = localStorage.getItem(`${RECIPE_RATING_PREFIX}${recipeId}`);
    const data = storedData ? JSON.parse(storedData) : { ratings: [] };
    const newRatings = [...(data.ratings || []), newRatingValue];
    
    localStorage.setItem(`${RECIPE_RATING_PREFIX}${recipeId}`, JSON.stringify({ ratings: newRatings }));

    const newCount = newRatings.length;
    const newSum = newRatings.reduce((acc, r) => acc + r, 0);
    const newAverage = newSum / newCount;
    
    setRating({ average: newAverage, count: newCount });
    setUserRating(newRatingValue);
  };

  const handleSaveToggle = () => {
    if (!recipe) return;
    if (isSaved) {
      onUnsave(recipe.title);
    } else {
      onSave(recipe);
    }
  };
  
  const handlePrint = () => {
    window.print();
  }

  const handleShare = async () => {
    if (!recipe) return;

    const recipeText = `
Recipe: ${recipe.title}

${recipe.description}

--- INGREDIENTS ---
${recipe.ingredientsList.map(i => `${i.quantity} ${i.name}`).join('\n')}

--- INSTRUCTIONS ---
${recipe.instructions.map((step, index) => `${index + 1}. ${step}`).join('\n')}

Shared from Pantry Chef AI.
`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: recipe.title,
                text: `Check out this recipe for "${recipe.title}" from Pantry Chef AI!`,
                url: window.location.href,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        try {
            await navigator.clipboard.writeText(recipeText.trim());
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500);
        } catch (error) {
            console.error('Failed to copy recipe:', error);
            alert(t('errorCopy'));
        }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 no-print">
        <ChefHatIcon className="h-12 w-12 text-orange-500 mx-auto animate-bounce" />
        <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">{t('loadingMessage')}</p>
        <p className="text-gray-500 dark:text-gray-400">{t('loadingSubMessage')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50/80 dark:bg-red-900/40 backdrop-blur-sm border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-2xl shadow-lg no-print">
        <h3 className="text-xl font-bold">{t('errorTitle')}</h3>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 no-print">
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">{t('recipePlaceholderTitle')}</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{t('recipePlaceholderSubtitle')}</p>
      </div>
    );
  }
  
  const getRatingText = () => {
    if (rating.count > 0) {
      const ratingText = rating.count === 1 ? t('ratingSingular') : t('ratingPlural');
      return (
        <span>
          <strong>{rating.average.toFixed(1)}</strong> ({rating.count} {ratingText})
        </span>
      );
    }
    return <span className="italic">{t('firstToRate')}</span>;
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden animate-fade-in printable-content">
        {recipe.imageBase64 && (
          <img 
            src={`data:image/jpeg;base64,${recipe.imageBase64}`}
            alt={recipe.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div className="flex-1 mr-4">
                <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{recipe.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 italic mb-4">{recipe.description}</p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-center gap-2 no-print">
                  <button 
                    onClick={handleSaveToggle}
                    className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-sm
                      ${isSaved
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-700 dark:hover:text-red-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-700 dark:hover:text-orange-400'
                      }`}
                    aria-label={isSaved ? t('unsaveRecipe') : t('saveRecipe')}
                    title={isSaved ? t('unsaveRecipe') : t('saveRecipe')}
                  >
                    {isSaved ? (
                      <>
                        <CheckIcon className="h-6 w-6 group-hover:hidden" />
                        <XMarkIcon className="h-6 w-6 hidden group-hover:block" />
                      </>
                    ) : (
                      <BookmarkIcon className="h-6 w-6" />
                    )}
                  </button>
                  <button 
                    onClick={handleShare}
                    className="group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={isCopied ? t('copied') : t('shareRecipe')}
                    title={isCopied ? t('copied') : t('shareRecipe')}
                    disabled={isCopied}
                  >
                    {isCopied ? (
                        <CheckIcon className="h-6 w-6 text-green-700 dark:text-green-400" />
                    ) : (
                        <ShareIcon className="h-6 w-6" />
                    )}
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400"
                    aria-label={t('printRecipe')}
                    title={t('printRecipe')}
                  >
                    <PrinterIcon className="h-6 w-6" />
                  </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-4 text-center mb-6 py-4 border-y border-gray-200 dark:border-gray-700 justify-center">
                <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                    <ClockIcon className="h-6 w-6 mb-1 text-orange-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t('prepTime')}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{recipe.prepTime}</span>
                </div>
                <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                    <ClockIcon className="h-6 w-6 mb-1 text-orange-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t('cookTime')}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{recipe.cookTime}</span>
                </div>
                <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                    <ChartBarIcon className="h-6 w-6 mb-1 text-orange-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t('difficulty')}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{recipe.difficulty}</span>
                </div>
                <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                    <UsersIcon className="h-6 w-6 mb-1 text-orange-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t('yield')}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{recipe.yield}</span>
                </div>
                <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                    <FireIcon className="h-6 w-6 mb-1 text-orange-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t('calories')}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{recipe.calories}</span>
                </div>
                <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                    <BoltIcon className="h-6 w-6 mb-1 text-orange-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t('protein')}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{recipe.protein}</span>
                </div>
                 <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                    <CubeIcon className="h-6 w-6 mb-1 text-orange-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t('carbs')}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{recipe.carbs}</span>
                </div>
                 <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                    <DropletIcon className="h-6 w-6 mb-1 text-orange-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{t('fat')}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{recipe.fat}</span>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-6 no-print" aria-label={`${t('ratingAriaLabel')} ${rating.average.toFixed(1)}`}>
              <div className="flex" onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((star) => {
                  let isFilled = false;
                  if (hoverRating > 0) {
                    isFilled = star <= hoverRating;
                  } else if (userRating > 0) {
                    isFilled = star <= userRating;
                  } else {
                    isFilled = star <= Math.round(rating.average);
                  }
                  
                  return (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      className="focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-sm"
                      aria-label={`${t('rateAriaLabel')} ${star} ${star > 1 ? t('starsPlural') : t('starSingular')}`}
                      disabled={userRating > 0}
                    >
                      <StarIcon
                        className={`h-6 w-6 transition-colors duration-150 ${
                          isFilled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                        } ${userRating === 0 ? 'cursor-pointer' : 'cursor-default'}`}
                      />
                    </button>
                  )
                })}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-0">
                {getRatingText()}
              </div>
            </div>
            {userRating > 0 && <p className="text-sm font-semibold text-green-600 dark:text-green-500 mb-6 -mt-2 no-print">{t('thanksForRating')}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-orange-200 dark:border-orange-800 pb-2">{t('ingredientsTitle')}</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        {recipe.ingredientsList.map((ingredient, index) => (
                            <li key={index} className="flex items-start">
                              <IngredientIcon ingredient={ingredient.name} className="h-5 w-5 mr-3 mt-0.5 text-orange-500 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{ingredient.quantity}</span> {ingredient.name}
                              </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-orange-200 dark:border-orange-800 pb-2">{t('instructionsTitle')}</h3>
                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        {recipe.instructions.map((step, index) => (
                            <div key={index} className="flex items-start">
                                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold mr-4">
                                    {index + 1}
                                </div>
                                <p className="flex-1 pt-1 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {recipe.variations && recipe.variations.length > 0 && (
              <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-orange-200 dark:border-orange-800 pb-2 flex items-center">
                    <SparklesIcon className="h-5 w-5 mr-2 text-orange-500" />
                    {t('recipeVariationsTitle')}
                  </h3>
                  <div className="space-y-4">
                      {recipe.variations.map((variation, index) => (
                          <div key={index} className="bg-orange-50/50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-900/50">
                              <h4 className="font-bold text-orange-700 dark:text-orange-400">{variation.title}</h4>
                              <p className="text-gray-600 dark:text-gray-400 mt-1">{variation.description}</p>
                          </div>
                      ))}
                  </div>
              </div>
            )}
        </div>
    </div>
  );
};

export default RecipeDisplay;