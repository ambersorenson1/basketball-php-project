import { Route } from '@tanstack/react-router';
import React from 'react';
import rootRoute from './rootRoute';
import GameList from '../Components/ListOfGames/ListOfGames';

const gamesListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'games',
  component: () => {
    return <GameList />;
  },
});

export default gamesListRoute;
