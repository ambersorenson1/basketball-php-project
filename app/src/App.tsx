import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfilePage from './Components/Player/ProfilePage';
import NavBar from './Components/NavBar/NavBar';
import Main from './Components/Main/Main';
import Tournament from './Components/Tournaments/Tournament';
import GameForm from './Components/Game/Game';
import AdminsPage from './Components/AdminsPage/AdminsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/*<Route path="/" element={<Main />} />*/}
            <Route path="/tournaments" element={<Tournament />} />
            {/*<Route path="/game-form" element={<GameForm />} />*/}
            <Route path="/admins-page" element={<AdminsPage />} />
            <Route path="/profile-page" element={<ProfilePage />} />
          </Routes>
        </QueryClientProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
