/* eslint-disable import/no-named-as-default-member */
import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://internet-quality-api.onrender.com', 
    timeout: 15000,
});

