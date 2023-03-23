import { Game } from '../../services/DTOs';
import { create } from 'zustand/esm';

interface GameStore {
  games: Game[];
  setGames: (games: Game[]) => void;
}

export const useGameStore = create<GameStore>(set => ({
  games: [],
  setGames: games => set({ games }),
}));
