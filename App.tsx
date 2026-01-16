
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
    return 1 + noCount * 0.45;
  }, [noCount]);

  const currentNoMessage = useMemo(() => {
    return NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];
  }, [noCount]);

  const footer = (
    <footer className="absolute bottom-6 w-full text-center z-50">
      <p className="text-rose-400 font-medium text-sm tracking-widest opacity-80 select-none">
        (Made by Sourish ❤️)
      </p>
    </footer>
  );

  // Success Screen: The Romantic Love Post
  if (isAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-300 to-rose-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <FloatingHearts />
        
        <div className="z-20 max-w-lg w-full animate-bounce-in px-4 mb-16">
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-[0_30px_60px_rgba(244,63,94,0.4)] p-8 md:p-10 border-4 border-white transform transition-all hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-8 border-b border-rose-50 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-rose-500 flex items-center justify-center text-3xl shadow-inner border-2 border-rose-100">
                  💖
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-xl">Love Official Post</p>
                  <p className="text-rose-500 text-sm font-semibold flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    Now & Forever
                  </p>
                </div>
              </div>
              <div className="text-rose-400 text-3xl animate-spin-slow">✨</div>
            </div>

            <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl group border-4 border-rose-50">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10"></div>
              <img 
                src={SUCCESS_GIF} 
                alt="Sweet Love" 
                className="w-full h-auto min-h-[300px] object-cover transform transition duration-2000 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmV6am84MXpueG56Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l4pTdcifP3L2778R2/giphy.gif";
                }}
              />
            </div>

            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-romantic text-rose-600 drop-shadow-sm leading-tight">
                Yes! I Love You Too! ❤️
              </h1>
              <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-semibold italic">
                  "Every day with you is a dream come true. You're my favorite person, my best friend, and now... my Valentine!"
                </p>
              </div>
              
              <div className="pt-4 flex items-center justify-center gap-4 text-rose-400">
                <span className="h-px bg-rose-200 flex-grow"></span>
                <span className="font-romantic text-3xl">You & Me Always</span>
                <span className="h-px bg-rose-200 flex-grow"></span>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
             <button 
                onClick={() => window.location.reload()}
                className="bg-white text-rose-500 hover:bg-rose-500 hover:text-white px-10 py-4 rounded-full shadow-xl text-lg font-bold transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white"
             >
               Click to feel the love again 🌹
             </button>
          </div>
        </div>

        {footer}

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  // Question Screen
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100`}>
      <FloatingHearts />

      <div className="z-10 text-center w-full max-w-4xl flex flex-col items-center justify-center min-h-screen">
        <div className="mb-12 transform transition-transform duration-700 hover:scale-110">
          <div className="relative p-4">
            <div className="absolute inset-0 bg-rose-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <img 
              src={WAITING_GIF} 
              alt="Waiting..." 
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] object-cover animate-heartbeat z-10"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHV6NnlqbzB6NnlqbzB6NnlqbzB6NnlqbzB6NnlqbzB6NnlqbzB6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/c76IJLufpNUMo/giphy.gif";
              }}
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-romantic text-rose-500 mb-20 drop-shadow-xl animate-fade-down leading-tight relative z-30 tracking-tight">
          Will you be my Valentine? 💘
        </h1>

        <div className="relative flex flex-col items-center justify-center w-full min-h-[350px]">
          {/* YES BUTTON - Behind everything else but still interactive */}
          <button
            onClick={handleYesClick}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-[0_20px_40px_rgba(244,63,94,0.5)] transition-all duration-300 flex items-center justify-center transform active:scale-95 z-20 overflow-hidden whitespace-nowrap border-4 border-rose-300 pointer-events-auto"
            style={{
              padding: `${20 + noCount * 2}px ${50 + noCount * 4}px`,
              fontSize: `${Math.min(1.5 + noCount * 0.25, 12)}rem`,
              transform: `scale(${Math.min(yesButtonScale, 30)})`,
              maxWidth: '90vw',
              lineHeight: '1',
              position: 'absolute'
            }}
          >
            YES ❤️
          </button>

          {/* NO BUTTON - Stays on top of the scaling YES button */}
          <div className="z-50 mt-48 md:mt-0 md:translate-x-48 relative pointer-events-auto">
            <button
              onClick={handleNoClick}
              className="bg-white/95 backdrop-blur-md hover:bg-white text-gray-700 font-bold py-5 px-12 rounded-full border-2 border-rose-200 shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-300 flex items-center justify-center active:scale-90 hover:border-rose-400 group"
              style={{
                fontSize: '1.3rem',
                minWidth: '220px'
              }}
            >
              <span key={noCount} className="animate-pop text-center group-hover:scale-105 transition-transform">
                {currentNoMessage}
              </span>
            </button>
          </div>
        </div>

        {noCount > 0 && (
           <div className="mt-24 relative z-40">
              <p className="text-rose-600 bg-white/70 backdrop-blur-sm px-8 py-3 rounded-full text-2xl font-romantic font-bold animate-pulse shadow-xl border-2 border-rose-100">
                Pretty please? 🌹✨
              </p>
           </div>
        )}
      </div>

      {footer}
    </div>
  );
};

export default App;
