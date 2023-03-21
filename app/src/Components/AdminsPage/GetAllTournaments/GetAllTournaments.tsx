import { useQuery } from '@tanstack/react-query';
import { Team, Tournament } from '../../../services/DTOs';
import { useEffect } from 'react';
import { getAllTournaments } from '../../../services/tournamentApi';
import GetAllTeams from '../../GetAllTeams/GetAllTeams';

const GetAllTournaments = () => {
  const {
    data: tournaments,
    isLoading,
    isError,
  } = useQuery<Tournament[], Error>(['tournaments'], getAllTournaments);

  useEffect(() => {}, []);

  const tournamentSelect = isLoading ? (
    <p>Loading tournaments...</p>
  ) : isError ? (
    <p>Error loading tournaments</p>
  ) : (
    <div className="mb-4">
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="tournament-select"
      >
        Select Tournament:
      </label>
      <select
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-orange-500 text-gray-700 shadow focus:outline-none"
        id="tournament-select"
      >
        {tournaments.map((tournament: Tournament) => (
          <option key={tournament.tournamentId} value={tournament.name}>
            {tournament.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      {tournamentSelect}
      <GetAllTeams />
    </div>
  );
};

export default GetAllTournaments;
