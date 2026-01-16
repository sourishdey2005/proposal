
import React, { useState, useEffect, useMemo } from 'react';
import FloatingHearts from './components/FloatingHearts';
import { NO_MESSAGES, SUCCESS_GIF, WAITING_GIF } from './constants';

const App: React.FC = () => {
  const [noCount, setNoCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setIsAccepted(true);
  };

  const yesButtonScale = useMemo(() => {
    return 1 + noCount * 0.4;
  }, [noCount]);

  const currentNoMessage = useMemo(() => {
    return NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];
  }, [noCount]);

  if (isAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-red-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <FloatingHearts />
        
        <div className="z-10 text-center animate-bounce-in">
          <h1 className="text-6xl md:text-8xl font-romantic text-rose-600 mb-8 drop-shadow-xl">
            YAY! I LOVE YOU ❤️💞
          </h1>
          <div className="relative group max-w-sm md:max-w-md mx-auto">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
            <img 
              src={SUCCESS_GIF} 
              alt="Celebration" 
              className="relative rounded-2xl shadow-2xl w-full border-8 border-white transform transition duration-700 hover:rotate-3"
            />
          </div>
          <p className="mt-10 text-2xl text-rose-500 font-bold italic animate-pulse">
            The happiest person in the world right now! ✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <FloatingHearts />

      <div className="z-10 text-center w-full max-w-3xl flex flex-col items-center">
        <div className="mb-8 transform transition-transform duration-700 hover:scale-110">
          <img 
            src={WAITING_GIF} 
            alt="Waiting..." 
            className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white shadow-2xl object-cover animate-heartbeat"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-romantic text-rose-500 mb-16 drop-shadow-md animate-fade-down">
          Will you be my Valentine? 💘
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-auto min-h-[140px]">
          {/* YES BUTTON */}
          <button
            onClick={handleYesClick}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-[0_10px_20px_rgba(244,63,94,0.4)] transition-all duration-300 flex items-center justify-center transform active:scale-95 z-50 overflow-hidden whitespace-nowrap"
            style={{
              padding: `${16 + noCount * 4}px ${40 + noCount * 8}px`,
              fontSize: `${Math.min(1.2 + noCount * 0.3, 8)}rem`,
              transform: `scale(${Math.min(yesButtonScale, 20)})`,
              maxWidth: '95vw',
              lineHeight: '1',
            }}
          >
            YES ❤️
          </button>

          {/* NO BUTTON */}
          {noCount < 20 && (
            <button
              onClick={handleNoClick}
              className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 font-semibold py-4 px-10 rounded-full border-2 border-rose-100 shadow-lg transition-all duration-300 flex items-center justify-center active:scale-90 z-40"
              style={{
                fontSize: '1.1rem',
                opacity: yesButtonScale > 8 ? 0 : 1,
                pointerEvents: yesButtonScale > 8 ? 'none' : 'auto'
              }}
            >
              <span key={noCount} className="animate-pop">
                {currentNoMessage}
              </span>
            </button>
          )}
        </div>

        {noCount > 0 && noCount < 15 && (
           <div className="mt-12 h-8">
              <p className="text-rose-400 text-xl font-medium italic animate-pulse">
                Click the big red button! 🥺
              </p>
           </div>
        )}
      </div>
    </div>
  );
};

export default App;
