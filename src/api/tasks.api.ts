import axios from 'axios';
import { doPrivateApi } from '../interceptors';

const baseURL = 'https://luisvidal87.pythonanywhere.com';

export const tasksApi = axios.create({ baseURL });

export const tasksPrivateApi = doPrivateApi(axios.create({ baseURL }));
