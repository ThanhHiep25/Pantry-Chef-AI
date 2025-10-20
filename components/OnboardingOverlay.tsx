import React, { useState, useEffect, useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';

interface OnboardingOverlayProps {
    onComplete: () => void;
}

type TourStep = {
    targetSelector?: string;
    titleKey: string;
    contentKey: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
};

const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({ onComplete }) => {
    const { t } = useLocale();
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const [style, setStyle] = useState({});

    const tourSteps: TourStep[] = useMemo(() => [
        { // 0: Welcome modal
            titleKey: 'onboarding_welcome_title',
            contentKey: 'onboarding_welcome_text',
        },
        { // 1: Ingredient Input
            targetSelector: '#ingredient-input-form',
            titleKey: 'onboarding_step1_title',
            contentKey: 'onboarding_step1_text',
            position: 'bottom',
        },
        { // 2: Ingredient List
            targetSelector: '#ingredient-list-container',
            titleKey: 'onboarding_step2_title',
            contentKey: 'onboarding_step2_text',
            position: 'bottom',
        },
        { // 3: Generate Button
            targetSelector: '#generate-recipe-button',
            titleKey: 'onboarding_step3_title',
            contentKey: 'onboarding_step3_text',
            position: 'top',
        },
        { // 4: Recipe Display
            targetSelector: '#recipe-display-area',
            titleKey: 'onboarding_step4_title',
            contentKey: 'onboarding_step4_text',
            position: 'top',
        },
        { // 5: Header Controls (Theme/Lang)
            targetSelector: '#header-controls',
            titleKey: 'onboarding_step5_title',
            contentKey: 'onboarding_step5_text',
            position: 'left',
        },
        { // 6: Saved Recipes Button
            targetSelector: '#saved-recipes-button',
            titleKey: 'onboarding_step6_title',
            contentKey: 'onboarding_step6_text',
            position: 'left',
        },
        { // 7: Finish Modal
            titleKey: 'onboarding_finish_title',
            contentKey: 'onboarding_finish_text',
        },
    ], []);


    useEffect(() => {
        const step = tourSteps[currentStep];
        let rect: DOMRect | null = null;
        if (step.targetSelector) {
            const element = document.querySelector(step.targetSelector);
            if(element) {
                rect = element.getBoundingClientRect();
            }
        }
        setTargetRect(rect);
    }, [currentStep, tourSteps]);

    useEffect(() => {
        const step = tourSteps[currentStep];
        // FIX: Cast style object to `any` to allow for CSS custom properties, which are not part of React.CSSProperties.
        const newStyle: any = {
            '--tooltip-left': '50%',
            '--tooltip-top': '50%',
            '--tooltip-transform': 'translate(-50%, -50%)',
        };

        if (targetRect) {
            const { top, left, width, height } = targetRect;
            const position = step.position || 'bottom';
            const gap = 16;

            if (position === 'bottom') {
                newStyle['--tooltip-top'] = `${top + height + gap}px`;
                newStyle['--tooltip-left'] = `${left + width / 2}px`;
                newStyle['--tooltip-transform'] = 'translateX(-50%)';
            } else if (position === 'top') {
                 newStyle['--tooltip-top'] = `${top - gap}px`;
                 newStyle['--tooltip-left'] = `${left + width / 2}px`;
                 newStyle['--tooltip-transform'] = 'translate(-50%, -100%)';
            } else if (position === 'left') {
                newStyle['--tooltip-top'] = `${top + height / 2}px`;
                newStyle['--tooltip-left'] = `${left - gap}px`;
                newStyle['--tooltip-transform'] = 'translate(-100%, -50%)';
            } else if (position === 'right') {
                newStyle['--tooltip-top'] = `${top + height / 2}px`;
                newStyle['--tooltip-left'] = `${left + width + gap}px`;
                newStyle['--tooltip-transform'] = 'translateY(-50%)';
            }
        }
        setStyle(newStyle);

    }, [targetRect, currentStep, tourSteps]);

    const handleNext = () => {
        if (currentStep < tourSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    const step = tourSteps[currentStep];

    return (
        <div className="fixed inset-0 z-50 animate-fade-in-fast" role="dialog" aria-modal="true">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                style={targetRect ? {
                    clipPath: `path('M0,0H${window.innerWidth}V${window.innerHeight}H0V0ZM${targetRect.x - 4},${targetRect.y-4}H${targetRect.x + targetRect.width+4}V${targetRect.y + targetRect.height+4}H${targetRect.x-4}V${targetRect.y-4}Z')`
                } : {}}
            />
             {targetRect && <div className="absolute transition-all duration-300 pointer-events-none" style={{
                left: targetRect.left - 4,
                top: targetRect.top - 4,
                width: targetRect.width + 8,
                height: targetRect.height + 8,
                borderRadius: '8px',
                boxShadow: '0 0 0 4px #fb923c, 0 0 15px rgba(251, 146, 60, 0.5)'
            }}/>}

            <div
                className="absolute bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-sm transition-all duration-300"
                style={style as React.CSSProperties}
            >
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t(step.titleKey)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t(step.contentKey)}</p>
                
                <div className="flex justify-between items-center mt-6">
                    <div>
                        {currentStep === 0 ? (
                           <button onClick={onComplete} className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
                               {t('onboarding_skip')}
                           </button>
                        ) : (
                           <button onClick={handleBack} className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
                                {t('onboarding_back')}
                           </button>
                        )}
                    </div>
                     <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{currentStep + 1} / {tourSteps.length}</span>
                        <button onClick={handleNext} className="px-4 py-2 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600">
                           {currentStep === tourSteps.length - 1 ? t('onboarding_finish') : t('onboarding_next')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingOverlay;