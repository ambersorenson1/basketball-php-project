import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllScores } from '../../services/leaderboardApi';
import { Game } from '../../services/DTOs';

const Leaderboard = () => {
  const {
    data: games,
    isLoading,
    isError,
  } = useQuery<Game[], Error>(['games'], getAllScores);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : null}
      {isError ? <p>Error loading the Leaderboard!!</p> : null}
      {games && (
        <table>
          <tbody>
            {games.map(game => (
              <React.Fragment key={game.gameId}>
                <tr>
                  <td>{game.teamOne.name}</td>
                  <td>{game.teamTwo.name}</td>
                </tr>
                <tr>
                  <td>{game.teamOneScore}</td>
                  <td>{game.teamTwoScore}</td>
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
