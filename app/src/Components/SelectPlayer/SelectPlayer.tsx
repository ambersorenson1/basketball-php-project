import React, { useState, useEffect } from 'react';
import { usePlayerStore } from './playerStore';
import { Player } from '../../services/DTOs';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayers } from '../../services/playerApi';

interface SelectPlayerProps {}

const SelectPlayer: React.FC<SelectPlayerProps> = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const selectedPlayer = usePlayerStore(state => state.selectedPlayer);
  const setSelectedPlayer = usePlayerStore(state => state.setSelectedPlayer);

  const { isLoading, error } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
  });

  useEffect(() => {
    fetch('http://localhost:8000/api/players')
      .then(response => response.json())
      .then(data => setPlayers(data));
  }, []);

  const handlePlayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const playerId = parseInt(event.target.value, 10);
    const player = players.find(p => p.id === playerId) || null;
    setSelectedPlayer(player);
  };

  return (
    <div className="p-4">
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="player"
      ></label>
      <select
        id="player"
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        defaultValue=""
        onChange={handlePlayerChange}
      >
        <option value="" disabled>
          Select a player
        </option>
        {isLoading ? <option>Loading...</option> : ''}
        {error ? <option>Error loading players</option> : ''}
        {players.map(player => (
          <option key={player.id} value={player.id}>
            {player.firstName} {player.lastName} - {player.team.name}
          </option>
        ))}
      </select>
      {selectedPlayer && (
        <div className="mt-8 rounded-lg bg-gray-200 p-6">
          <p className="mb-2 text-lg font-semibold">
            You have selected {selectedPlayer.firstName}{' '}
            {selectedPlayer.lastName}.
          </p>
          <p className="mb-4 text-gray-700">
            Please visit the profile page to update your profile information.
          </p>
          <p className="text-lg font-semibold">
            You are on team{' '}
            <span className="text-green-600">"{selectedPlayer.team.name}"</span>
            .
          </p>
          <p className="text-bg-gray-200 text-lg font-semibold">
            Best of luck!!!
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectPlayer;
