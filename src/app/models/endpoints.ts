import { environment } from 'src/environments/environment';

const { serverUrl: API_URL } = environment.api;
const ENDPOINTS = {
  AUTH: {
    REGISTER: `${ API_URL }/identity`,
    LOGIN: `${ API_URL }/identity/login`,
    USERS: `${ API_URL }/identity/users`,
    ROLES: `${ API_URL }/identity/roles`
  },
  AIRCRAFT: `${ API_URL }/aircraft`,
  PASSENGERS: `${ API_URL }/rental/passengers`,
  RENTAL: `${ API_URL }/rental`
};
Object.freeze(ENDPOINTS);

export { API_URL, ENDPOINTS };
