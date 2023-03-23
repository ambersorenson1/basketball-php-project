import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tournament } from '../../services/DTOs';
import { useTournamentStore } from './tournamentStore';
import { fetchTournaments } from '../../services/tournamentApi'; //

function TournamentForm() {
  const { tournaments, setTournaments } = useTournamentStore();

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
          <li key={`${index}-${tournament.tournamentId}`} className="mb-2">
            <div>
              <div className="font-bold">{tournament.name}</div>
              <div className="text-sm">Start date: {tournament.startDate}</div>
              <div className="text-sm">End date: {tournament.endDate}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TournamentForm;
