import ApiRepository from './ApiRepository';
import AuthRepository from './AuthRepository';


const repositories = {
  api: ApiRepository,
  auth: AuthRepository,
};
export default {
  get: (name) => repositories[name],
};