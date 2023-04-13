import { create } from 'zustand';
import { Player } from '../../services/DTOs';

type PlayerStore = {
  selectedPlayer: Player | null;
  setSelectedPlayer: (player: Player | null) => void;
};

export const usePlayerStore = create<PlayerStore>(set => ({
  selectedPlayer: null,
  setSelectedPlayer: player => set({ selectedPlayer: player }),
}));
