import { Outlet, RootRoute } from '@tanstack/react-router';
import React from 'react';

const rootRoute = new RootRoute({
  component: () => {
    return (
      <>
        <Outlet />
      </>
    );
  },
});

export default rootRoute;
