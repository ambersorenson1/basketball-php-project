import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Game } from '../../services/DTOs';
import { getAllScores } from '../../services/gamesApi';

const Leaderboard = () => {
  const {
    data: games,
    isLoading,
    isError,
  } = useQuery<Game[], Error>(['games'], getAllScores);

  return (
    <div className="p-4">
      {isLoading ? <p>Loading...</p> : null}
      {isError ? <p>Error loading the Leaderboard!!</p> : null}
      {games && (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Team One</th>
              <th className="px-4 py-2">Team Two</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <React.Fragment key={game.gameId}>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2">{game.teamOne.name}</td>
                  <td className="border px-4 py-2">{game.teamTwo.name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">{game.teamOneScore}</td>
                  <td className="border px-4 py-2">{game.teamTwoScore}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
