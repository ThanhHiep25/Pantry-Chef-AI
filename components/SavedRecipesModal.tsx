import React, { useState, useMemo, useEffect } from 'react';
import type { Recipe } from '../types';
import { useLocale } from '../context/LocaleContext';
import { TrashIcon, XMarkIcon, BookmarkIcon, ClockIcon, ChartBarIcon, FireIcon, BoltIcon, CubeIcon, DropletIcon, SparklesIcon, UsersIcon, SearchIcon, PencilIcon, SpinnerIcon } from './icons';
import IngredientIcon from './IngredientIcon';

interface SavedRecipesModalProps {
  savedRecipes: Recipe[];
  onClose: () => void;
  onDelete: (recipeTitle: string) => void;
  onUpdate: (originalTitle: string, updatedRecipe: Recipe) => void;
  onClearAll: () => void;
  activeRecipe?: Recipe | null;
}

const SavedRecipesModal: React.FC<SavedRecipesModalProps> = ({ savedRecipes, onClose, onDelete, onUpdate, onClearAll, activeRecipe }) => {
  const { t } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('date-desc'); // date-desc, date-asc, title-asc, title-desc
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const displayedRecipes = useMemo(() => {
    let recipes = [...savedRecipes];

    // 1. Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      recipes = recipes.filter(recipe => {
        const titleMatch = recipe.title.toLowerCase().includes(query);
        const ingredientMatch = recipe.ingredientsList.some(ing => ing.name.toLowerCase().includes(query));
        return titleMatch || ingredientMatch;
      });
    }

    // 2. Sort the filtered recipes
    recipes.sort((a, b) => {
      switch (sortOrder) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'date-asc':
          return new Date(a.savedAt || 0).getTime() - new Date(b.savedAt || 0).getTime();
        case 'date-desc':
        default:
          return new Date(b.savedAt || 0).getTime() - new Date(a.savedAt || 0).getTime();
      }
    });

    return recipes;
  }, [savedRecipes, searchQuery, sortOrder]);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(displayedRecipes.length > 0 ? displayedRecipes[0] : null);

  useEffect(() => {
    // If the currently selected recipe is not in the displayed list, update the selection
    if (selectedRecipe && !displayedRecipes.some(r => r.title === selectedRecipe.title)) {
      setSelectedRecipe(displayedRecipes.length > 0 ? displayedRecipes[0] : null);
    }
    // If nothing is selected, but there are displayed results, select the first one
    if (!selectedRecipe && displayedRecipes.length > 0) {
      setSelectedRecipe(displayedRecipes[0]);
    }
  }, [displayedRecipes, selectedRecipe]);


  const handleDelete = (title: string) => {
    setIsDeleting(title);
    setTimeout(() => { // Simulate network latency for better UX
      onDelete(title);
      setConfirmingDelete(null);
      setIsDeleting(null);
    }, 500);
  }

  const handleClearAll = () => {
    setIsDeleting('--all--');
    setTimeout(() => { // Simulate latency for better UX
      onClearAll();
      setConfirmingDelete(null);
      setIsDeleting(null);
    }, 500);
  };
  
  const handleSaveChanges = () => {
    if (!editingRecipe || !selectedRecipe) return;
    setIsSaving(true);
    setTimeout(() => { // Simulate network latency for better UX
      // Clean up empty lines from textareas
      const cleanedRecipe = {
        ...editingRecipe,
        instructions: editingRecipe.instructions.filter(line => line.trim() !== ''),
      };
      onUpdate(selectedRecipe.title, cleanedRecipe);
      setSelectedRecipe(cleanedRecipe); // Update the view immediately
      setEditingRecipe(null); // Exit edit mode
      setIsSaving(false);
    }, 500);
  };

  const handleEditInputChange = (field: keyof Recipe, value: string) => {
    if (editingRecipe) {
      setEditingRecipe({ ...editingRecipe, [field]: value });
    }
  };

  const handleEditListChange = (field: 'ingredientsList' | 'instructions', value: string) => {
      if (editingRecipe) {
        if (field === 'ingredientsList') {
            const newIngredients = value.split('\n').map(line => {
                const parts = line.split('|');
                return {
                    quantity: parts[0]?.trim() || '',
                    name: parts[1]?.trim() || ''
                };
            }).filter(ing => ing.name || ing.quantity);
            setEditingRecipe({ ...editingRecipe, ingredientsList: newIngredients });
        } else {
            setEditingRecipe({ ...editingRecipe, instructions: value.split('\n') });
        }
      }
  };
  
  const renderEditForm = () => {
    if (!editingRecipe) return null;
    return (
       <div>
        <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">{t('editRecipe')}</h3>
        <div className="space-y-4 text-left">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input type="text" value={editingRecipe.title} onChange={(e) => handleEditInputChange('title', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea value={editingRecipe.description} onChange={(e) => handleEditInputChange('description', e.target.value)} rows={2} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('prepTime')}</label>
                  <input type="text" value={editingRecipe.prepTime} onChange={(e) => handleEditInputChange('prepTime', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('cookTime')}</label>
                  <input type="text" value={editingRecipe.cookTime} onChange={(e) => handleEditInputChange('cookTime', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('difficulty')}</label>
                  <input type="text" value={editingRecipe.difficulty} onChange={(e) => handleEditInputChange('difficulty', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('yield')}</label>
                  <input type="text" value={editingRecipe.yield} onChange={(e) => handleEditInputChange('yield', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('calories')}</label>
                  <input type="text" value={editingRecipe.calories} onChange={(e) => handleEditInputChange('calories', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('protein')}</label>
                  <input type="text" value={editingRecipe.protein} onChange={(e) => handleEditInputChange('protein', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('carbs')}</label>
                  <input type="text" value={editingRecipe.carbs} onChange={(e) => handleEditInputChange('carbs', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('fat')}</label>
                  <input type="text" value={editingRecipe.fat} onChange={(e) => handleEditInputChange('fat', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
              </div>
            </div>
             <div>
                <label htmlFor="edit-ingredients" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('ingredientsTitle')} <span className="text-xs text-gray-400">({t('ingredientsEditFormat')})</span></label>
                <textarea
                  id="edit-ingredients"
                  value={editingRecipe.ingredientsList.map(ing => `${ing.quantity} | ${ing.name}`).join('\n')}
                  onChange={(e) => handleEditListChange('ingredientsList', e.target.value)}
                  rows={6}
                  placeholder={`e.g., 1 cup | ${t('ingredientsPlaceholder').split(',')[0]}`}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 font-mono text-sm"
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('instructionsTitle')} (one per line)</label>
                <textarea value={editingRecipe.instructions.join('\n')} onChange={(e) => handleEditListChange('instructions', e.target.value)} rows={8} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
            </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
            <button onClick={() => setEditingRecipe(null)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50" disabled={isSaving}>{t('cancel')}</button>
            <button onClick={handleSaveChanges} className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 flex items-center justify-center w-[120px] disabled:opacity-50" disabled={isSaving}>
              {isSaving ? (
                <>
                  <SpinnerIcon className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  {t('saving')}
                </>
              ) : (
                t('saveChanges')
              )}
            </button>
        </div>
      </div>
    );
  };
  
  const renderRecipeDetails = () => {
    if (!selectedRecipe) return null;
     return (
        <div>
          {selectedRecipe.imageBase64 && (
             <img 
                src={`data:image/jpeg;base64,${selectedRecipe.imageBase64}`}
                alt={selectedRecipe.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
          )}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">{selectedRecipe.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 italic mt-1">{selectedRecipe.description}</p>
            </div>
            <button
              onClick={() => setEditingRecipe(JSON.parse(JSON.stringify(selectedRecipe)))}
              className="ml-4 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400"
              aria-label={t('editRecipe')}
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-4 text-center my-4 py-3 border-y border-gray-200 dark:border-gray-700 justify-center">
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 px-2">
                  <ClockIcon className="h-5 w-5 mb-1 text-orange-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{t('prepTime')}</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{selectedRecipe.prepTime}</span>
              </div>
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 px-2">
                  <ClockIcon className="h-5 w-5 mb-1 text-orange-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{t('cookTime')}</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{selectedRecipe.cookTime}</span>
              </div>
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 px-2">
                  <ChartBarIcon className="h-5 w-5 mb-1 text-orange-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{t('difficulty')}</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{selectedRecipe.difficulty}</span>
              </div>
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 px-2">
                  <UsersIcon className="h-5 w-5 mb-1 text-orange-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{t('yield')}</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{selectedRecipe.yield}</span>
              </div>
               <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 px-2">
                  <FireIcon className="h-5 w-5 mb-1 text-orange-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{t('calories')}</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{selectedRecipe.calories}</span>
              </div>
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 px-2">
                  <BoltIcon className="h-5 w-5 mb-1 text-orange-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{t('protein')}</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{selectedRecipe.protein}</span>
              </div>
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 px-2">
                  <CubeIcon className="h-5 w-5 mb-1 text-orange-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{t('carbs')}</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{selectedRecipe.carbs}</span>
              </div>
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 px-2">
                  <DropletIcon className="h-5 w-5 mb-1 text-orange-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{t('fat')}</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{selectedRecipe.fat}</span>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b-2 border-orange-200 dark:border-orange-800 pb-2">{t('ingredientsTitle')}</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      {selectedRecipe.ingredientsList.map((ing, i) => (
                        <li key={i} className="flex items-start">
                            <IngredientIcon ingredient={ing.name} className="h-5 w-5 mr-3 mt-0.5 text-orange-500 flex-shrink-0" />
                            <div><span className="font-semibold text-gray-800 dark:text-gray-200">{ing.quantity}</span> {ing.name}</div>
                        </li>
                      ))}
                  </ul>
              </div>
              <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b-2 border-orange-200 dark:border-orange-800 pb-2">{t('instructionsTitle')}</h4>
                  <ol className="space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-300">
                      {selectedRecipe.instructions.map((step, i) => <li key={i} className="pl-1">{step}</li>)}
                  </ol>
              </div>
          </div>
          
          {selectedRecipe.variations && selectedRecipe.variations.length > 0 && (
            <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b-2 border-orange-200 dark:border-orange-800 pb-2 flex items-center">
                  <SparklesIcon className="h-5 w-5 mr-2 text-orange-500" />
                  {t('recipeVariationsTitle')}
                </h4>
                <div className="space-y-4">
                    {selectedRecipe.variations.map((variation, index) => (
                        <div key={index} className="bg-orange-50/50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-100 dark:border-orange-900/50">
                            <h5 className="font-bold text-orange-700 dark:text-orange-400 text-sm">{variation.title}</h5>
                            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{variation.description}</p>
                        </div>
                    ))}
                </div>
            </div>
          )}
        </div>
     );
  };


  return (
    <div 
      className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-fast"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-recipes-title"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] max-h-[700px] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 id="saved-recipes-title" className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <BookmarkIcon className="h-6 w-6 mr-2 text-orange-500" />
            {t('mySavedRecipes')}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('close')}
            disabled={isSaving || !!isDeleting || confirmingDelete === '--all--'}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>
        
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                    type="search"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow disabled:opacity-50"
                    aria-label={t('searchPlaceholder')}
                    disabled={!!editingRecipe || !!isDeleting || isSaving || confirmingDelete === '--all--'}
                />
            </div>
            <div className="relative">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="appearance-none bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full pl-4 pr-8 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer disabled:opacity-50"
                    aria-label={t('sortBy')}
                    disabled={!!editingRecipe || !!isDeleting || isSaving || confirmingDelete === '--all--'}
                >
                    <option value="date-desc">{t('sortDateNewest')}</option>
                    <option value="date-asc">{t('sortDateOldest')}</option>
                    <option value="title-asc">{t('sortTitleAZ')}</option>
                    <option value="title-desc">{t('sortTitleZA')}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
             <button
              onClick={() => setConfirmingDelete('--all--')}
              className="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              disabled={savedRecipes.length === 0 || !!editingRecipe || !!isDeleting || isSaving}
              aria-label={t('clearAll')}
              title={t('clearAll')}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
        </div>

        <div className="flex-grow flex flex-col md:flex-row min-h-0 relative">
          {confirmingDelete === '--all--' && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-4 text-center animate-fade-in-fast">
                  <h3 className="text-xl font-bold text-red-700 dark:text-red-400">{t('clearAllConfirmationTitle')}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{t('clearAllConfirmationBody')}</p>
                  <div className="mt-6 flex space-x-4">
                      <button 
                          onClick={handleClearAll}
                          className="px-6 py-2 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700 w-36 flex items-center justify-center"
                          disabled={isDeleting === '--all--'}
                      >
                          {isDeleting === '--all--' ? <SpinnerIcon className="h-5 w-5 animate-spin"/> : t('yesDeleteAll')}
                      </button>
                      <button 
                          onClick={() => setConfirmingDelete(null)}
                          className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500"
                          disabled={isDeleting === '--all--'}
                      >
                          {t('cancel')}
                      </button>
                  </div>
              </div>
          )}

          {savedRecipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-8 w-full">
                <BookmarkIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{t('noSavedRecipes')}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{t('noSavedRecipesDescription')}</p>
            </div>
          ) : (
            <>
              <aside className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 overflow-y-auto flex-shrink-0">
                {displayedRecipes.length > 0 ? (
                    <ul>
                      {displayedRecipes.map(recipe => {
                        const isSelected = selectedRecipe?.title === recipe.title && confirmingDelete !== recipe.title && !editingRecipe;
                        const isActive = activeRecipe?.title === recipe.title;

                        return (
                          <li 
                            key={recipe.title}
                            className={`group relative border-b border-gray-100 dark:border-gray-700/50 last:border-b-0 transition-colors ${confirmingDelete === recipe.title ? 'bg-red-50 dark:bg-red-900/20' : ''}`}
                            onMouseLeave={() => { if (confirmingDelete === recipe.title) setConfirmingDelete(null); }}
                          >
                            <button
                              onClick={() => {
                                setSelectedRecipe(recipe);
                                setEditingRecipe(null); // Ensure exiting edit mode when switching
                              }}
                              className={`w-full text-left p-3 flex items-center gap-3 transition-colors duration-150 ${isSelected ? 'bg-orange-50 dark:bg-orange-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                              disabled={confirmingDelete === recipe.title || !!editingRecipe || !!isDeleting || isSaving || confirmingDelete === '--all--'}
                              title={isActive ? t('currentlyViewing') : ''}
                            >
                               {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-orange-400 rounded-r-full"></span>
                              )}
                              {recipe.imageBase64 ? (
                                <img 
                                  src={`data:image/jpeg;base64,${recipe.imageBase64}`} 
                                  alt=""
                                  className={`w-10 h-10 rounded-md object-cover flex-shrink-0 transition-opacity ${confirmingDelete === recipe.title || (editingRecipe && selectedRecipe?.title !== recipe.title) || confirmingDelete === '--all--' ? 'opacity-20' : ''}`}
                                />
                              ) : (
                                <div className={`w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 transition-opacity ${confirmingDelete === recipe.title || (editingRecipe && selectedRecipe?.title !== recipe.title) || confirmingDelete === '--all--' ? 'opacity-20' : ''}`}>
                                  <BookmarkIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                </div>
                              )}
                              <span className={`flex-grow font-medium text-gray-800 dark:text-gray-200 ${isSelected ? 'text-orange-800 dark:text-orange-300 font-semibold' : ''} transition-opacity ${confirmingDelete === recipe.title || (editingRecipe && selectedRecipe?.title !== recipe.title) || confirmingDelete === '--all--' ? 'opacity-20' : ''}`}>{recipe.title}</span>
                            </button>
                            
                            {confirmingDelete === recipe.title ? (
                              <div className="absolute inset-0 flex items-center justify-end px-4 space-x-2">
                                <span className="text-sm font-semibold text-red-800 dark:text-red-300">{t('deleteConfirmationShort')}</span>
                                <button 
                                  onClick={() => handleDelete(recipe.title)}
                                  className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-md hover:bg-red-600 w-14 flex justify-center items-center"
                                  disabled={!!isDeleting}
                                >
                                  {isDeleting === recipe.title ? <SpinnerIcon className="h-4 w-4 animate-spin"/> : t('yes')}
                                </button>
                                <button 
                                  onClick={() => setConfirmingDelete(null)}
                                  className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500"
                                  disabled={!!isDeleting}
                                >
                                  {t('no')}
                                </button>
                              </div>
                            ) : (
                              !editingRecipe && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setConfirmingDelete(recipe.title);
                                  }}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all disabled:opacity-0"
                                  aria-label={`${t('delete')} ${recipe.title}`}
                                  disabled={!!isDeleting || isSaving || confirmingDelete === '--all--'}
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              )
                            )}
                          </li>
                        )
                      })}
                    </ul>
                ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                        <p>{t('noSearchResults')}</p>
                    </div>
                )}
              </aside>

              <main className="flex-grow p-6 overflow-y-auto">
                {editingRecipe ? renderEditForm() : (selectedRecipe ? renderRecipeDetails() : null) }
              </main>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipesModal;
