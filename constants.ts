import { UpgradeItem } from './types';

export const UPGRADES: UpgradeItem[] = [
  {
    id: 'beans',
    name: '통조림 콩',
    description: '가스 생산의 기본. 클릭당 가스가 1 증가합니다.',
    baseCost: 15,
    gasPerClickIncrease: 1,
    icon: '🥫',
  },
  {
    id: 'soda',
    name: '탄산음료',
    description: '뱃속을 부글거리게 합니다. 초당 가스 +1.',
    baseCost: 50,
    gasPerSecondIncrease: 1,
    icon: '🥤',
  },
  {
    id: 'eggs',
    name: '삶은 달걀',
    description: '지독한 냄새의 시작. 클릭당 가스 +5.',
    baseCost: 150,
    gasPerClickIncrease: 5,
    icon: '🥚',
  },
  {
    id: 'sweet_potato',
    name: '고구마',
    description: '묵직한 한 방. 초당 가스 +5.',
    baseCost: 300,
    gasPerSecondIncrease: 5,
    icon: '🍠',
  },
  {
    id: 'protein',
    name: '단백질 쉐이크',
    description: '헬스장 냄새. 클릭당 가스 +15.',
    baseCost: 1000,
    gasPerClickIncrease: 15,
    icon: '💪',
  },
  {
    id: 'cheezeball',
    name: '치즈볼',
    description: '느끼함의 절정. 초당 가스 +20.',
    baseCost: 2500,
    gasPerSecondIncrease: 20,
    icon: '🧀',
  },
];

export const MAX_HISTORY = 10;