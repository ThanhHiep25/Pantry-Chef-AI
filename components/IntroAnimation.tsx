import React, { useState, useEffect } from 'react';

const IntroAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [animationState, setAnimationState] = useState<'start' | 'opening' | 'finished' | 'fading'>('start');

  useEffect(() => {
    // Sequence the animation
    const timer1 = setTimeout(() => setAnimationState('opening'), 500); // Start opening fridge
    const timer2 = setTimeout(() => setAnimationState('finished'), 2500); // Fridge is open, pause
    const timer3 = setTimeout(() => setAnimationState('fading'), 3500); // Start fading out
    const timer4 = setTimeout(onComplete, 4000); // Animation is done, call parent

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(249 250 251)', // bg-gray-50
        transition: 'opacity 0.5s ease-in-out',
        opacity: animationState === 'fading' ? 0 : 1,
      }}
      className="dark:bg-gray-900"
    >
      <style>{`
        .fridge-container {
          perspective: 1500px;
        }
        .fridge-door {
          transform-origin: left;
          transition: transform 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          transform: rotateY(0deg);
        }
        .fridge-door.opening {
          transform: rotateY(-110deg);
        }
        .table-scene, .fridge-contents {
            opacity: 0;
            transition: opacity 0.8s ease-in 0.5s;
        }
        .table-scene.visible, .fridge-contents.visible {
            opacity: 1;
        }
      `}</style>
      <div className="fridge-container">
        <svg width="250" height="400" viewBox="0 0 250 400" xmlns="http://www.w3.org/2000/svg">
          {/* Background Scene */}
          <g className={`table-scene ${animationState === 'opening' || animationState === 'finished' ? 'visible' : ''}`}>
            <rect x="20" y="300" width="210" height="10" fill="#a16207" /> {/* Table top */}
            <rect x="40" y="310" width="10" height="80" fill="#a16207" /> {/* Table leg 1 */}
            <rect x="200" y="310" width="10" height="80" fill="#a16207" /> {/* Table leg 2 */}
            <circle cx="125" cy="280" r="30" fill="#f3f4f6" /> {/* Plate */}
            <rect x="165" y="260" width="5" height="40" rx="2" fill="#d1d5db" /> {/* Knife */}
            <path d="M80 260 C 80 250, 95 250, 95 260 L 95 300 L 90 300 L 90 265 L 85 300 L 80 300 Z" fill="#d1d5db" /> {/* Fork */}
          </g>

          {/* Fridge Body */}
          <g>
            <rect x="50" y="20" width="150" height="360" rx="10" fill="#e5e7eb" className="dark:fill-gray-600" />
            <rect x="60" y="30" width="130" height="230" fill="#d1d5db" className="dark:fill-gray-500" />
            <rect x="60" y="270" width="130" height="100" fill="#d1d5db" className="dark:fill-gray-500" />
            {/* Shelf */}
            <rect x="60" y="262" width="130" height="4" fill="#f3f4f6" className="dark:fill-gray-400" />
          </g>
          
          {/* Fridge Contents */}
          <g className={`fridge-contents ${animationState === 'opening' || animationState === 'finished' ? 'visible' : ''}`}>
            {/* Top Shelf */}
            {/* Milk Carton */}
            <g>
              <rect x="70" y="200" width="30" height="60" rx="2" fill="#f9fafb" />
              <rect x="70" y="205" width="30" height="20" fill="#3b82f6" />
              <text x="75" y="220" fontFamily="sans-serif" fontSize="8" fill="white" fontWeight="bold">MILK</text>
            </g>
            {/* Eggs */}
            <g>
               <ellipse cx="120" cy="245" rx="8" ry="10" fill="#f5f3ff"/>
               <ellipse cx="138" cy="245" rx="8" ry="10" fill="#f5f3ff"/>
            </g>
            {/* Jar */}
            <g>
                <rect x="155" y="220" width="25" height="40" rx="3" fill="#fef9c3" />
                <rect x="152" y="215" width="31" height="8" rx="2" fill="#713f12" />
            </g>
             {/* Bottom Shelf (Crisper) */}
            {/* Carrot */}
            <g>
                <path d="M75 330 l25 -5 l-5 20 z" fill="#f97316" />
                <path d="M75 330 l-5 -10 M72 328 l-5 -8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
            </g>
            {/* Lettuce */}
            <g>
                <circle cx="110" cy="340" r="18" fill="#84cc16" />
                <path d="M100 335 C 110 330, 120 335, 120 345" fill="none" stroke="#a3e635" strokeWidth="3" />
            </g>
            {/* Tomato */}
            <g>
                <circle cx="150" cy="345" r="15" fill="#ef4444"/>
                <path d="M150 330 l2 -3 M150 330 l-2 -3 M150 330 l0 -4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </g>

          {/* Fridge Door */}
          <g className={`fridge-door ${animationState === 'opening' || animationState === 'finished' ? 'opening' : ''}`}>
            <rect x="50" y="20" width="150" height="360" rx="10" fill="#f9fafb" className="dark:fill-gray-800" stroke="#d1d5db" strokeWidth="2" />
            <rect x="185" y="180" width="8" height="40" rx="4" fill="#d1d5db" className="dark:fill-gray-600" />
             {/* Logo on fridge */}
            <g transform="translate(95 180)">
                <path d="M18.28,8.34C17.5,7.25,16,6.5,14.5,6.5c-0.34,0-0.67,0.04-1,0.09V3c0-0.55-0.45-1-1-1s-1,0.45-1,1v3.59 c-0.33-0.05-0.66-0.09-1-0.09c-1.5,0-3,0.75-3.78,1.84C6.07,9.22,5.5,10.53,5.5,12c0,1.13,0.25,2.19,0.7,3.12V19 c0,1.1,0.9,2,2,2h7.6c1.1,0,2-0.9,2-2v-3.88c0.45-0.93,0.7-1.99,0.7-3.12C18.5,10.53,17.93,9.22,18.28,8.34z M13.5,12 c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S13.5,11.17,13.5,12z" fill="#fb923c" transform="scale(1.5)"/>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default IntroAnimation;
