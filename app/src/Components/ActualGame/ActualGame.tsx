import React, { useState } from 'react';
import { Team } from '../../services/DTOs';

interface ActualGameProps {
  teamOne?: Team;
  teamTwo?: Team;
  onGameStarted: () => void;
}

const ActualGame: React.FC<ActualGameProps> = ({
  teamOne,
  teamTwo,
  onGameStarted,
}) => {
  const [gameStarted, setGameStarted] = useState(false);

  const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
      {!gameStarted && (
        <button onClick={() => playGame(teamOne, teamTwo)}>Start Game</button>
      )}
      {gameStarted && (
        <div>
          <h2>Game in progress...</h2>
          {/* Add your game logic here */}
        </div>
      )}
    </div>
  );
};

export default ActualGame;
