import axios from 'axios';

const externalApiBase = 'https://my-json-server.typicode.com/pineapplexpres/api-movies-json';

const apiClient = axios.create({
  baseURL: `${externalApiBase}`,
});

const injectToken = async (config) => {
  try {
    const token = JSON.parse(localStorage.getItem('user')).token ;
    const newConfig = config;
    newConfig.headers.authorization = `Bearer ${token}`;
    return newConfig;
  } catch (error) {
    throw new Error('Unauthorized');
  }
};

apiClient.interceptors.request.use(injectToken);

export default apiClient;