const API_ROOT = process.env.REACT_APP_API_URL;

export const ENDPOINTS = {
    REGISTER: `${API_ROOT}/users/register`,
    LOGIN: `${API_ROOT}/users/login`,
    ME: `${API_ROOT}/users/me`,
};