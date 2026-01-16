
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

  const handleNoClick = (e: React.MouseEvent) => {
    // Prevent accidental double clicks and trigger scale
    setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setIsAccepted(true);
  };

  const yesButtonScale = useMemo(() => {
    // Smooth growth curve
    return 1 + noCount * 0.45;
  }, [noCount]);

  const currentNoMessage = useMemo(() => {
    return NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];
  }, [noCount]);

  // Success Screen: The Romantic Love Post
  if (isAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-300 to-red-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <FloatingHearts />
        
        <div className="z-20 max-w-md w-full animate-bounce-in px-4">
          <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(244,63,94,0.3)] p-8 border-4 border-white transform transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white text-2xl shadow-inner">
                  ❤️
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">My Forever Valentine</p>
                  <p className="text-rose-400 text-sm font-medium">Just now • ❤️ Forever</p>
                </div>
              </div>
              <div className="text-rose-500 text-2xl animate-pulse">✨</div>
            </div>

            <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg group aspect-square">
              <div className="absolute inset-0 bg-rose-500/10 group-hover:bg-transparent transition-colors duration-500"></div>
              <img 
                src={SUCCESS_GIF} 
                alt="Sweet Hug" 
                className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-110"
              />
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-romantic text-rose-600 drop-shadow-sm">
                YAY! I LOVE YOU ❤️💞
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed italic">
                "You've made me the happiest person in the universe. I can't wait to spend every moment with you!"
              </p>
              
              <div className="pt-4 flex items-center justify-center gap-4 text-rose-500">
                <span className="h-px bg-rose-200 flex-grow"></span>
                <span className="font-romantic text-2xl">Forever & Always</span>
                <span className="h-px bg-rose-200 flex-grow"></span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
             <button 
                onClick={() => window.location.reload()}
                className="text-white bg-rose-500/20 hover:bg-rose-500/40 px-6 py-2 rounded-full backdrop-blur-sm text-sm font-medium transition-all"
             >
               Click to feel the love again 🌹
             </button>
          </div>
        </div>

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  // Question Screen
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
      <FloatingHearts />

      <div className="z-10 text-center w-full max-w-3xl flex flex-col items-center justify-center min-h-screen">
        <div className="mb-10 transform transition-transform duration-700 hover:scale-110">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <img 
              src={WAITING_GIF} 
              alt="Waiting..." 
              className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-8 border-white shadow-2xl object-cover animate-heartbeat"
            />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-romantic text-rose-500 mb-16 drop-shadow-md animate-fade-down leading-tight relative z-30">
          Will you be my Valentine? 💘
        </h1>

        <div className="relative flex flex-col items-center justify-center w-full min-h-[300px]">
          {/* YES BUTTON - Lower Z-Index so No button stays on top */}
          <button
            onClick={handleYesClick}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-[0_15px_30px_rgba(244,63,94,0.4)] transition-all duration-300 flex items-center justify-center transform active:scale-95 z-20 overflow-hidden whitespace-nowrap border-4 border-rose-300 pointer-events-auto"
            style={{
              padding: `${16 + noCount * 2}px ${40 + noCount * 4}px`,
              fontSize: `${Math.min(1.4 + noCount * 0.2, 10)}rem`,
              transform: `scale(${Math.min(yesButtonScale, 25)})`,
              maxWidth: '90vw',
              lineHeight: '1',
              position: 'absolute'
            }}
          >
            YES ❤️
          </button>

          {/* NO BUTTON - Higher Z-Index to remain visible and clickable on top of the giant Yes button */}
          <div className="z-50 mt-40 md:mt-0 md:ml-60 relative">
            <button
              onClick={handleNoClick}
              className="bg-white/95 backdrop-blur-md hover:bg-white text-gray-700 font-semibold py-4 px-10 rounded-full border-2 border-rose-200 shadow-2xl transition-all duration-300 flex items-center justify-center active:scale-90"
              style={{
                fontSize: '1.2rem',
                minWidth: '200px'
              }}
            >
              <span key={noCount} className="animate-pop text-center">
                {currentNoMessage}
              </span>
            </button>
          </div>
        </div>

        {noCount > 0 && (
           <div className="mt-20 relative z-30">
              <p className="text-rose-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-xl font-romantic font-bold animate-pulse shadow-sm">
                Please say yes... 🥺🌹
              </p>
           </div>
        )}
      </div>
    </div>
  );
};

export default App;
