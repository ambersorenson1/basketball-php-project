import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import CreateTournaments from './CreateTournaments/CreateTournaments';
import GetAllTournaments from './GetAllTournaments/GetAllTournaments';
import { createGame, GameData } from '../../services/gamesApi';
import { Team, Tournament } from '../../services/DTOs';

const AdminsPage: React.FC = () => {
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [selectedTeamOne, setSelectedTeamOne] = useState<Team | null>(null);
  const [selectedTeamTwo, setSelectedTeamTwo] = useState<Team | null>(null);

  const createGameMutation = useMutation(createGame, {
    onError: error => {
      console.error('Error details:', error);
    },
  });

  const handleCreateGame = async () => {
    console.log(selectedTournament, selectedTeamOne, selectedTeamTwo);

    if (selectedTournament && selectedTeamOne && selectedTeamTwo) {
      try {
        await createGameMutation.mutateAsync({
          tournamentId: selectedTournament.tournamentId,
          teamOneId: selectedTeamOne.teamId,
          teamTwoId: selectedTeamTwo.teamId,
        });
        setSuccessMessage(
          `Game created successfully: ${selectedTeamOne.name} vs ${selectedTeamTwo.name} in ${selectedTournament.name} tournament.`,
        );
      } catch (error) {
        console.error('Error creating game:', createGameMutation.error);
      }
    } else {
      alert('Please select a tournament and two teams before creating a game.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <CreateTournaments />
      <GetAllTournaments
        onTournamentSelect={setSelectedTournament}
        onTeamOneSelect={setSelectedTeamOne}
        onTeamTwoSelect={setSelectedTeamTwo}
        onGameCreate={game => {
          setSuccessMessage(
            `Game created successfully: ${game.teamOneName} vs ${game.teamTwoName} in ${game.tournamentName} tournament.`,
          );
        }}
      />
      <button
        onClick={handleCreateGame}
        className="focus:shadow-outline my-4 rounded bg-blue-500 py-2 px-4 text-white"
      >
        Create Game
      </button>
      {successMessage && (
        <div className="mt-4">
          <p className="font-bold text-green-600">{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AdminsPage;
