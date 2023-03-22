import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Team, Tournament } from '../../../services/DTOs';
import { getAllTournaments } from '../../../services/tournamentApi';
import GetAllTeams from '../../GetAllTeams/GetAllTeams';
import TournamentOption from './TournamentOptions';

type GetAllTournamentsProps = {
  onTournamentSelect: (tournament: Tournament) => void;
  onTeamOneSelect: (team: Team) => void;
  onTeamTwoSelect: (team: Team) => void;
  onGameCreate: (game: {
    teamOneName: string;
    teamTwoName: string;
    tournamentName: string;
  }) => void;
};

const GetAllTournaments: React.FC<GetAllTournamentsProps> = ({
  onTournamentSelect,
  onTeamOneSelect,
  onTeamTwoSelect,
  onGameCreate,
}) => {
  const {
    data: tournaments,
    isLoading,
    isError,
  } = useQuery<Tournament[], Error>(['tournaments'], getAllTournaments);

  const [selectedTournament, setSelectedTournament] = useState<
    number | undefined
  >(undefined);

  const handleTournamentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const tournamentId = parseInt(event.target.value, 10);
    setSelectedTournament(tournamentId);
    const selectedTournament = tournaments?.find(
      t => t.tournamentId === tournamentId,
    );
    if (selectedTournament) {
      onTournamentSelect(selectedTournament);
    }
  };

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
        value={selectedTournament}
        onChange={handleTournamentChange}
      >
        <option value="">Select a tournament</option>
        {tournaments?.map((tournament: Tournament) => (
          <TournamentOption
            key={tournament.tournamentId}
            tournament={tournament}
          />
        ))}
      </select>
    </div>
  );

  return (
    <div>
      {tournamentSelect}
      <GetAllTeams
        onTeamOneSelect={onTeamOneSelect}
        onTeamTwoSelect={onTeamTwoSelect}
      />
    </div>
  );
};

export default GetAllTournaments;
