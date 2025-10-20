import React from 'react';
import { useLocale } from '../context/LocaleContext';
import { XMarkIcon, CogIcon } from './icons';
import ApiProviderSelector from './ApiProviderSelector';

interface SettingsModalProps {
  onClose: () => void;
  provider: 'gemini' | 'openrouter';
  setProvider: (provider: 'gemini' | 'openrouter') => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  textModel: string;
  setTextModel: (model: string) => void;
  generateImage: boolean;
  setGenerateImage: (generate: boolean) => void;
  imageModel: string;
  setImageModel: (model: string) => void;
  negativePrompt: string;
  setNegativePrompt: (prompt: string) => void;
  topP: number;
  setTopP: (value: number) => void;
  presencePenalty: number;
  setPresencePenalty: (value: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  onClose, provider, setProvider, apiKey, setApiKey, textModel, setTextModel, 
  generateImage, setGenerateImage, imageModel, setImageModel, negativePrompt, 
  setNegativePrompt, topP, setTopP, presencePenalty, setPresencePenalty 
}) => {
  const { t } = useLocale();

  return (
    <div
      className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-fast"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 id="settings-modal-title" className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <CogIcon className="h-6 w-6 mr-2 text-orange-500" />
            {t('settingsModalTitle')}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label={t('close')}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>

        <main className="p-6 space-y-6 overflow-y-auto">
          <ApiProviderSelector
            provider={provider}
            setProvider={setProvider}
            apiKey={apiKey}
            setApiKey={setApiKey}
            textModel={textModel}
            setTextModel={setTextModel}
            imageModel={imageModel}
            setImageModel={setImageModel}
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
            topP={topP}
            setTopP={setTopP}
            presencePenalty={presencePenalty}
            setPresencePenalty={setPresencePenalty}
          />
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center">
              <div>
                <label htmlFor="image-generation-toggle" className="text-base font-semibold text-gray-800 dark:text-gray-200">{t('settingsImageGeneration')}</label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">{t('settingsImageGenerationDescription')}</p>
              </div>
              <button
                id="image-generation-toggle"
                role="switch"
                aria-checked={generateImage}
                onClick={() => setGenerateImage(!generateImage)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${generateImage ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-600'}`}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${generateImage ? 'translate-x-5' : 'translate-x-0'}`}
                ></span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsModal;