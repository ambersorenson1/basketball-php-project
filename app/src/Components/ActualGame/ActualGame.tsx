import React, { useState, useEffect } from 'react';
import { Team } from '../../services/DTOs';
import { useLocation } from 'react-router-dom';
import { usePlayerStore } from '../zustand/playerStore';
import { ScoreState, useScoreStore } from '../zustand/scoreStore';
import { useMutation } from '@tanstack/react-query';
import { updateScores } from '../../services/gamesApi';

interface ActualGameProps {
  onGameStarted: () => void;
}

const ActualGame: React.FC<ActualGameProps> = ({ onGameStarted }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [message, setMessage] = useState('');
  const [teamOneName, setTeamOneName] = useState('');
  const [teamTwoName, setTeamTwoName] = useState('');
  const selectedPlayer = usePlayerStore(state => state.selectedPlayer);
  const location = useLocation();
  const { gameId, teamOne, teamTwo } = location.state as {
    gameId: number;
    teamOne: Team;
    teamTwo: Team;
  };
  const { scores, setScores } = useScoreStore(state => ({
    scores: (state as ScoreState).scores,
    setScores: (state as ScoreState).setScores,
  }));
  const { teamOneScore, teamTwoScore } = scores[gameId] || {
    teamOneScore: 0,
    teamTwoScore: 0,
  };

  useEffect(() => {
    setTeamOneName(teamOne?.name ?? '');
    setTeamTwoName(teamTwo?.name ?? '');
    let interval: number | null = null;
    if (gameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 100);
    } else if (interval !== null) {
      clearInterval(interval);
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [gameStarted, timer, teamOne, teamTwo]);

  const isPlayerInGame = (): boolean | null => {
    if (!selectedPlayer) return null;
    return (
      selectedPlayer.team.teamId === teamOne?.teamId ||
      selectedPlayer.team.teamId === teamTwo?.teamId
    );
  };

  const playGame = (): void => {
    setGameStarted(true);
    onGameStarted();
  };

  const saveTheScore = useMutation(
    () =>
      selectedPlayer && gameId !== 0
        ? updateScores(gameId, teamOneScore, teamTwoScore)
        : Promise.reject(
            new Error(gameId === 0 ? 'Invalid gameId' : 'No selected player'),
          ),
    {
      onMutate: () => {},
      onError: (error: Error) => {
        console.error('Failed to save scores:', error.message);
      },
    },
  );

  const handleShot = (points: number): void => {
    if (!selectedPlayer) return;

    const team =
      selectedPlayer.team.teamId === teamOne?.teamId ? 'teamOne' : 'teamTwo';
    const shotSuccess = Math.random() >= 0.85;
    const teamName = team === 'teamOne' ? teamOne?.name : teamTwo?.name;

    if (shotSuccess) {
      if (team === 'teamOne') {
        setScores(gameId, teamOneScore + points, teamTwoScore);
      } else {
        setScores(gameId, teamOneScore, teamTwoScore + points);
      }
    } else {
      setMessage(
        `${selectedPlayer.firstName} from Team ${teamName} missed the ${points} point shot.`,
      );
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
          Currently playing for Team {selectedPlayer.team.name}
        </p>
      )}
      {!gameStarted && isPlayerInGame() && (
        <div className="mt-4 flex justify-center">
          <button
            className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => playGame()}
            disabled={!isPlayerInGame()}
          >
            Start Game
          </button>
        </div>
      )}

      {gameStarted && (
        <div>
          <h2 className="mt-4 text-center">May the best team win!!</h2>
          <p className="mt-4 text-center">Time remaining: {timer} seconds</p>
          <div className="flex flex-col items-center">
            <div>
              <div>
                <button
                  className="mt-4 mr-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  disabled={timer <= 0}
                  onClick={() => handleShot(1)}
                >
                  1 Point Shot
                </button>
                <button
                  className="mt-4 mr-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  disabled={timer <= 0}
                  onClick={() => handleShot(2)}
                >
                  2 Point Shot
                </button>
                <button
                  className="mt-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  disabled={timer <= 0}
                  onClick={() => handleShot(3)}
                >
                  3 Point Shot
                </button>
                <div className="mt-5 flex justify-center">
                  <button
                    className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                    onClick={() => saveTheScore.mutate()}
                  >
                    Save your score
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center">
            {teamOneName} Score: {teamOneScore}
          </p>
          <p className="mt-4 text-center">
            {teamTwoName} Score: {teamTwoScore}
          </p>
          <p className="mt-4 text-center">{message}</p>
        </div>
      )}
      {isPlayerInGame() === false && (
        <p className="mt-4 text-center">
          Only players from either {teamOne?.name} or {teamTwo?.name} can start
          the game.
        </p>
      )}
    </div>
  );
};
export default ActualGame;
