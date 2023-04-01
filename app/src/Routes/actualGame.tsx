import { Route } from '@tanstack/react-router';
import React from 'react';
import rootRoute from './rootRoute';
import ActualGame from '../Components/ActualGame/ActualGame';

const actualGameRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'actual-game',
  component: () => {
    return <ActualGame />;
  },
});

export default actualGameRoute;
