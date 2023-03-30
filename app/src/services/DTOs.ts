export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  foreground: string;
  background: string;
  team: {
    teamId: number;
    name: string;
  };
  role: {
    roleId: number;
    name: string;
  };
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
  teamOne?: Team;
  teamTwo?: Team;
}
