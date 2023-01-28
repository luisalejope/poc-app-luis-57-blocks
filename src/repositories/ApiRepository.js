import ApiClient from './clients/ApiClient';

export default {
  getStateAccounts() {
    return ApiClient.get('/movies');
  },
};