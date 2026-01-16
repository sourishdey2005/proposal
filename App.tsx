
import React, { useState, useEffect, useMemo } from 'react';
import FloatingHearts from './components/FloatingHearts';
import { NO_MESSAGES, SUCCESS_GIF, WAITING_GIF } from './constants';

const App: React.FC = () => {
  const [noCount, setNoCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in effect on mount
    setIsVisible(true);
  }, []);

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setIsAccepted(true);
  };

  // Calculate scaling for the YES button
  const yesButtonScale = useMemo(() => {
    return 1 + noCount * 0.45;
  }, [noCount]);

  // Determine the current message for the NO button
  const currentNoMessage = useMemo(() => {
    return NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];
  }, [noCount]);

  if (isAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-200 to-red-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <FloatingHearts />
        
        <div className="z-10 text-center animate-bounce-in">
          <h1 className="text-5xl md:text-7xl font-romantic text-rose-600 mb-8 drop-shadow-lg">
            YAY! I LOVE YOU ❤️💞
          </h1>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-rose-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={SUCCESS_GIF} 
              alt="Celebration" 
              className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto border-4 border-white transform transition duration-500 hover:scale-105"
            />
          </div>
          <p className="mt-8 text-xl text-rose-500 font-semibold italic animate-pulse">
            The happiest person in the world right now! ✨
          </p>
        </div>

        <style>{`
          @keyframes bounce-in {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); opacity: 1; }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
          .animate-bounce-in {
            animation: bounce-in 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex flex-col items-center justify-center p-6 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <FloatingHearts />

      <div className="z-10 text-center w-full max-w-2xl flex flex-col items-center">
        <div className="mb-6 transform transition-transform duration-500 hover:scale-110">
          <img 
            src={WAITING_GIF} 
            alt="Waiting..." 
            className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-rose-300 shadow-lg object-cover"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-romantic text-rose-500 mb-12 animate-fade-down">
          Will you be my Valentine? 💘
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full h-auto min-h-[120px]">
          {/* YES BUTTON */}
          <button
            onClick={handleYesClick}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-lg hover:shadow-rose-400/50 transition-all duration-300 flex items-center justify-center transform active:scale-95"
            style={{
              padding: `${12 + noCount * 2}px ${32 + noCount * 4}px`,
              fontSize: `${Math.min(1.2 + noCount * 0.2, 5)}rem`,
              zIndex: 50,
              boxShadow: '0 10px 15px -3px rgba(244, 63, 94, 0.4)',
              transform: `scale(${Math.min(yesButtonScale, 15)})`,
              maxWidth: '90vw'
            }}
          >
            YES ❤️
          </button>

          {/* NO BUTTON - stays visible but moves around slightly if desired, here we just update text */}
          {noCount < 20 && (
            <button
              onClick={handleNoClick}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-full border-2 border-gray-200 shadow-sm transition-all duration-300 flex items-center justify-center active:scale-90"
              style={{
                fontSize: '1rem',
                zIndex: 40,
                visibility: yesButtonScale > 10 ? 'hidden' : 'visible'
              }}
            >
              <span key={noCount} className="animate-pop">
                {currentNoMessage}
              </span>
            </button>
          )}
        </div>

        {noCount > 0 && noCount < 10 && (
           <p className="mt-8 text-rose-400 font-medium italic animate-bounce">
              Don't you dare! 🥺
           </p>
        )}
      </div>

      <style>{`
        @keyframes fade-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-fade-down {
          animation: fade-down 1.2s ease-out;
        }
        .animate-pop {
          animation: pop 0.3s ease-out;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default App;
