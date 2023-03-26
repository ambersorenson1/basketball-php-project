import React, { useEffect, useState } from 'react';
import { Game } from '../../services/DTOs';

const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/games')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched games:', data);
        setGames(data);
      });
  }, []);

  const handleEnterGame = (gameId: number) => {
    console.log(`Entering game with ID: ${gameId}`);
  };

  return (
    <div>
      <h1>Games List</h1>
      <ul>
        {games.map(game => {
          const teamOne = game.teamOne;
          const teamTwo = game.teamTwo;
          console.log('Team One:', teamOne);
          console.log('Team Two:', teamTwo);
          return (
            <li key={game.gameId}>
              <button onClick={() => handleEnterGame(game.gameId)}>
                Enter Game
              </button>
              {teamOne ? teamOne.name : 'Unknown'} vs{' '}
              {teamTwo ? teamTwo.name : 'Unknown'}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GameList;
