import { useMutation } from '@tanstack/react-query';
import { createTournament } from '../../services/tournamentApi';
import React, { useState } from 'react';

const AdminsPage = () => {
  const [tournamentName, setTournamentName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const addTournament = useMutation({
    mutationFn: () =>
      createTournament({
        tournamentName: tournamentName,
        startDate: startDate,
        endDate: endDate,
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

  const handleAddTournament = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTournament.mutate();
  };

  return (
    <div className="mx-auto max-w-md">
      <form
        onSubmit={handleAddTournament}
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
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="tournament-start-date"
          >
            Start Date:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="date"
            value={startDate.toISOString().substring(0, 10)}
            onChange={e => setStartDate(new Date(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="tournament-start-date"
          >
            End Date:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="date"
            value={endDate.toISOString().substring(0, 10)}
            onChange={e => setEndDate(new Date(e.target.value))}
          />
        </div>
        <button
          type="submit"
          className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Add Tournament
        </button>
      </form>
    </div>
  );
};
export default AdminsPage;
