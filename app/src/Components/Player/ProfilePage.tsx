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
function PlayerForm() {
  const { firstName, setFirstName } = usePlayerStore();

  const handleInputNameChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    setFirstName(event.target.value);
  };

  // @ts-ignore
  const handleNameSubmit = (event: React.FormEven<HTMLFormElement>) => {
    event.preventDefault();
    console.log(firstName);
  };

  return (
    <form onSubmit={handleNameSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={handleInputNameChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
export default PlayerForm;
