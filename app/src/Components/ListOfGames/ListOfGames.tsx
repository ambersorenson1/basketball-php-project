import React, { useEffect, useState } from 'react';
import { Game } from '../../services/DTOs';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../zustand/playerStore';

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
        const filteredGames = selectedPlayer
          ? data.filter(
              (game: Game) =>
                game.teamOne.teamId === selectedPlayer.team.teamId ||
                game.teamTwo.teamId === selectedPlayer.team.teamId,
            )
          : data;
        setGames(filteredGames);
      });
  }, [selectedPlayer]);

  const handleGameClick = (game: Game) => {
    onGameSelected(game || null);
    navigate('/actual-game', {
      state: {
        game,
        gameId: game.gameId,
        teamOne: game.teamOne,
        teamTwo: game.teamTwo,
      },
    });
  };

  return (
    <div className="container mx-auto bg-[url('https://www.magicmurals.com/media/catalog/product/cache/155d73b570b90ded8a140526fcb8f2da/F/O/FOT-0025479708_1.jpg')] bg-auto p-4">
      <h1 className="mt-14 mb-4 text-center text-7xl font-bold text-amber-50">
        *~*~*Games List*~*~*
      </h1>
      {selectedPlayer && (
        <p className="text-center text-2xl font-medium text-gray-800 text-white">
          Player - {selectedPlayer.firstName} {selectedPlayer.lastName} is
          playing for team "{selectedPlayer.team.name}"
        </p>
      )}
      <ul>
        {games.map(game => {
          const teamOne = game.teamOne;
          const teamTwo = game.teamTwo;
          return (
            <li key={game.gameId} className="mb-2">
              <div className="m-4 flex flex-col items-center text-center">
                <button
                  onClick={() => handleGameClick(game)}
                  className="focus:shadow-outline mb-4 rounded bg-blue-500 py-2 px-4 font-bold text-white focus:outline-none"
                >
                  Enter Game
                </button>
                <span className="text-7xl text-white">
                  {teamOne ? teamOne.name : 'Unknown'} vs{' '}
                  {teamTwo ? teamTwo.name : 'Unknown'}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {games.length === 1 && <div className="h-96"></div>}
    </div>
  );
};

export default GameList;
