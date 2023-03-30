import { Player } from './DTOs';

export async function createPlayer(player: Player): Promise<Player[]> {
  const response = await fetch('http://localhost:8000/api/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
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
  id: number,
  player: Partial<Player> & { teamName: string },
) => {
  const response = await fetch(`http://localhost:8000/api/players/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  });

  if (!response.ok) {
    throw new Error('Failed to update player');
  }

  return response.json();
};
