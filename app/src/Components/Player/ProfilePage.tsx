import React from 'react';
import { create } from 'zustand';
import { last } from '@tanstack/react-router';

interface PlayerStore {
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  foreground: string;
  setForeground: (foreground: string) => void;
  background: string;
  setBackground: (background: string) => void;
}

const usePlayerStore = create<PlayerStore>(set => ({
  firstName: '',
  setFirstName: name =>
    set({
      firstName: name,
    }),
  lastName: '',
  setLastName: name =>
    set({
      lastName: name,
    }),
  foreground: '',
  setForeground: foreground =>
    set({
      foreground: foreground,
    }),
  background: '',
  setBackground: background =>
    set({
      background: background,
    }),
}));
function PlayerForm() {
  const { firstName, setFirstName } = usePlayerStore();
  const { lastName, setLastName } = usePlayerStore();
  const { foreground, setForeground } = usePlayerStore();
  const { background, setBackground } = usePlayerStore();

  // @ts-ignore
  const handleNameSubmit = (event: React.FormEven<HTMLFormElement>) => {
    event.preventDefault();
    console.log(firstName, lastName, foreground, background);
  };

  return (
    <form onSubmit={handleNameSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </label>
      <label>
        Foreground:
        <input
          type="text"
          value={foreground}
          onChange={e => setForeground(e.target.value)}
        />
      </label>
      <label>
        Background:
        <input
          type="text"
          value={background}
          onChange={e => setBackground(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
export default PlayerForm;
