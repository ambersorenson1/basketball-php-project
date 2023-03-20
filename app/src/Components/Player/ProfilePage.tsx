import React, { useState } from 'react';
import { create } from 'zustand';
import { Player, ProfilePageState } from './ProfileInterface';
import axios from 'axios/index';
import { useMutation, useQuery } from '@tanstack/react-query';

const ProfilePage = () => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [foreground, setForeground] = useState<string>();
  const [background, setBackground] = useState<string>();
  const [teamName, setTeamName] = useState<string>();

  const mutation = useMutation({
    mutationFn: playerData => {
      return fetch('/api/players', playerData);
    },
  });
  // const onSubmit = (event) => {
  //   event.preventDefault()
  //   mutation.mutate(new PlayerData(event.target))
  // }

  // return <form onSubmit={onSubmit}>...</form>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const playerData = {
      firstName,
      lastName,
      foreground,
      background,
      teamName,
    };
    console.log(playerData);
  };

  return (
    <div className="mx-auto max-w-md">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-lg"
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="first-name"
          >
            First Name:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="last-name"
          >
            Last Name:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="team-name"
          >
            Team Name:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="foreground"
          >
            Foreground Color (RGB Numbers):
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            value={foreground}
            onChange={e => setForeground(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="background"
          >
            Background Color (RGB Numbers):
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            value={background}
            onChange={e => setBackground(e.target.value)}
          />
        </div>
        <div className="flex justify-center space-x-8">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Edit
          </button>
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
