
import React, { useState, useEffect, useMemo } from 'react';
import FloatingHearts from './components/FloatingHearts';
import ConfettiEffect from './components/ConfettiEffect';
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
    <footer className="absolute bottom-6 w-full text-center z-50 pointer-events-none">
      <p className="text-rose-600 font-romantic font-bold text-2xl tracking-widest drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] select-none animate-pulse-slow">
        Made by Sourish ❤️
      </p>
    </footer>
  );

  // Success Screen: The Romantic Love Post
  if (isAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-300 to-rose-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <FloatingHearts />
        <ConfettiEffect />
        
        <div className="z-20 max-w-lg w-full animate-bounce-in px-4 mb-24">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[3.5rem] shadow-[0_40px_80px_rgba(244,63,94,0.4)] p-8 md:p-12 border-[6px] border-white transform transition-all duration-700">
            <div className="flex items-center justify-between mb-8 border-b-2 border-rose-50 pb-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center text-4xl shadow-inner border-2 border-rose-100 animate-heartbeat">
                  💖
                </div>
                <div>
                  <p className="font-romantic font-bold text-gray-900 text-3xl tracking-tight">Love Status</p>
                  <p className="text-rose-500 text-sm font-bold flex items-center gap-1.5 uppercase tracking-tighter">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                    Verified Couple
                  </p>
                </div>
              </div>
              <div className="text-rose-400 text-4xl animate-spin-slow">✨</div>
            </div>

            <div className="relative rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl border-4 border-rose-50 bg-rose-50 flex items-center justify-center min-h-[320px] transform hover:rotate-1 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10"></div>
              <img 
                src={SUCCESS_GIF} 
                alt="I Love You" 
                className="w-full h-auto object-cover max-h-[500px] transition duration-1000 group-hover:scale-105"
                onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                style={{ opacity: 0, transition: 'opacity 0.5s ease-in' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmV6am84MXpueG56Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l4pTdcifP3L2778R2/giphy.gif";
                }}
              />
            </div>

            <div className="text-center space-y-8">
              <h1 className="text-6xl md:text-8xl font-romantic text-rose-600 drop-shadow-[0_2px_4px_rgba(244,63,94,0.2)] leading-none">
                YAY! I Love You! ❤️
              </h1>
              <div className="bg-gradient-to-r from-rose-50 via-white to-rose-50 p-8 rounded-[2rem] border-2 border-rose-100 shadow-inner">
                <p className="text-gray-800 text-2xl md:text-3xl leading-relaxed font-bold italic font-romantic">
                  "You've just made me the luckiest person alive. My heart is yours forever!"
                </p>
              </div>
              
              <div className="pt-2 flex items-center justify-center gap-6 text-rose-300">
                <span className="h-[2px] bg-rose-100 flex-grow"></span>
                <span className="font-romantic text-4xl text-rose-400 drop-shadow-sm">Forever & Always</span>
                <span className="h-[2px] bg-rose-100 flex-grow"></span>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
             <button 
                onClick={() => window.location.reload()}
                className="bg-white/80 backdrop-blur-md text-rose-500 hover:bg-rose-500 hover:text-white px-12 py-5 rounded-full shadow-2xl text-xl font-black transition-all duration-500 transform hover:scale-110 active:scale-95 border-2 border-white"
             >
               Click to feel the love again 🌹
             </button>
          </div>
        </div>

        {footer}

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          .animate-fade-in {
            animation: fade-in 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
          .animate-spin-slow {
            animation: spin-slow 12s linear infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // Question Screen
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100`}>
      <FloatingHearts />

      <div className="z-10 text-center w-full max-w-5xl flex flex-col items-center justify-center min-h-screen">
        <div className="mb-14 transform transition-transform duration-700 hover:scale-110">
          <div className="relative p-6">
            <div className="absolute inset-0 bg-rose-400 rounded-full blur-[80px] opacity-25 animate-pulse"></div>
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-[10px] border-white shadow-[0_30px_60px_rgba(244,63,94,0.2)] overflow-hidden bg-white z-10">
                <img 
                src={WAITING_GIF} 
                alt="Waiting for you..." 
                className="w-full h-full object-cover animate-heartbeat"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHV6NnlqbzB6NnlqbzB6NnlqbzB6NnlqbzB6NnlqbzB6NnlqbzB6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/c76IJLufpNUMo/giphy.gif";
                }}
                />
            </div>
          </div>
        </div>

        <h1 className="text-7xl md:text-9xl font-romantic text-rose-500 mb-24 drop-shadow-[0_4px_6px_rgba(244,63,94,0.2)] animate-fade-down leading-tight relative z-30 tracking-tight px-4">
          Will you be my Valentine? 💘
        </h1>

        <div className="relative flex flex-col items-center justify-center w-full min-h-[400px]">
          {/* YES BUTTON - The target */}
          <button
            onClick={handleYesClick}
            className="bg-rose-500 hover:bg-rose-600 text-white font-black rounded-full shadow-[0_25px_50px_rgba(244,63,94,0.6)] transition-all duration-300 flex items-center justify-center transform active:scale-95 z-20 overflow-hidden whitespace-nowrap border-[6px] border-rose-200 pointer-events-auto"
            style={{
              padding: `${24 + noCount * 2}px ${60 + noCount * 4}px`,
              fontSize: `${Math.min(1.8 + noCount * 0.3, 15)}rem`,
              transform: `scale(${Math.min(yesButtonScale, 35)})`,
              maxWidth: '95vw',
              lineHeight: '1',
              position: 'absolute',
              boxShadow: '0 20px 40px rgba(244,63,94,0.5)'
            }}
          >
            YES ❤️
          </button>

          {/* NO BUTTON - The playful one */}
          <div className="z-50 mt-56 md:mt-0 md:translate-x-64 relative pointer-events-auto">
            <button
              onClick={handleNoClick}
              className="bg-white/95 backdrop-blur-xl hover:bg-white text-gray-800 font-black py-6 px-16 rounded-full border-4 border-rose-100 shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300 flex items-center justify-center active:scale-90 hover:border-rose-400 group"
              style={{
                fontSize: '1.5rem',
                minWidth: '260px'
              }}
            >
              <span key={noCount} className="animate-pop text-center group-hover:scale-110 transition-transform">
                {currentNoMessage}
              </span>
            </button>
          </div>
        </div>

        {noCount > 0 && (
           <div className="mt-28 relative z-40">
              <div className="bg-white/80 backdrop-blur-md px-12 py-4 rounded-full border-2 border-rose-200 shadow-2xl animate-bounce">
                <p className="text-rose-600 text-4xl font-romantic font-black tracking-wide drop-shadow-sm">
                  Pretty please? 🌹✨
                </p>
              </div>
           </div>
        )}
      </div>

      {footer}
    </div>
  );
};

export default App;
