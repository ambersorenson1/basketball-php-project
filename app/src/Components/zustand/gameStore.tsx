import { create } from 'zustand';
import { Game } from '../../services/DTOs';

type State = {
  selectedGame: Game | null;
  gameStarted: boolean;
  selectGame: (game: Game | null) => void;
  startGame: () => void;
};

const useGameState = create<State>((set, get) => ({
  selectedGame: null,
  gameStarted: false,
  selectGame: (game: Game | null) => {
    set({ selectedGame: game, gameStarted: false });
  },
  startGame: () => {
    set({ gameStarted: true });
  },
}));
