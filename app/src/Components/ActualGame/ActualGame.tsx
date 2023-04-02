import React, { useState, useEffect } from 'react';
import { Team } from '../../services/DTOs';
import { useLocation } from 'react-router-dom';
import { usePlayerStore } from '../zustand/playerStore';
import { ScoreState, useScoreStore } from '../zustand/scoreStore';

interface ActualGameProps {
  onGameStarted: () => void;
}

interface LocationState {
  teamOne: Team;
  teamTwo: Team;
}

const ActualGame: React.FC<ActualGameProps> = ({ onGameStarted }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [message, setMessage] = useState('');
  const selectedPlayer = usePlayerStore(state => state.selectedPlayer);
  const location = useLocation();
  const { teamOne, teamTwo } = location.state as LocationState;

  const { teamOneScore, setTeamOneScore, teamTwoScore, setTeamTwoScore } =
    useScoreStore(state => ({
      teamOneScore: (state as ScoreState).teamOneScore,
      setTeamOneScore: (state as ScoreState).setTeamOneScore,
      teamTwoScore: (state as ScoreState).teamTwoScore,
      setTeamTwoScore: (state as ScoreState).setTeamTwoScore,
    }));

  useEffect(() => {
    let interval: number | null = null;
    if (gameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (interval !== null) {
      clearInterval(interval);
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [gameStarted, timer]);

  const isPlayerInGame = (): boolean => {
    if (!selectedPlayer) return false;
    return (
      selectedPlayer.team.teamId === teamOne?.teamId ||
      selectedPlayer.team.teamId === teamTwo?.teamId
    );
  };

  const playGame = (): void => {
    setGameStarted(true);
    onGameStarted();
  };

  const handleShot = (team: 'teamOne' | 'teamTwo', points: number): void => {
    const shotSuccess = Math.random() >= 0.5;
    const teamName = team === 'teamOne' ? teamOne?.name : teamTwo?.name;

    if (shotSuccess) {
      if (team === 'teamOne') {
        setTeamOneScore(teamOneScore + points);
      } else {
        setTeamTwoScore(teamTwoScore + points);
      }
    } else {
      setMessage(`Player from ${teamName} missed the ${points} point shot.`);
    }
  };

  if (!teamOne || !teamTwo) {
    return (
      <div>
        <h2>Teams not available</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      {selectedPlayer && (
        <p className="mt-4 text-center">
          You have selected - {selectedPlayer.firstName}{' '}
          {selectedPlayer.lastName} - who is playing for Team{' '}
          {selectedPlayer.team.name}
        </p>
      )}
      {!gameStarted && isPlayerInGame() && (
        <div className="mt-4 flex justify-center">
          <button
            className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => playGame()}
          >
            Start Game
          </button>
        </div>
      )}
      {gameStarted && (
        <div>
          <h2 className="mt-4 text-center">Game in progress...</h2>
          <h2 className="mt-4 text-center">May the best player win!!</h2>
          <p className="mt-4 text-center">Time remaining: {timer} seconds</p>
          <div className="flex flex-col items-center">
            <div>
              <button
                className="mt-4 mr-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                disabled={timer <= 0}
                onClick={() => handleShot('teamOne', 1)}
              >
                1 Point Shot
              </button>
              <button
                className="mt-4 mr-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                disabled={timer <= 0}
                onClick={() => handleShot('teamOne', 2)}
              >
                2 Point Shot
              </button>
              <button
                className="mt-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                disabled={timer <= 0}
                onClick={() => handleShot('teamOne', 3)}
              >
                3 Point Shot
              </button>
            </div>
            <div>
              <button
                className="mt-4 mr-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                disabled={timer <= 0}
                onClick={() => handleShot('teamTwo', 1)}
              >
                Team Two 1 Point Shot
              </button>
              <button
                className="mt-4 mr-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                disabled={timer <= 0}
                onClick={() => handleShot('teamTwo', 2)}
              >
                Team Two 2 Point Shot
              </button>
              <button
                className="mt-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                disabled={timer <= 0}
                onClick={() => handleShot('teamTwo', 3)}
              >
                Team Two 3 Point Shot
              </button>
            </div>
          </div>
          <p className="mt-4 text-center">Team One Score: {teamOneScore}</p>
          <p className="mt-4 text-center">Team Two Score: {teamTwoScore}</p>
          <p className="mt-4 text-center">{message}</p>
        </div>
      )}
      {!isPlayerInGame() && (
        <p className="mt-4 text-center">
          Only players from either {teamOne?.name} or {teamTwo?.name} can start
          the game.
        </p>
      )}
    </div>
  );
};
export default ActualGame;
