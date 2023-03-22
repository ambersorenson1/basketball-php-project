import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import CreateTournaments from './CreateTournaments/CreateTournaments';
import GetAllTournaments from './GetAllTournaments/GetAllTournaments';
import { createGame, GameData } from '../../services/gamesApi';
import { Game, Team } from '../../services/DTOs';

const AdminsPage: React.FC = () => {
  const [selectedTournament, setSelectedTournament] = useState<GameData | null>(
    null,
  );
  const [selectedTeamOne, setSelectedTeamOne] = useState<Team | null>(null);
  const [selectedTeamTwo, setSelectedTeamTwo] = useState<Team | null>(null);
  const [createdGame, setCreatedGame] = useState<Game | null>(null);

  const createGameMutation = useMutation(createGame);

  const handleCreateGame = async () => {
    console.log(selectedTournament, selectedTeamOne, selectedTeamTwo);

    if (selectedTournament && selectedTeamOne && selectedTeamTwo) {
      try {
        const game = await createGame({
          tournamentId: selectedTournament.tournamentId,
          teamOneId: selectedTeamOne.teamId,
          teamTwoId: selectedTeamTwo.teamId,
        });
        setCreatedGame(game[0]);
      } catch (error) {
        console.error('Error creating game:', error);
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
        onGameCreate={async game => {
          const createdGame = await createGame(game);
          setCreatedGame(createdGame);
        }}
      />
      <button
        onClick={handleCreateGame}
        className="focus:shadow-outline my-4 rounded bg-blue-500 py-2 px-4 text-white"
      >
        Create Game
      </button>
      {createdGame && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Created Game</h2>
          <p>
            Game ID: {createdGame.gameId}, Team 1: {createdGame.teamOneName} vs
            Team 2: {createdGame.teamTwoName}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminsPage;
