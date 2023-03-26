import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfilePage from './Components/Player/ProfilePage';
import NavBar from './Components/NavBar/NavBar';
import Main from './Components/Main/Main';
import Tournament from './Components/Tournaments/Tournament';
import AdminsPage from './Components/AdminsPage/AdminsPage';
import GameList from './Components/Game/Game';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/*<Route path="/" element={<Main />} />*/}
            <Route path="/tournaments" element={<Tournament />} />
            <Route path="/games" element={<GameList />} />
            <Route path="/admins-page" element={<AdminsPage />} />
            <Route path="/profile-page" element={<ProfilePage />} />
          </Routes>
        </QueryClientProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
