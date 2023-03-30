import React, { useEffect, useState } from 'react';
import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import {
  createPlayer,
  fetchPlayers,
  updatePlayer,
} from '../../services/playerApi';

const ProfilePage = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [foreground, setForeground] = useState<string>('');
  const [background, setBackground] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [foregroundError, setForegroundError] = useState<string | null>(null);
  const [backgroundError, setBackgroundError] = useState<string | null>(null);

  const queryKey: QueryKey = ['players'];
  const {
    data: players,
    isLoading,
    isError,
  } = useQuery(queryKey, fetchPlayers);

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
        firstName: firstName,
        lastName: lastName,
        foreground: foreground,
        background: background,
        teamName: teamName,
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (selectedPlayer) {
      await updatePlayer(selectedPlayer.id, {
        firstName,
        lastName,
        foreground,
        background,
        teamName,
      });
    } else {
      addPlayer.mutate();
    }

    setIsEditing(false);
  };

  const handlePlayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlayerId = e.target.value;
    const foundPlayer = players.find(
      (player: any) => player.id === selectedPlayerId,
    );
    if (foundPlayer) {
      setSelectedPlayer(foundPlayer);
      setFirstName(foundPlayer.firstName);
      setLastName(foundPlayer.lastName);
      setForeground(foundPlayer.foreground);
      setBackground(foundPlayer.background);
      setTeamName(foundPlayer.teamName);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="font-semi-bold mb-4 text-center text-lg">
        Please choose a name from the drop down
      </div>
      {isLoading && <div>Loading players...</div>}
      {isError && <div>Error loading players</div>}
      {players && (
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="player-select"
          >
            Players:
          </label>
          <select
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            name="player-select"
            id="player-select"
            onChange={handlePlayerSelect}
            value={selectedPlayer?.id || ''}
          >
            <option value="" disabled>
              Select a player
            </option>
            {players.map((player: any) => (
              <option key={player.id} value={player.id}>
                {player.firstName} {player.lastName}
              </option>
            ))}
          </select>
        </div>
      )}
      <form
        onSubmit={e => e.preventDefault()}
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
          {isEditing ? (
            <React.Fragment>
              <button
                type="button"
                onClick={handleSave}
                className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
              >
                Save
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button
                type="button"
                onClick={handleEdit}
                className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
              >
                Edit
              </button>
            </React.Fragment>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
