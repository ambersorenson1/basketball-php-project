import { Tournament } from './DTOs';

interface TournamentData {
  tournamentName: string;
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
  return data.players;
}
