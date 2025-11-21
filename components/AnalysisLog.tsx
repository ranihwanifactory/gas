import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisLogProps {
  logs: AnalysisResult[];
}

export const AnalysisLog: React.FC<AnalysisLogProps> = ({ logs }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'Rare': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Epic': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'Legendary': return 'bg-yellow-100 text-yellow-600 border-yellow-300';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <span className="text-4xl mb-4">👃</span>
        <p>아직 분석된 방구가 없습니다.</p>
        <p className="text-sm">가스를 모아 AI에게 분석을 요청해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 pb-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">방구 도감</h2>
      
      {logs.slice().reverse().map((log) => (
        <div key={log.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl select-none">💨</div>
           
           <div className="flex justify-between items-start mb-2 relative z-10">
             <span className={`text-xs font-bold px-2 py-1 rounded border ${getRarityColor(log.rarity)}`}>
               {log.rarity}
             </span>
             <span className="text-xs text-gray-400">
               {new Date(log.timestamp).toLocaleTimeString()}
             </span>
           </div>

           <p className="text-gray-800 text-lg font-medium mb-3 relative z-10 break-keep">
             "{log.flavor}"
           </p>

           <div className="flex items-center justify-between border-t pt-3 relative z-10">
             <span className="text-sm text-gray-500">독성 점수</span>
             <div className="flex items-center">
               <span className="text-2xl font-bold text-green-600">{log.score}</span>
               <span className="text-sm text-gray-400 ml-1">/ 100</span>
             </div>
           </div>
        </div>
      ))}
    </div>
  );
};