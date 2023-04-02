import { create } from 'zustand';
import { Player } from '../../services/DTOs';

type PlayerStore = {
  selectedPlayer: Player | null;
  backgroundColor: string;
  setSelectedPlayer: (player: Player | null) => void;
  setBackgroundColor: (color: string) => void;
};

export const usePlayerStore = create<PlayerStore>(set => ({
  selectedPlayer: null,
  backgroundColor: '',
  setSelectedPlayer: player => set({ selectedPlayer: player }),
  setBackgroundColor: color => set({ backgroundColor: color }),
}));
