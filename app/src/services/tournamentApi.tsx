import { Tournament } from './DTOs';
import { Team } from './DTOs';

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
    body: JSON.stringify({
      tournamentName: tournamentData.name,
      startDate: tournamentData.startDate,
      endDate: tournamentData.endDate,
    }),
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
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getAllTeams(): Promise<Team[]> {
  try {
    const response = await fetch('http://localhost:8000/api/teams', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch teams: ${response.statusText}`);
    }

    const data: Team[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export const fetchTournaments = async (): Promise<Tournament[]> => {
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
    return data;
  } catch (error) {
    return [];
  }
};
