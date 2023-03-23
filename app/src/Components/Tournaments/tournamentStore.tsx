import { create } from 'zustand';
import { Tournament } from '../../services/DTOs';

interface TournamentStore {
  tournaments: Tournament[];
  setTournaments: (tournaments: Tournament[]) => void;
}

export const useTournamentStore = create<TournamentStore>(set => ({
  tournaments: [],
  setTournaments: tournaments => set({ tournaments }),
}));
