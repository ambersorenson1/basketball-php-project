import { CreatedGame, Game, NewGame } from './DTOs';

export async function createGame(game: NewGame): Promise<CreatedGame> {
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
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateScores(
  gameId: number,
  teamOneScore: number,
  teamTwoScore: number,
): Promise<Game> {
  const response = await fetch(`http://localhost:8000/api/games/${gameId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ teamOneScore, teamTwoScore }),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to update scores');
  }
}
