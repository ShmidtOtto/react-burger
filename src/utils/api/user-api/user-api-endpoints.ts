const MAIN_URL = 'https://norma.nomoreparties.space/api';

export const userApiEndpoints = {
    token: `${MAIN_URL}/auth/token`,
    user: `${MAIN_URL}/auth/user`,
    register: `${MAIN_URL}/auth/register`,
    login: `${MAIN_URL}/auth/login`,
    logout: `${MAIN_URL}/auth/logout`,
    forgotPassword: `${MAIN_URL}/password-reset`,
    resetPassword: `${MAIN_URL}/password-reset/reset`,
}