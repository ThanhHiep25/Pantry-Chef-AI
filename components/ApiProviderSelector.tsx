import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { CheckIcon } from './icons';

interface ApiProviderSelectorProps {
    provider: 'gemini' | 'openrouter';
    setProvider: (provider: 'gemini' | 'openrouter') => void;
    apiKey: string;
    setApiKey: (key: string) => void;
    textModel: string;
    setTextModel: (model: string) => void;
    imageModel: string;
    setImageModel: (model: string) => void;
    negativePrompt: string;
    setNegativePrompt: (prompt: string) => void;
    topP: number;
    setTopP: (value: number) => void;
    presencePenalty: number;
    setPresencePenalty: (value: number) => void;
}

const ProviderButton: React.FC<{
    label: string;
    isSelected: boolean;
    onClick: () => void;
}> = ({ label, isSelected, onClick }) => (
    <button
        role="radio"
        aria-checked={isSelected}
        onClick={onClick}
        className={`relative flex items-center justify-center p-4 text-center rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-orange-400
            ${isSelected
                ? 'bg-orange-50 dark:bg-orange-900/30 border-orange-500 text-orange-700 dark:text-orange-300'
                : 'bg-gray-100 dark:bg-gray-700/60 border-transparent hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
            }`}
    >
        <span className="font-semibold text-sm">{label}</span>
        {isSelected && (
            <div className="absolute top-1.5 right-1.5 bg-orange-500 text-white rounded-full p-0.5">
                <CheckIcon className="h-3 w-3" />
            </div>
        )}
    </button>
);


const ApiProviderSelector: React.FC<ApiProviderSelectorProps> = ({ 
    provider, setProvider, apiKey, setApiKey, textModel, setTextModel,
    imageModel, setImageModel, negativePrompt, setNegativePrompt,
    topP, setTopP, presencePenalty, setPresencePenalty
}) => {
    const { t } = useLocale();
    const [advancedVisible, setAdvancedVisible] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <label id="api-provider-label" className="text-base font-semibold text-gray-800 dark:text-gray-200">{t('apiProvider')}</label>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t('apiProviderDescription')}
                </p>
                <div role="radiogroup" aria-labelledby="api-provider-label" className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                   <ProviderButton 
                        label={t('apiProviderGemini')}
                        isSelected={provider === 'gemini'}
                        onClick={() => setProvider('gemini')}
                   />
                   <ProviderButton 
                        label={t('apiProviderOpenRouter')}
                        isSelected={provider === 'openrouter'}
                        onClick={() => setProvider('openrouter')}
                   />
                </div>
            </div>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${provider === 'openrouter' ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">{t('openRouterConfigTitle')}</h3>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="or-api-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('openRouterApiKeyLabel')}</label>
                            <input
                                id="or-api-key"
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder={t('openRouterApiKeyPlaceholder')}
                                className="mt-1 w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="or-model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('openRouterModelLabel')}</label>
                            <input
                                id="or-model"
                                type="text"
                                value={textModel}
                                onChange={(e) => setTextModel(e.target.value)}
                                placeholder={t('openRouterModelPlaceholder')}
                                className="mt-1 w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="or-image-model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('openRouterImageModelLabel')}</label>
                            <input
                                id="or-image-model"
                                type="text"
                                value={imageModel}
                                onChange={(e) => setImageModel(e.target.value)}
                                placeholder={t('openRouterImageModelPlaceholder')}
                                className="mt-1 w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm"
                            />
                        </div>
                         <div>
                            <label htmlFor="or-negative-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('openRouterNegativePromptLabel')}</label>
                            <input
                                id="or-negative-prompt"
                                type="text"
                                value={negativePrompt}
                                onChange={(e) => setNegativePrompt(e.target.value)}
                                placeholder={t('openRouterNegativePromptPlaceholder')}
                                className="mt-1 w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm"
                            />
                        </div>
                        
                        <details className="group pt-2">
                          <summary className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer list-none flex items-center" onClick={(e) => { e.preventDefault(); setAdvancedVisible(!advancedVisible); }}>
                             <svg className={`w-4 h-4 mr-1 transform transition-transform duration-200 ${advancedVisible ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            {t('openRouterAdvancedSettings')}
                          </summary>
                          <div className={`mt-4 space-y-4 pl-5 border-l-2 border-gray-200 dark:border-gray-700 ml-1.5 transition-all duration-300 overflow-hidden ${advancedVisible ? 'max-h-64' : 'max-h-0'}`}>
                              <div>
                                <label htmlFor="or-top-p" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('openRouterTopPLabel')} ({topP.toFixed(2)})</label>
                                <input id="or-top-p" type="range" min="0" max="1" step="0.05" value={topP} onChange={(e) => setTopP(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600" />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('openRouterTopPDescription')}</p>
                              </div>
                               <div>
                                <label htmlFor="or-presence-penalty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('openRouterPresencePenaltyLabel')} ({presencePenalty.toFixed(1)})</label>
                                <input id="or-presence-penalty" type="range" min="-2" max="2" step="0.1" value={presencePenalty} onChange={(e) => setPresencePenalty(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600" />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('openRouterPresencePenaltyDescription')}</p>
                              </div>
                          </div>
                        </details>
                        
                        <div className="text-right">
                           <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-sm text-orange-600 dark:text-orange-400 hover:underline">
                                {t('openRouterGetAKey')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiProviderSelector;