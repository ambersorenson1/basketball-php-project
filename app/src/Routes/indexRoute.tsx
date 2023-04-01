import { Route } from '@tanstack/react-router';
import React from 'react';
import rootRoute from './rootRoute';
import Homepage from '../Components/Homepage/Homepage';

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    return <Homepage />;
  },
});

export default indexRoute;
