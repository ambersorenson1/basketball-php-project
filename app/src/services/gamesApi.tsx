import { Game } from './DTOs';

export async function createGame(game: Game): Promise<Game[]> {
  console.log(game);
  const response = await fetch('http://localhost:8000/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  });

  if (!response.ok) {
    throw new Error('Failed to create a game.');
  }

  const data = await response.json();
  return data;
}

export async function getAllScores(): Promise<Game[]> {
  try {
    const response = await fetch('http://localhost:8000/api/games', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch teams: ${response.statusText}`);
    }

    const data: Game[] = await response.json();
    console.log('Fetched games:', data);
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
}
