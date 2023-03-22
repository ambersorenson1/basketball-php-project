import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import CreateTournaments from './CreateTournaments/CreateTournaments';
import GetAllTournaments from './GetAllTournaments/GetAllTournaments';
import { createGame, GameData } from '../../services/gamesApi';
import { Team } from '../../services/DTOs';

const AdminsPage: React.FC = () => {
  const [selectedTournament, setSelectedTournament] = useState<GameData | null>(
    null,
  );
  const [selectedTeamOne, setSelectedTeamOne] = useState<Team | null>(null);
  const [selectedTeamTwo, setSelectedTeamTwo] = useState<Team | null>(null);

  const createGameMutation = useMutation(createGame);

  const handleCreateGame = () => {
    console.log(selectedTournament, selectedTeamOne, selectedTeamTwo);

    if (selectedTournament && selectedTeamOne && selectedTeamTwo) {
      createGameMutation.mutate({
        tournamentId: selectedTournament.tournamentId,
        teamOneId: selectedTeamOne.teamId,
        teamTwoId: selectedTeamTwo.teamId,
      });
    } else {
      alert('Please select a tournament and two teams before creating a game.');
    }
  };

  return (
    <div>
      <CreateTournaments />
      <GetAllTournaments
        onTournamentSelect={setSelectedTournament}
        onTeamOneSelect={setSelectedTeamOne}
        onTeamTwoSelect={setSelectedTeamTwo}
      />
      <button
        onClick={handleCreateGame}
        className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 text-white"
      >
        Create Game
      </button>
    </div>
  );
};

export default AdminsPage;
