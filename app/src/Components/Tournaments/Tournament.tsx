import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tournament } from './TournamentInterface';
import axios from 'axios';
import { create } from 'zustand';

interface TournamentStore {
  tournaments: Tournament[];
  setTournaments: (tournaments: Tournament[]) => void;
}

const useTournamentStore = create<TournamentStore>(set => ({
  tournaments: [],
  setTournaments: tournaments => set({ tournaments }),
}));

function TournamentForm() {
  const { tournaments, setTournaments } = useTournamentStore();

  const fetchTournaments = async (): Promise<Tournament[]> => {
    try {
      const response = await axios.get('http://localhost:8000/api/tournaments');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useQuery(['tournament'], fetchTournaments, {
    onSuccess: data => {
      setTournaments(data);
    },
  });

  // @ts-ignore
  // @ts-ignore
  return (
    <div className="bg-gray-100 p-4">
      <h1 className="mb-4 text-2xl font-bold">Tournaments</h1>
      <ul>
        {tournaments.map((tournament, index) => (
          <li key={`${index}-${tournament.tournament_id}`} className="mb-2">
            <strong className="font-bold">{tournament.name}</strong>
            <br />
            <strong className="text-sm">
              Start date: {tournament.start_date}
            </strong>
            <br />
            <strong className="text-sm">End date: {tournament.end_date}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TournamentForm;
