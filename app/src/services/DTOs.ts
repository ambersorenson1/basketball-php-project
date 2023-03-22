export interface Player {
  firstName: string;
  lastName: string;
  foreground: string;
  background: string;
  teamName: string;
}

export interface Tournament {
  tournamentId?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
}

export interface Team {
  name: string;
  teamId?: number;
}

export interface Game {
  gameId: number;
  teamOneId?: number;
  teamTwoId?: number;
  tournamentId?: number;
  teamOneName: string;
  teamTwoName: string;
}
