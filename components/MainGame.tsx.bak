
import React, { useState, useEffect } from 'react';
import { Wind, Sparkles } from 'lucide-react';
import { analyzeGas } from '../services/geminiService';
import { playFartSound } from '../services/audioService';
import { AnalysisResult } from '../types';
import { Button } from './Button';

interface MainGameProps {
  gas: number;
  gasPerClick: number;
  gasPerSecond: number;
  isMuted: boolean;
  onFart: () => void;
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const MainGame: React.FC<MainGameProps> = ({ gas, gasPerClick, gasPerSecond, isMuted, onFart, onAnalysisComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, text: string}[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [gaugeValue, setGaugeValue] = useState(0);

  // Simulate pressure build up visually based on gas amount (mod 1000 for visual loop)
  useEffect(() => {
    const target = Math.min((gas % 500) / 5, 100);
    setGaugeValue(target);
  }, [gas]);

  const handleFartClick = (e: React.MouseEvent) => {
    onFart();
    
    // Play sound if not muted
    if (!isMuted) {
      playFartSound();
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    // Add particle effect
    const texts = ["뿡!", "뿌웅~", "피식", "쾅!", "뽀옹", "푸드득"];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    const id = Date.now();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setParticles(prev => [...prev, { id, x, y, text: randomText }]);

    // Remove particle after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 1000);
  };

  const handleAnalyze = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeGas(gas, gasPerClick);
      onAnalysisComplete({
        id: Date.now().toString(),
        timestamp: Date.now(),
        ...result
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-6">
      
      {/* Pressure Gauge */}
      <div className="w-full max-w-xs bg-gray-200 rounded-full h-6 border-2 border-gray-400 relative overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-red-500 transition-all duration-300"
          style={{ width: `${gaugeValue}%` }}
        ></div>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
          GAS PRESSURE
        </span>
      </div>

      {/* Main Character / Button */}
      <div className="relative">
        <button
          onClick={handleFartClick}
          className={`
            w-64 h-64 rounded-full bg-yellow-100 border-8 border-yellow-300 shadow-xl
            flex flex-col items-center justify-center
            transition-transform duration-100
            ${isAnimating ? 'scale-90 bg-yellow-200' : 'hover:scale-105 animate-float'}
            relative overflow-visible
            active:outline-none focus:outline-none select-none
            touch-manipulation
          `}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <span className="text-8xl filter drop-shadow-lg select-none">🍑</span>
          <span className="mt-4 text-xl font-bold text-yellow-800 select-none">클릭해서 방구끼기</span>
          
          {/* Particles */}
          {particles.map(p => (
            <div 
              key={p.id}
              className="absolute pointer-events-none text-2xl font-bold text-green-600 animate-bounce whitespace-nowrap"
              style={{ 
                left: p.x, 
                top: p.y, 
                transform: `translate(-50%, -50%)` 
              }}
            >
              {p.text}
            </div>
          ))}
        </button>
        
        {/* Gas Cloud Effect when clicked */}
        {isAnimating && (
          <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 pointer-events-none">
             <Wind className="w-20 h-20 text-green-500 opacity-60 animate-pulse" />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-center w-full max-w-xs">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs">클릭 파워</p>
          <p className="text-xl font-bold text-gray-800">+{gasPerClick}</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs">자동 생산</p>
          <p className="text-xl font-bold text-gray-800">+{gasPerSecond || 0}/sec</p> 
        </div>
      </div>

      {/* Special Action */}
      <div className="w-full max-w-xs">
        <Button 
          variant="success" 
          fullWidth 
          onClick={handleAnalyze} 
          disabled={isAnalyzing || gas < 100}
          className="flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>
            {isAnalyzing ? "AI가 냄새 맡는 중..." : "AI 방구 분석 (100 가스 필요)"}
          </span>
        </Button>
        <p className="text-xs text-center mt-2 text-gray-500">
          * 가스가 100 이상일 때 사용 가능
        </p>
      </div>
    </div>
  );
};
