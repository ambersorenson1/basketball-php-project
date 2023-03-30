import React, { useState, useEffect } from 'react';
import { Team } from '../../services/DTOs';
import { usePlayerStore } from '../SelectPlayer/playerStore';
import { useLocation } from 'react-router-dom';

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
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);
  const selectedPlayer = usePlayerStore(state => state.selectedPlayer);
  const location = useLocation();
  const { teamOne, teamTwo } = location.state as LocationState;

  useEffect(() => {
    let interval: number | null = null;
    if (gameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (interval !== null) {
      clearInterval(interval);
      // I would submit scores to the database here
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

  const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getShotType = (randomNumber: number): number => {
    if (randomNumber >= 1 && randomNumber <= 2500) {
      return 1;
    } else if (randomNumber >= 2501 && randomNumber <= 8800) {
      return 2;
    } else {
      return 3;
    }
  };

  const playGame = (teamOne: Team, teamTwo: Team): void => {
    const teamOneShotType = getShotType(generateRandomNumber(1, 10000));
    const teamTwoShotType = getShotType(generateRandomNumber(1, 10000));

    setGameStarted(true);
    onGameStarted();
  };

  const handleShot = (team: 'teamOne' | 'teamTwo', shotType: number): void => {
    if (timer <= 0) return;
    if (team === 'teamOne') {
      setTeamOneScore(prevScore => prevScore + shotType);
    } else {
      setTeamTwoScore(prevScore => prevScore + shotType);
    }
  };

  // const submitScoresToDatabase = () => {
  //    logic for submitting scores to the database would go here
  // };

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
          This is your selected player - {selectedPlayer.firstName}{' '}
          {selectedPlayer.lastName} - playing for Team{' '}
          {selectedPlayer.team.name}
        </p>
      )}
      {!gameStarted && isPlayerInGame() && (
        <button
          className="mt-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => playGame(teamOne, teamTwo)}
        >
          Start Game
        </button>
      )}
      {gameStarted && (
        <div>
          <h2 className="mt-4 text-center">Game in progress...</h2>
          <p className="mt-4 text-center">Time remaining: {timer} seconds</p>
          <div className="flex justify-center">
            <button
              className="mt-4 mr-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              disabled={timer <= 0}
              onClick={() =>
                handleShot('teamOne', getShotType(generateRandomNumber(1, 100)))
              }
            >
              Team One Shot
            </button>
            <button
              className="mt-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              disabled={timer <= 0}
              onClick={() =>
                handleShot('teamTwo', getShotType(generateRandomNumber(1, 100)))
              }
            >
              Team Two Shot
            </button>
          </div>
          <p className="mt-4 text-center">Team One Score: {teamOneScore}</p>
          <p className="mt-4 text-center">Team Two Score: {teamTwoScore}</p>
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
