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

  const { isLoading, data, error } = useQuery({
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
    <div>
      <select defaultValue="" onChange={handlePlayerChange}>
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
        <div>
          <p>
            You have selected {selectedPlayer.firstName}{' '}
            {selectedPlayer.lastName}. Please visit the profile page to update
            your profile information.
          </p>
          <p>You are on team {selectedPlayer.team.name}. Best of luck!!!</p>
        </div>
      )}
    </div>
  );
};

export default SelectPlayer;
