import ApiRepository from './ApiRepository';
import AuthRepository from './AuthRepository';


const services = {
  api: ApiRepository,
  auth: AuthRepository,
};
export default {
  get: (name) => services[name],
};