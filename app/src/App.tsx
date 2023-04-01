import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfilePage from './Components/Player/ProfilePage';
import NavBar from './Components/NavBar/NavBar';
import AdminsPage from './Components/AdminsPage/AdminsPage';
import GameList from './Components/ListOfGames/ListOfGames';
import ActualGame from './Components/ActualGame/ActualGame';
import SelectPlayer from './Components/SelectPlayer/SelectPlayer';
import { Game, Player } from './services/DTOs';
import ListAllTournaments from './Components/ListAllTournaments/ListAllTournaments';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import Homepage from './Components/Homepage/Homepage';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handlePlayerSelected = (player: Player | null) => {
    setSelectedPlayer(player);
  };

  const handleGameSelected = (game: Game | null) => {
    setSelectedGame(game);
    if (game) {
      setGameStarted(false);
    }
  };

  const handleGameStarted = () => {
    setGameStarted(true);
  };

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/tournaments" element={<ListAllTournaments />} />
            <Route
              path="/games"
              element={<GameList onGameSelected={handleGameSelected} />}
            />
            <Route path="/admins-page" element={<AdminsPage />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route
              path="/actual-game"
              element={<ActualGame onGameStarted={handleGameStarted} />}
            />
          </Routes>
        </QueryClientProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
