import { Tournament } from './DTOs';

interface TournamentData {
  name: string;
  startDate: Date;
  endDate: Date;
}

export async function createTournament(
  tournamentData: TournamentData,
): Promise<Tournament[]> {
  const response = await fetch('http://localhost:8000/api/tournaments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tournamentData),
  });

  if (!response.ok) {
    throw new Error('Failed to create tournament.');
  }

  const data = await response.json();
  return data;
}

export async function getAllTournaments(): Promise<Tournament[]> {
  try {
    const response = await fetch('http://localhost:8000/api/tournaments', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tournaments: ${response.statusText}`);
    }

    const data: Tournament[] = await response.json();
    console.log('Fetched tournaments:', data);
    return data;
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    throw error;
  }
}
