import React, { useEffect, useState } from 'react';
import { Game } from '../../services/DTOs';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../SelectPlayer/playerStore';

interface GameListProps {
  onGameSelected: (game: Game | null) => void;
}

const GameList: React.FC<GameListProps> = ({ onGameSelected }) => {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();
  const selectedPlayer = usePlayerStore(state => state.selectedPlayer);

  useEffect(() => {
    fetch('http://localhost:8000/api/games')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched games:', data);
        setGames(data);
      });
  }, []);

  const handleGameClick = (game: Game) => {
    console.log(`Entering game with ID: ${game.gameId}`);
    onGameSelected(game || null);
    navigate('/actual-game', {
      state: {
        game,
        teamOne: game.teamOne,
        teamTwo: game.teamTwo,
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Games List</h1>
      {selectedPlayer && (
        <p>
          Selected player: {selectedPlayer.firstName} {selectedPlayer.lastName}
        </p>
      )}
      <ul>
        {games.map(game => {
          const teamOne = game.teamOne;
          const teamTwo = game.teamTwo;
          console.log('Team One:', teamOne);
          console.log('Team Two:', teamTwo);
          return (
            <li key={game.gameId} className="mb-2">
              <button
                onClick={() => handleGameClick(game)}
                className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white focus:outline-none"
              >
                Enter Game
              </button>
              <span className="ml-4">
                {teamOne ? teamOne.name : 'Unknown'} vs{' '}
                {teamTwo ? teamTwo.name : 'Unknown'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GameList;
