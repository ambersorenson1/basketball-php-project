import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createTournament } from '../../../services/tournamentApi';

const CreateTournaments = () => {
  const [name, setName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showCreateTournaments, setShowCreateTournaments] = useState(false);

  const handleClick = () => {
    setShowCreateTournaments(!showCreateTournaments);
  };

  const addTournament = useMutation({
    mutationFn: () =>
      createTournament({
        name: name,
        startDate: startDate,
        endDate: endDate,
      }),
    onMutate: () => {},
    onError: (error, variables, context) => {},
    onSettled: () => {},
  });

  const handleAddTournament = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTournament.mutate();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        {showCreateTournaments ? 'Hide Create Tournament' : 'Create Tournament'}
      </button>

      {showCreateTournaments && (
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
      )}
    </div>
  );
};

export default CreateTournaments;
