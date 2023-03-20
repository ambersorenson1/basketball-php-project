import { create } from 'zustand';
import axios from 'axios/index';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Game } from './GameInterface';

interface GameStore {
  games: Game[];
  setGames: (games: Game[]) => void;
}

const useGameStore = create<GameStore>(set => ({
  games: [],
  setGames: games => set({ games }),
}));

function GameForm() {
  const { games, setGames } = useGameStore();

  const fetchGames = async (): Promise<Game[]> => {
    try {
      const response = await axios.get('http://localhost:8000/api/games');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useQuery(['game'], fetchGames, {
    onSuccess: data => {
      setGames(data);
    },
  });

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="mb-4 text-2xl font-bold">Games</h1>
      <ul>
        {games.map((game, index) => (
          <li key={`${index}-${game.game_id}`} className="mb-2">
            <strong className="font-bold">{game.game_id}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameForm;
