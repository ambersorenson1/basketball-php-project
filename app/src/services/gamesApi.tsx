import { Game } from './DTOs';

export interface GameData {
  teamOneId?: number;
  teamTwoId?: number;
  tournamentId?: number;
}

export async function createGame(gameData: GameData): Promise<Game[]> {
  console.log(gameData);
  const response = await fetch('http://localhost:8000/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
  });

  if (!response.ok) {
    throw new Error('Failed to create a game.');
  }

  const data = await response.json();
  return data;
}
