import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createTournament,
  getAllTournaments,
} from '../../services/tournamentApi';
import React, { useEffect, useState } from 'react';
import { Tournament } from '../../services/DTOs';

const AdminsPage = () => {
  const [name, setName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const {
    data: tournaments,
    isLoading,
    isError,
  } = useQuery<Tournament[], Error>(['tournaments'], getAllTournaments);

  useEffect(() => {}, []);

  const tournamentSelect = isLoading ? (
    <p>Loading tournaments...</p>
  ) : isError ? (
    <p>Error loading tournaments</p>
  ) : (
    <div className="mb-4">
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="tournament-select"
      >
        Select Tournament:
      </label>
      <select
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-orange-500 text-gray-700 shadow focus:outline-none"
        id="tournament-select"
      >
        {tournaments.map((tournament: Tournament) => (
          <option key={tournament.tournamentId} value={tournament.name}>
            {tournament.name}
          </option>
        ))}
      </select>
    </div>
  );

  const addTournament = useMutation({
    mutationFn: () =>
      createTournament({
        name: name,
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
        {tournamentSelect}
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="tournament"
          >
            Tournament Name:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
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
            type="datetime-local"
            value={startDate.toISOString().substring(0, 19)}
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
            type="datetime-local"
            value={endDate.toISOString().substring(0, 19)}
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
