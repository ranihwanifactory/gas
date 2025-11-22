
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Gamepad2, ScrollText, Wind, Share2, Volume2, VolumeX } from 'lucide-react';
import { MainGame } from './components/MainGame';
import { Shop } from './components/Shop';
import { AnalysisLog } from './components/AnalysisLog';
import { GameState, Tab, AnalysisResult } from './types';
import { UPGRADES, MAX_HISTORY } from './constants';

const INITIAL_STATE: GameState = {
  gas: 0,
  totalGasGenerated: 0,
  gasPerClick: 1,
  gasPerSecond: 0,
  upgrades: {}
};

function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.GAME);
  const [analysisLogs, setAnalysisLogs] = useState<AnalysisResult[]>([]);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Passive Income Loop
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      if (gameState.gasPerSecond > 0) {
        setGameState(prev => ({
          ...prev,
          gas: prev.gas + prev.gasPerSecond,
          totalGasGenerated: prev.totalGasGenerated + prev.gasPerSecond
        }));
      }
    }, 1000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [gameState.gasPerSecond]);

  const handleFart = () => {
    setGameState(prev => ({
      ...prev,
      gas: prev.gas + prev.gasPerClick,
      totalGasGenerated: prev.totalGasGenerated + prev.gasPerClick
    }));
  };

  const handleBuyUpgrade = (itemId: string) => {
    const item = UPGRADES.find(u => u.id === itemId);
    if (!item) return;

    const currentLevel = gameState.upgrades[itemId] || 0;
    const cost = Math.floor(item.baseCost * Math.pow(1.15, currentLevel));

    if (gameState.gas >= cost) {
      setGameState(prev => ({
        ...prev,
        gas: prev.gas - cost,
        gasPerClick: prev.gasPerClick + (item.gasPerClickIncrease || 0),
        gasPerSecond: prev.gasPerSecond + (item.gasPerSecondIncrease || 0),
        upgrades: {
          ...prev.upgrades,
          [itemId]: currentLevel + 1
        }
      }));
    }
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setGameState(prev => ({
      ...prev,
      gas: Math.max(0, prev.gas - 100)
    }));

    setAnalysisLogs(prev => {
      const newLogs = [...prev, result];
      if (newLogs.length > MAX_HISTORY) {
        return newLogs.slice(newLogs.length - MAX_HISTORY);
      }
      return newLogs;
    });
    
    setActiveTab(Tab.LOG);
  };

  const handleShare = async () => {
    const text = `💨 방구석 가스왕\n현재 내 가스 보유량: ${Math.floor(gameState.gas).toLocaleString()}\n총 생산량: ${Math.floor(gameState.totalGasGenerated).toLocaleString()}\n\n나보다 가스 많은 사람?`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: '방구석 가스왕',
          text: text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2000);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 font-sans text-gray-900 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden border-x border-green-100 relative">
      
      {/* Toast Notification */}
      {showShareToast && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg animate-pop">
          클립보드에 복사되었습니다!
        </div>
      )}

      {/* Header */}
      <header className="bg-white p-4 shadow-sm z-10 sticky top-0">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-green-800 flex items-center gap-2">
            <Wind className="text-green-500" /> 방구석 가스왕
          </h1>
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 px-3 py-1 rounded-full text-green-700 font-bold text-xs">
              Lv. {Math.floor(Math.sqrt(gameState.totalGasGenerated / 100)) + 1}
            </div>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button 
              onClick={handleShare}
              className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="공유하기"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 text-white flex justify-between items-center shadow-inner relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider">Total Gas</p>
            <p className="text-3xl font-bold font-mono text-green-400">{Math.floor(gameState.gas).toLocaleString()}</p>
          </div>
          <div className="text-right relative z-10">
             <p className="text-gray-400 text-[10px]">Production</p>
             <p className="text-sm font-mono">+{gameState.gasPerSecond}/sec</p>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {activeTab === Tab.GAME && (
          <MainGame 
            gas={gameState.gas} 
            gasPerClick={gameState.gasPerClick}
            gasPerSecond={gameState.gasPerSecond}
            isMuted={isMuted}
            onFart={handleFart} 
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}
        {activeTab === Tab.SHOP && (
          <Shop gameState={gameState} onBuy={handleBuyUpgrade} />
        )}
        {activeTab === Tab.LOG && (
          <AnalysisLog logs={analysisLogs} />
        )}
      </main>

      {/* Footer Info (Only on Game Tab) */}
      {activeTab === Tab.GAME && (
         <div className="text-center pb-2 text-[10px] text-gray-400">
           v1.1.0 • Powered by Google Gemini
         </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 pb-safe pt-2 px-6 sticky bottom-0 z-10 h-20">
        <div className="flex justify-between items-center h-full pb-2">
          <button 
            onClick={() => setActiveTab(Tab.GAME)}
            className={`flex flex-col items-center space-y-1 w-16 transition-colors ${activeTab === Tab.GAME ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Gamepad2 className={`w-6 h-6 ${activeTab === Tab.GAME ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">게임</span>
          </button>
          
          <button 
            onClick={() => setActiveTab(Tab.SHOP)}
            className={`flex flex-col items-center space-y-1 w-16 transition-colors ${activeTab === Tab.SHOP ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <ShoppingCart className={`w-6 h-6 ${activeTab === Tab.SHOP ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">상점</span>
          </button>
          
          <button 
            onClick={() => setActiveTab(Tab.LOG)}
            className={`flex flex-col items-center space-y-1 w-16 transition-colors ${activeTab === Tab.LOG ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <ScrollText className={`w-6 h-6 ${activeTab === Tab.LOG ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">도감</span>
          </button>
        </div>
      </nav>

    </div>
  );
}

export default App;
