import React from 'react';
import { create } from 'zustand';

interface PlayerStore {
  firstName: string;
  setFirstName: (name: string) => void;
}

const usePlayerStore = create<PlayerStore>(set => ({
  firstName: '',
  setFirstName: name =>
    set({
      firstName: name,
    }),
}));
function PlayerForm() {}
export default PlayerForm;
