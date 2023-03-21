import { useMutation } from '@tanstack/react-query';
import { createTournament } from '../../services/tournamentApi';
import React, { useState } from 'react';

const AdminsPage = () => {
  const [tournamentName, setTournamentName] = useState<string>('');

  const addTournament = useMutation({
    mutationFn: () =>
      createTournament({
        tournamentName: tournamentName,
      }),
    onMutate: () => {
      console.log('mutate');
    },
    onError: (error, variables, context) => {
      console.log(error, variables, context);
    },
    onSettled: () => {
      console.log('complete');
    },
  });
  // const handleAddTournament = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   addTournament.mutate();
  // };

  return console.log(
    <div className="mx-auto max-w-md">
      <form
        // onSubmit={handleAddTournament}
        className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-lg"
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="tournament"
          >
            Tournament:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            value={tournamentName}
            onChange={e => setTournamentName(e.target.value)}
          />
        </div>
      </form>
    </div>,
  );
};
export default AdminsPage;
