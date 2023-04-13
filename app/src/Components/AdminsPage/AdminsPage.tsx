import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CreatedGame, Team, Tournament } from '../../services/DTOs';
import { getAllTournaments } from '../../services/tournamentApi';
import { createGame } from '../../services/gamesApi';
import CreateTournaments from './CreateTournaments/CreateTournaments';
import GetAllTeams from '../GetAllTeams/GetAllTeams';
import TournamentOption from '../GetAllTournaments/tournamentOptions';
import { useScoreStore } from '../zustand/scoreStore';

const AdminsPage: React.FC = () => {
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [selectedTeamOne, setSelectedTeamOne] = useState<Team | null>(null);
  const [selectedTeamTwo, setSelectedTeamTwo] = useState<Team | null>(null);
  const gameId = useScoreStore(state => state.gameId);
  const setGameId = useScoreStore(state => state.setGameId);

  const {
    data: tournaments,
    isLoading,
    isError,
  } = useQuery<Tournament[], Error>(['tournaments'], getAllTournaments);

  const [selectedTournamentId, setSelectedTournamentId] = useState<number>(0);

  const handleTournamentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const tournamentId = parseInt(event.target.value, 10);
    setSelectedTournamentId(tournamentId);
    const selectedTournament = tournaments?.find(
      t => t.tournamentId === tournamentId,
    );
    if (selectedTournament) {
      setSelectedTournament(selectedTournament);
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
        value={selectedTournamentId}
        onChange={handleTournamentChange}
      >
        <option value="0">Select a tournament</option>
        {tournaments?.map((tournament: Tournament) => (
          <TournamentOption
            key={tournament.tournamentId}
            tournament={tournament}
          />
        ))}
      </select>
    </div>
  );

  const { data, mutate: addGameMutate } = useMutation<CreatedGame>(
    () => {
      if (
        selectedTournament &&
        selectedTeamOne &&
        selectedTeamTwo &&
        selectedTournament.tournamentId &&
        selectedTeamOne.teamId &&
        selectedTeamTwo.teamId
      ) {
        return createGame({
          tournamentId: selectedTournament.tournamentId,
          teamOneId: selectedTeamOne.teamId,
          teamTwoId: selectedTeamTwo.teamId,
          teamOne: selectedTeamOne,
          teamTwo: selectedTeamTwo,
        });
      } else {
        return Promise.reject(
          new Error(
            'Cannot create a game. Please ensure that you have selected a tournament and two teams.',
          ),
        );
      }
    },
    {
      onSuccess: (data: CreatedGame) => {
        setSuccessMessage(
          `Game created successfully: ${selectedTeamOne?.name} vs ${selectedTeamTwo?.name} in ${selectedTournament?.name} tournament.`,
        );
        setGameId(data.gameId);
      },
    },
  );

  useEffect(() => {
    if (data) {
      setGameId(data.gameId);
    }
  }, [data, setGameId]);

  useEffect(() => {}, [gameId]);

  const handleAddGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addGameMutate();
  };

  return (
    <div className="focus:shadow-outline rounded py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none">
      <CreateTournaments />
      {tournamentSelect}
      <GetAllTeams
        onTeamOneSelect={setSelectedTeamOne}
        onTeamTwoSelect={setSelectedTeamTwo}
      />
      <form onSubmit={handleAddGame}>
        <button
          type="submit"
          className="focus:shadow-outline my-4 rounded bg-blue-500 py-2 px-4 text-white"
        >
          Create Game
        </button>
      </form>
      {successMessage && (
        <div className="mt-4">
          <p className="font-bold text-green-600">{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AdminsPage;
