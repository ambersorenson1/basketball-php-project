import { Route } from '@tanstack/react-router';
import React from 'react';
import rootRoute from './rootRoute';
import ProfilePage from '../Components/ProfilePage/ProfilePage';

const profilePageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'profile-page',
  component: () => {
    return <ProfilePage />;
  },
});

export default profilePageRoute;
