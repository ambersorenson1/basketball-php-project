import { create } from 'zustand';

export interface ScoreState {
  scores: {
    [gameId: number]: {
      teamOneScore: number;
      teamTwoScore: number;
    };
  };
  setScores: (
    gameId: number,
    teamOneScore: number,
    teamTwoScore: number,
  ) => void;
  gameId: number;
  setGameId: (id: number) => void;
}

export const useScoreStore = create<ScoreState>(set => ({
  scores: {},
  setScores: (gameId, teamOneScore, teamTwoScore) =>
    set(state => ({
      scores: {
        ...state.scores,
        [gameId]: { teamOneScore, teamTwoScore },
      },
    })),
  gameId: 0,
  setGameId: (id: number) => set({ gameId: id }),
}));
