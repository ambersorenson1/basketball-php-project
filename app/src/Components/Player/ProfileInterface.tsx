export interface Player {
  firstName: string;
  lastName: string;
  foreground: string;
  background: string;
  teamName: string;
  players: Player[];
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setForeground: (foreground: string) => void;
  setBackground: (background: string) => void;
  setTeamName: (teamName: string) => void;
  setPlayers: (players: Player[]) => void;
}

export class ProfilePageState {}
