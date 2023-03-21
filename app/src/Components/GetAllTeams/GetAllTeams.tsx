import { useQuery } from '@tanstack/react-query';
import { Team, Tournament } from '../../services/DTOs';
import { getAllTeams } from '../../services/tournamentApi';
import { useEffect } from 'react';

const GetAllTeams = () => {
  const {
    data: teams,
    isLoading,
    isError,
  } = useQuery<Team[], Error>(['teams'], getAllTeams);

  useEffect(() => {}, []);

  const teamSelect = isLoading ? (
    <p>Loading teams...</p>
  ) : isError ? (
    <p>Error loading teams</p>
  ) : (
    <div className="mb-4">
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="team-select"
      >
        Select Team:
      </label>
      <select
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-orange-500 text-gray-700 shadow focus:outline-none"
        id="team-select"
      >
        {teams.map((team: Team) => (
          <option key={team.teamId} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      {teamSelect}
      {teamSelect}
    </div>
  );
};

export default GetAllTeams;
