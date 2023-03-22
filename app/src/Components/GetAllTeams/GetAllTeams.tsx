import { useQuery } from '@tanstack/react-query';
import { Team } from '../../services/DTOs';
import { getAllTeams } from '../../services/tournamentApi';
import React, { useEffect } from 'react';

type GetAllTeamsProps = {
  onTeamOneSelect: (team: Team) => void;
  onTeamTwoSelect: (team: Team) => void;
};

const GetAllTeams: React.FC<GetAllTeamsProps> = ({
  onTeamOneSelect,
  onTeamTwoSelect,
}) => {
  const {
    data: teams,
    isLoading,
    isError,
  } = useQuery<Team[], Error>(['teams'], getAllTeams);

  useEffect(() => {}, []);

  const handleTeamOneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeam = teams?.find(team => team.name === event.target.value);
    if (selectedTeam) {
      onTeamOneSelect(selectedTeam);
    }
  };

  const handleTeamTwoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeam = teams?.find(team => team.name === event.target.value);
    if (selectedTeam) {
      onTeamTwoSelect(selectedTeam);
    }
  };

  const teamOptions = isLoading ? (
    <p>Loading teams...</p>
  ) : isError ? (
    <p>Error loading teams</p>
  ) : (
    teams?.map((team: Team) => (
      <option key={team.teamId} value={team.name}>
        {team.name}
      </option>
    ))
  );

  return (
    <div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="team-one-select"
        >
          Select Team One:
        </label>
        <select
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-orange-500 text-gray-700 shadow focus:outline-none"
          id="team-one-select"
          onChange={handleTeamOneChange}
        >
          {teamOptions}
        </select>
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="team-two-select"
        >
          Select Team Two:
        </label>
        <select
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-orange-500 text-gray-700 shadow focus:outline-none"
          id="team-two-select"
          onChange={handleTeamTwoChange}
        >
          {teamOptions}
        </select>
      </div>
    </div>
  );
};

export default GetAllTeams;
