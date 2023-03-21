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
  startDate?: Date;
  endDate?: Date;
}

export interface Team {
  name: string;
  teamId?: number;
}
