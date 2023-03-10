export interface ProfilePageState {
  firstName: string;
  lastName: string;
  foreground: string;
  background: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setForeground: (foreground: string) => void;
  setBackground: (background: string) => void;
}
