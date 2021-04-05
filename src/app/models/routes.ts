import { NavigationEnd } from '@angular/router';

const APP_ROUTES = {
  AUTH: '/auth',
  HOME: {
    MAIN: '/',
    ROLES: {
      MAIN: '/roles',
      CREATE: '/roles/create'
    },
    USERS: {
      MAIN: '/users',
      CREATE: '/users/create'
    },
    AIRCRAFTS: '/aircrafts',
    PASSENGERS: '/passengers',
    RENTALS: '/rentals'
  }
};

const { HOME: ROUTES } = APP_ROUTES;

type HomeRoutes = {
  [K in keyof typeof APP_ROUTES.HOME]: string
};

const SIDEBAR_ROUTES: HomeRoutes = {
  MAIN: ROUTES.MAIN,
  ROLES: ROUTES.ROLES.MAIN,
  USERS: ROUTES.USERS.MAIN,
  AIRCRAFTS: ROUTES.AIRCRAFTS,
  PASSENGERS: ROUTES.PASSENGERS,
  RENTALS: ROUTES.RENTALS
};

Object.freeze(APP_ROUTES);
Object.freeze(SIDEBAR_ROUTES);

const routes = Object.values(SIDEBAR_ROUTES);

function routeFromSidebar(event: NavigationEnd) {
  return event instanceof NavigationEnd && routes.some(route => route === event.url);
}

export {
  APP_ROUTES,
  SIDEBAR_ROUTES,
  routeFromSidebar
};
