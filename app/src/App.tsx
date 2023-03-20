import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfilePage from './Components/Player/ProfilePage';
import NavBar from './Components/NavBar/NavBar';
import Main from './Components/Main/Main';
import Tournament from './Components/Tournaments/Tournament';
import GameForm from './Components/Game/Game';

const queryClient = new QueryClient();

function App() {
  // @ts-ignore
  return (
    <Router>
      <div>
        <NavBar />
        <QueryClientProvider client={queryClient}>
          {/*<GameForm />*/}
          {/*<Tournament />*/}
          {/*<Main />*/}
          <ProfilePage />
        </QueryClientProvider>
      </div>
    </Router>
  );
}

export default App;
