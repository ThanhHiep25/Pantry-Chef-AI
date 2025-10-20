import React from 'react';

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export const ChefHatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.28,8.34C17.5,7.25,16,6.5,14.5,6.5c-0.34,0-0.67,0.04-1,0.09V3c0-0.55-0.45-1-1-1s-1,0.45-1,1v3.59 c-0.33-0.05-0.66-0.09-1-0.09c-1.5,0-3,0.75-3.78,1.84C6.07,9.22,5.5,10.53,5.5,12c0,1.13,0.25,2.19,0.7,3.12V19 c0,1.1,0.9,2,2,2h7.6c1.1,0,2-0.9,2-2v-3.88c0.45-0.93,0.7-1.99,0.7-3.12C18.5,10.53,17.93,9.22,18.28,8.34z M13.5,12 c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5S13.5,11.17,13.5,12z" />
  </svg>
);

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
  </svg>
);

export const BookmarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </svg>
);

export const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

export const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const FireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a4.5 4.5 0 004.5-4.5v-1.5a4.5 4.5 0 00-4.5 4.5v1.5z" />
    </svg>
);

export const BoltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

export const CubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
);

export const DropletIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V12a1.5 1.5 0 00-1.5-1.5h-3.75a.75.75 0 01-.75-.75V5.25A1.5 1.5 0 007.5 3.75z" />
    </svg>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

export const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 00-12 0m12 0a9.094 9.094 0 01-12 0m12 0v-2.25m0 2.25c.342-.03.68-.063 1.022-.099m-1.022.099a9.095 9.095 0 00-1.022-.099m12 0c-.342.03-.68.063-1.022.099M6 18.72v-2.25m0 2.25c-.342-.03-.68-.063-1.022-.099m1.022.099a9.095 9.095 0 011.022-.099m-12 0c.342.03.68.063 1.022.099M12 6.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM12 6.75a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0z" />
  </svg>
);

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

export const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

export const PrinterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
  </svg>
);

export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.95-4.243l-1.59-1.59M3 12h2.25m.386-6.364l1.59 1.59M12 12a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
  </svg>
);

export const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25c0 5.385 4.365 9.75 9.75 9.75 2.572 0 4.92-1.007 6.697-2.648z" />
  </svg>
);

export const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.007 1.11-1.11h1.094c.55.103 1.02.568 1.11 1.11.09.542-.27.989-.821 1.21-.293.118-.542.33-.728.592h-1.094c-.186-.262-.435-.474-.728-.592C10.613 4.929 10.253 4.482 10.343 3.94zM12 5.25a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM13.657 20.06c-.09.542-.56 1.007-1.11 1.11h-1.094c-.55-.103-1.02-.568-1.11-1.11-.09-.542.27-.989.821-1.21.293-.118.542-.33.728-.592h1.094c.186.262.435.474.728.592.551.221.911.668.821 1.21z" />
    </svg>
);

// Background decoration icons
export const BackgroundCarrotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M20 20L40 15L35 35Z" fill="currentColor"/>
        <path d="M20 20L15 10 M18 18L13 9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const BackgroundTomatoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="20" cy="25" r="15" fill="currentColor"/>
        <path d="M20 10L22 7M20 10L18 7M20 10L20 6" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const BackgroundBroccoliIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M 50 90 L 50 60" stroke="#a3e635" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="50" cy="40" r="30" fill="currentColor" />
      <circle cx="35" cy="45" r="10" fill="#a3e635"/>
      <circle cx="65" cy="45" r="10" fill="#a3e635"/>
      <circle cx="50" cy="25" r="10" fill="#a3e635"/>
  </svg>
);

export const BackgroundOnionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M50,20 C20,20 20,70 50,70 C80,70 80,20 50,20 Z" stroke="currentColor" strokeWidth="4"/>
        <path d="M50,70 C45,85 55,85 50,70 Z" fill="currentColor" />
        <path d="M45,20 C45,15 55,15 55,20" stroke="currentColor" strokeWidth="4" />
        <path d="M50,20 C50,30 40,40 40,50" stroke="currentColor" strokeWidth="2"/>
        <path d="M50,20 C50,30 60,40 60,50" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

// More background decorations
export const BackgroundGrapesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="50" cy="40" r="12" fill="currentColor"/>
        <circle cx="35" cy="55" r="12" fill="currentColor"/>
        <circle cx="65" cy="55" r="12" fill="currentColor"/>
        <circle cx="50" cy="70" r="12" fill="currentColor"/>
        <path d="M50 40 L50 20 L55 20" stroke="#16a34a" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);

export const BackgroundAppleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M50 85 C 20 85, 10 60, 30 40 C 40 25, 60 25, 70 40 C 90 60, 80 85, 50 85 Z" fill="currentColor"/>
        <path d="M60 40 C 55 20, 70 20, 65 10" stroke="#a16207" strokeWidth="4" strokeLinecap="round"/>
        <path d="M65 10 L75 15" stroke="#16a34a" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);

export const BackgroundJamJarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="25" y="20" width="50" height="15" rx="5" fill="#a1a1aa" /> {/* Lid */}
        <path d="M20 35 H 80 L 75 85 Q 70 95, 50 95 Q 30 95, 25 85 Z" fill="currentColor" />
        <rect x="35" y="50" width="30" height="20" fill="#fef3c7" /> {/* Label */}
    </svg>
);

// Ingredient Icons
export const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.8,2.4C8.3,3.7,8.2,5.2,7.3,6.3c-1,1.1-2.6,1.5-4,1.1C5.2,5.2,6.5,3.6,7.8,2.4z M14.8,9.4 c1.3,0.5,2.8,0.3,3.9-0.7c1.1-1,1.5-2.6,1.1-4c-2.2,1.9-4.3,3.8-6.5,5.7C13.8,10.2,14.3,9.8,14.8,9.4z" />
    <path d="M11.5,12.8c-0.6,0.6-1.1,1.2-1.7,1.8c-2.9,3.1-6,6.2-9,9.4c2.2-2.3,4.4-4.5,6.6-6.8c0.5-0.5,1-1,1.5-1.5 C9.5,15.2,10.1,14.6,11.5,12.8z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export const LemonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v19.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 12H2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.071 7.929L7.929 16.071" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.071 16.071L7.929 7.929" />
  </svg>
);

export const MeatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 14.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 2.485-2.015 4.5-4.5 4.5-1.12 0-2.15-.412-2.932-.932" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 10c0-1.38-1.12-2.5-2.5-2.5S9.5 8.62 9.5 10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.828 17.172a4.5 4.5 0 016.364 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.01" />
    </svg>
);

export const FishIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0-3.866 4.03-7 9-7s9 3.134 9 7-4.03 7-9 7-9-3.134-9-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12l-3.375-2.25M21 12l-3.375 2.25" />
    </svg>
);


export const CheeseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9.75v4.5m-19.5-4.5v4.5m19.5 0a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m16.5-9l-8.25-4.5-8.25 4.5" />
    </svg>
);

export const GrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 2.25v4.5m0 0a2.25 2.25 0 002.25 2.25h.75a2.25 2.25 0 002.25-2.25v-4.5m-5.25 0a2.25 2.25 0 012.25 2.25h.75a2.25 2.25 0 012.25-2.25v-4.5m-5.25 0a2.25 2.25 0 00-2.25 2.25h-.75a2.25 2.25 0 00-2.25-2.25v-4.5m5.25 0h-5.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25v8.25" />
  </svg>
);