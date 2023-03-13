import React, { useState } from 'react';
import { Team } from './TeamInterface';
import { create } from 'zustand';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface TeamStore {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
}

const useTeamStore = create<TeamStore>(set => ({
  teams: [],
  setTeams: teams => set({ teams }),
}));
function TeamForm() {
  const { teams, setTeams } = useTeamStore();
  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fetchTeams = async (): Promise<Team[]> => {
    try {
      const response = await axios.get('http://localhost:8000/api/teams');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useQuery(['team'], fetchTeams, {
    onSuccess: data => {
      setTeams(data);
    },
  });

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTeamName(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isTeamNameDuplicate = teams.some(team => team.name === teamName);

    if (isTeamNameDuplicate) {
      setError('');
      window.alert(
        `Sorry the team name ${teamName} already exist. Please choose a unique name to get started!`,
      );
      setSuccess(null);
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/teams', {
        name: teamName,
      });
      setTeams([...teams, response.data]);
      setTeamName('');
      setError(null);
      setSuccess('');
      window.alert(`Best of luck ${teamName}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!teams.length) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center space-x-2"
      >
        <input
          type="text"
          value={teamName}
          onChange={handleInputChange}
          className="rounded-lg border border-gray-300  py-2 px-4 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:ring-offset-2"
        >
          Add your team
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default TeamForm;
