import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import NavBar from './Components/NavBar/NavBar';
import AdminsPage from './Components/AdminsPage/AdminsPage';
import GameList from './Components/ListOfGames/ListOfGames';
import ActualGame from './Components/ActualGame/ActualGame';
import Homepage from './Components/Homepage/Homepage';
import { Game, Player } from './services/DTOs';
import { usePlayerStore } from './Components/zustand/playerStore';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const backgroundColor = usePlayerStore(state => state.backgroundColor);

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
      <div className="container mx-auto p-4">
        {/*{backgroundColor}*/}
        <NavBar />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Homepage />} />
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
