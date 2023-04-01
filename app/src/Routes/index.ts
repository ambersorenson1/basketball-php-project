import { RootRoute, Router } from '@tanstack/router';
import adminsPageRoute from './adminsPageRoute';
import indexRoute from './indexRoute';
import gameListRoute from './gamesListRoute';
import profilePageRoute from './profilePageRoute';
import tournamentsRoute from './tournamentsRoute';

let rootRoute = new RootRoute();

const routeTree = rootRoute.addChildren([
  indexRoute,
  tournamentsRoute,
  adminsPageRoute,
  profilePageRoute,
  gameListRoute,
]);

export const router = new Router({
  routeTree,
  defaultPreload: 'intent',
});
