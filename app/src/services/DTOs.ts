export interface Player {
  firstName: string;
  lastName: string;
  foreground: string;
  background: string;
  teamName: string;
}

export interface Tournament {
  tournamentId?: number;
  tournamentName?: string;
  startDate?: Date;
  endDate?: Date;
}
