import create from 'zustand';

export interface ScoreState {
  teamOneScore: number;
  setTeamOneScore: (score: number) => void;
  teamTwoScore: number;
  setTeamTwoScore: (score: number) => void;
}

export const useScoreStore = create(set => ({
  teamOneScore: 0,
  teamTwoScore: 0,
  setTeamOneScore: (score: number) => set({ teamOneScore: score }),
  setTeamTwoScore: (score: number) => set({ teamTwoScore: score }),
}));
