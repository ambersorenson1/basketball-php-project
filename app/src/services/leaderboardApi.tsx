import { Game, Team } from './DTOs';

export interface LeaderboardData {
  teamOneId: number;
  teamTwoId: number;
  tournamentId?: number;
  teamOneScore: number;
  teamTwoScore: number;
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
    console.log('Fetched teams:', data);
    return data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
}
