import { Player } from './DTOs';

interface PlayerData {
  firstName: string;
  lastName: string;
  foreground: string;
  background: string;
  teamName: string;
}

export async function createPlayer(playerData: PlayerData): Promise<Player[]> {
  const response = await fetch('http://localhost:8000/api/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playerData),
  });

  if (!response.ok) {
    throw new Error('Failed to create player.');
  }

  const data = await response.json();
  return data.players;
}

export async function fetchPlayers() {
  const response = await fetch('http://localhost:8000/api/players');
  if (!response.ok) {
    throw new Error('Error fetching players');
  }
  return response.json();
}

export const updatePlayer = async (
  playerId: string,
  updatedPlayer: Partial<Player>,
): Promise<Player> => {
  const response = await fetch(
    `http://localhost:8000/api/players/${playerId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlayer),
    },
  );

  if (!response.ok) {
    throw new Error('Error updating player');
  }

  return response.json();
};
