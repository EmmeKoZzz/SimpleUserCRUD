import axios from 'axios';
import { doPrivateApi } from '../interceptors';

const baseURL = 'https://luisvidal87.pythonanywhere.com';

// eslint-disable-next-line import/prefer-default-export
export const tasksApi = doPrivateApi(axios.create({ baseURL }));
