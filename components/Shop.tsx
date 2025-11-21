import React from 'react';
import { UPGRADES } from '../constants';
import { GameState } from '../types';
import { Button } from './Button';

interface ShopProps {
  gameState: GameState;
  onBuy: (itemId: string) => void;
}

export const Shop: React.FC<ShopProps> = ({ gameState, onBuy }) => {
  
  const getCost = (baseCost: number, level: number) => {
    return Math.floor(baseCost * Math.pow(1.15, level));
  };

  return (
    <div className="space-y-4 pb-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 px-4">편의점 (업그레이드)</h2>
      
      <div className="grid gap-4 px-4">
        {UPGRADES.map(item => {
          const level = gameState.upgrades[item.id] || 0;
          const cost = getCost(item.baseCost, level);
          const canAfford = gameState.gas >= cost;

          return (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{item.name} <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Lv.{level}</span></h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    {item.gasPerClickIncrease && `+${item.gasPerClickIncrease} 클릭/가스 `}
                    {item.gasPerSecondIncrease && `+${item.gasPerSecondIncrease} 초/가스`}
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => onBuy(item.id)}
                disabled={!canAfford}
                variant={canAfford ? 'primary' : 'secondary'}
                className="min-w-[80px] text-sm"
              >
                {cost.toLocaleString()} G
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};