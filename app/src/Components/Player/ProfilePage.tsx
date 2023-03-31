import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createPlayer, updatePlayer } from '../../services/playerApi';
import { usePlayerStore } from '../SelectPlayer/playerStore';

const ProfilePage = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [foreground, setForeground] = useState<string>('');
  const [background, setBackground] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [foregroundError, setForegroundError] = useState<string | null>(null);
  const [backgroundError, setBackgroundError] = useState<string | null>(null);
  const selectedPlayer = usePlayerStore(state => state.selectedPlayer);

  useEffect(() => {
    if (background) {
      if (isValidRGB(background)) {
        document.body.style.backgroundColor = `rgb(${background})`;
        setBackgroundError(null);
      } else {
        setBackgroundError('Invalid RGB value');
      }
    } else {
      document.body.style.backgroundColor = '';
    }

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [background]);

  const isValidRGB = (rgb: string) => {
    const regex = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/;
    const match = rgb.match(regex);

    if (!match) return false;

    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);

    return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
  };

  const addPlayer = useMutation({
    mutationFn: () =>
      createPlayer({
        id: 0,
        firstName: firstName,
        lastName: lastName,
        foreground: foreground,
        background: background,
        team: {
          teamId: 0,
          name: teamName,
        },
        role: {
          roleId: 2,
          name: 'Player',
        },
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

  const editPlayer = useMutation({
    mutationFn: () =>
      selectedPlayer
        ? updatePlayer(selectedPlayer.id, {
            firstName: firstName,
            lastName: lastName,
            foreground: foreground,
            background: background,
            teamName: teamName,
          })
        : Promise.reject('No selected player'),
    onError: (error, variables, context) => {
      console.log(error, variables, context);
    },
    onSettled: () => {
      console.log('update complete');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedPlayer) {
      editPlayer.mutate();
    } else {
      addPlayer.mutate();
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mx-auto max-w-md">
        {selectedPlayer && (
          <p className="mt-4 text-center">
            You can update your first name last name and colors here!{' '}
            {selectedPlayer.firstName} {selectedPlayer.lastName} -{' '}
            {selectedPlayer.team.name}
          </p>
        )}
      </div>
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
            onChange={e => {
              setForeground(e.target.value);
              if (!isValidRGB(e.target.value)) {
                setForegroundError('Invalid RGB value');
              } else {
                setForegroundError(null);
              }
            }}
          />
          {foregroundError && (
            <p className="text-xs italic text-red-500">{foregroundError}</p>
          )}
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
          {backgroundError && (
            <p className="text-xs italic text-red-500">{backgroundError}</p>
          )}
        </div>
        <div className="flex justify-center space-x-8">
          {selectedPlayer && (
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Edit
            </button>
          )}
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            {selectedPlayer ? 'Save' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
