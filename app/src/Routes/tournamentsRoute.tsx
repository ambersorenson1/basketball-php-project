import { Route } from '@tanstack/react-router';
import React from 'react';
import rootRoute from './rootRoute';
import ListAllTournaments from '../Components/ListAllTournaments/ListAllTournaments';

const tournamentsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'tournaments',
  component: () => {
    return <ListAllTournaments />;
  },
});

export default tournamentsRoute;
