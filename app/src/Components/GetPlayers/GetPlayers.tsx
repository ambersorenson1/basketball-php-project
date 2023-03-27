import React, { useEffect, useState } from 'react';
import { Game, Player } from '../../services/DTOs';

interface SelectPlayerProps {
  onPlayerSelected: (player: Player | null) => void;
  selectedPlayer: Player | null;
}

const SelectPlayer: React.FC<SelectPlayerProps> = ({
  onPlayerSelected,
  selectedPlayer,
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/players')
      .then(response => response.json())
      .then(data => setPlayers(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/games')
      .then(response => response.json())
      .then(data => setGames(data));
  }, []);

  const handlePlayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const playerId = parseInt(event.target.value, 10);
    const player = players.find(p => p.playerId === playerId) || null;
    onPlayerSelected(player);
  };

  const isPlayerTeamScheduled = (player: Player | null): boolean => {
    if (player) {
      return games.some(
        game =>
          game.teamOneId === player.teamId || game.teamTwoId === player.teamId,
      );
    }
    return false;
  };

  return (
    <div>
      <select
        value={selectedPlayer?.playerId || ''}
        onChange={handlePlayerChange}
      >
        <option value="">Select a player</option>
        {players.map(player => (
          <option key={player.playerId} value={player.playerId}>
            {player.firstName}-{player.lastName}
          </option>
        ))}
      </select>
      {isPlayerTeamScheduled(selectedPlayer) && (
        <div>
          <p>Your team has a scheduled game! Get ready to play!</p>
          {/* Add a button or link to the game component here */}
        </div>
      )}
    </div>
  );
};

export default SelectPlayer;
