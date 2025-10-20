import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from './icons';
import { useLocale } from '../context/LocaleContext';
import IngredientIcon from './IngredientIcon';

interface IngredientInputProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (index: number) => void;
  cookingMode: 'regular' | 'dietary';
  setCookingMode: (mode: 'regular' | 'dietary') => void;
  dietaryRestrictions: string;
  setDietaryRestrictions: (restrictions: string) => void;
}

const PREDEFINED_DIETS = [
  'dietVegetarian',
  'dietVegan',
  'dietGlutenFree',
  'dietDairyFree',
  'dietKeto',
  'dietPescatarian',
];

const IngredientInput: React.FC<IngredientInputProps> = ({ 
  ingredients, onAddIngredient, onRemoveIngredient,
  cookingMode, setCookingMode, dietaryRestrictions, setDietaryRestrictions
}) => {
  const [newIngredient, setNewIngredient] = useState('');
  const { t } = useLocale();
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [customDiet, setCustomDiet] = useState('');

  useEffect(() => {
    if (cookingMode === 'dietary') {
      const parts = dietaryRestrictions.split(',').map(s => s.trim()).filter(Boolean);
      const predefinedFound: string[] = [];
      const customParts: string[] = [];
      
      const translatedPredefinedDiets = PREDEFINED_DIETS.map(key => t(key));

      parts.forEach(part => {
        const matchingDiet = translatedPredefinedDiets.find(diet => diet.toLowerCase() === part.toLowerCase());
        if (matchingDiet) {
          predefinedFound.push(matchingDiet);
        } else {
          customParts.push(part);
        }
      });
      
      setSelectedDiets(predefinedFound);
      setCustomDiet(customParts.join(', '));
    } else {
      setSelectedDiets([]);
      setCustomDiet('');
    }
  }, [cookingMode, t]);

  useEffect(() => {
    if (cookingMode === 'dietary') {
      const combined = [...selectedDiets, customDiet.trim()].filter(Boolean).join(', ');
      if (combined !== dietaryRestrictions) {
        setDietaryRestrictions(combined);
      }
    }
  }, [selectedDiets, customDiet, cookingMode, setDietaryRestrictions, dietaryRestrictions, t]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIngredient.trim() !== '') {
      const ingredientsToAdd = newIngredient.split(',').map(ing => ing.trim()).filter(Boolean);
      ingredientsToAdd.forEach(ing => onAddIngredient(ing));
      setNewIngredient('');
    }
  };

  const handleToggleDiet = (dietName: string) => {
    setSelectedDiets(prev => 
      prev.includes(dietName)
        ? prev.filter(d => d !== dietName)
        : [...prev, dietName]
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">{t('yourCookingStyle')}</h2>
        <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-full">
          <button
            onClick={() => setCookingMode('regular')}
            aria-pressed={cookingMode === 'regular'}
            className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${cookingMode === 'regular' ? 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            {t('cookingModeRegular')}
          </button>
          <button
            onClick={() => setCookingMode('dietary')}
            aria-pressed={cookingMode === 'dietary'}
            className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${cookingMode === 'dietary' ? 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            {t('cookingModeDietary')}
          </button>
        </div>
        <div className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${cookingMode === 'dietary' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-4 rounded-lg bg-gray-50 dark:bg-gray-900/30 p-4">
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">{t('dietaryNeedsTitle')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('dietaryNeedsDescription')}</p>
              <div className="flex flex-wrap gap-2">
                {PREDEFINED_DIETS.map((dietKey) => {
                  const dietName = t(dietKey);
                  const isSelected = selectedDiets.includes(dietName);
                  return (
                    <button
                      key={dietKey}
                      type="button"
                      onClick={() => handleToggleDiet(dietName)}
                      aria-pressed={isSelected}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full border-2 transition-colors duration-200 ${
                        isSelected
                          ? 'bg-orange-100 dark:bg-orange-900/40 border-orange-500 dark:border-orange-500 text-orange-700 dark:text-orange-300'
                          : 'bg-white dark:bg-gray-700/60 border-transparent hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {dietName}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label htmlFor="dietary-input" className="sr-only">{t('dietOtherPlaceholder')}</label>
              <input
                id="dietary-input"
                type="text"
                value={customDiet}
                onChange={(e) => setCustomDiet(e.target.value)}
                placeholder={t('dietOtherPlaceholder')}
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">{t('yourIngredients')}</h2>
        <form onSubmit={handleAdd} id="ingredient-input-form" className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder={t('ingredientsPlaceholder')}
            className="flex-grow px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="flex items-center justify-center px-5 py-2 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-300"
            disabled={!newIngredient.trim()}
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            {t('add')}
          </button>
        </form>
        <div id="ingredient-list-container" className="flex flex-wrap gap-2">
          {ingredients.length > 0 ? ingredients.map((ingredient, index) => (
            <span key={ingredient} className="flex items-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300">
              <IngredientIcon ingredient={ingredient} className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span>{ingredient}</span>
              <button
                onClick={() => onRemoveIngredient(index)}
                className="ml-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 focus:outline-none"
                aria-label={`${t('removeAriaLabel')} ${ingredient}`}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </span>
          )) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm italic w-full">{t('noIngredients')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientInput;
