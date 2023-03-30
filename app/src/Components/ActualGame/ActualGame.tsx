import React, { useState } from 'react';
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
  const selectedPlayer = usePlayerStore(state => state.selectedPlayer);
  const location = useLocation();
  const { teamOne, teamTwo } = location.state as LocationState;

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
    if (randomNumber >= 1 && randomNumber <= 25) {
      return 1;
    } else if (randomNumber >= 26 && randomNumber <= 88) {
      return 2;
    } else {
      return 3;
    }
  };

  const getClosestTeam = (
    randomNumber: number,
    teamOneNumber: number,
    teamTwoNumber: number,
    teamOne: Team,
    teamTwo: Team,
  ): Team => {
    return Math.abs(randomNumber - teamOneNumber) <
      Math.abs(randomNumber - teamTwoNumber)
      ? teamOne
      : teamTwo;
  };

  const playGame = (teamOne: Team, teamTwo: Team): void => {
    const randomNumber = generateRandomNumber(1, 100);

    const teamOneNumber = parseInt(
      prompt(`${teamOne.name}, enter a number:`) || '0',
      10,
    );
    const teamTwoNumber = parseInt(
      prompt(`${teamTwo.name}, enter a number:`) || '0',
      10,
    );

    const teamOneShotType = getShotType(generateRandomNumber(1, 100));
    const teamTwoShotType = getShotType(generateRandomNumber(1, 100));

    const closestTeam = getClosestTeam(
      randomNumber,
      teamOneNumber,
      teamTwoNumber,
      teamOne,
      teamTwo,
    );

    alert(`${closestTeam.name} goes first!`);
    setGameStarted(true);
    onGameStarted();
  };

  if (!teamOne || !teamTwo) {
    return (
      <div>
        <h2>Teams not available</h2>
      </div>
    );
  }

  return (
    <div>
      {selectedPlayer && (
        <p>
          Selected player: {selectedPlayer.firstName} {selectedPlayer.lastName}{' '}
          - {selectedPlayer.team.name}
        </p>
      )}
      {!gameStarted && isPlayerInGame() && (
        <button onClick={() => playGame(teamOne, teamTwo)}>Start Game</button>
      )}
      {gameStarted && (
        <div>
          <h2>Game in progress...</h2>
          {/* Add your game logic here */}
        </div>
      )}
      {!isPlayerInGame() && (
        <p>
          Only players from either {teamOne?.name} or {teamTwo?.name} can start
          the game.
        </p>
      )}
    </div>
  );
};
export default ActualGame;
