import { Player } from './DTOs';

interface PlayerData {
  firstName: string;
  lastName: string;
  foreground: string;
  background: string;
  teamName: string;
}

export async function createPlayer(playerData: PlayerData): Promise<Player[]> {
  const response = await fetch('/api/players', {
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
