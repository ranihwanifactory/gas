export interface UpgradeItem {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  gasPerClickIncrease?: number;
  gasPerSecondIncrease?: number;
  icon: string;
}

export interface GameState {
  gas: number;
  totalGasGenerated: number;
  gasPerClick: number;
  gasPerSecond: number;
  upgrades: Record<string, number>; // itemId -> level
}

export interface AnalysisResult {
  id: string;
  timestamp: number;
  flavor: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  score: number;
}

export enum Tab {
  GAME = 'GAME',
  SHOP = 'SHOP',
  LOG = 'LOG'
}