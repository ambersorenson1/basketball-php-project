import { Route } from '@tanstack/react-router';
import React from 'react';
import rootRoute from './rootRoute';
import AdminsPage from '../Components/AdminsPage/AdminsPage';

const adminsPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'admins-page',
  component: () => {
    return <AdminsPage />;
  },
});

export default adminsPageRoute;
