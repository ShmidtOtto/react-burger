import { userApi, checkReponse, refreshToken } from './index';
import { userApiEndpoints } from './user-api-endpoints';

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks();


describe('user api test', () => {
    beforeEach(() => {
        fetch.resetMocks()
    });

    test('checkReponse shoould return a response', async () => {
        let checkReponseResult = await checkReponse({
            ok: true,
            json: () => {
                return Promise.resolve({
                    email: 'email',
                    password: 'password',
                    name: 'name'
                })
            },
            status: 200
        })

        expect(checkReponseResult).toEqual({
            email: 'email',
            password: 'password',
            name: 'name'
        });
    })

    test('checkReponse shoould return a response with error', async () => {
        let error;
        try {
            await checkReponse({
                ok: false,
                json: () => {
                    return Promise.resolve({
                        message: 'error'
                    })
                },
                status: 400
            });
        } catch (err) {
            error = err;
        } finally {
            expect(error.message).toEqual('error');
        }
    })


    test('refreshToken should return a response', async () => {
        const refreshResponse = {
            "success": true,
            "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODkyZjU4ODc4OTljMDAxYjgyNTQ5MSIsImlhdCI6MTcwODQxMzAyMCwiZXhwIjoxNzA4NDE0MjIwfQ.Pb52subeA1x7EuBwAfq8NwoKA-K16MJHtOA1Txl1BPo",
            "refreshToken": "7ae7e93ad2de5c00e2000bc35e8cdcf0d272c4d0514a9720b63b97c8cacd90a37abc87f9670735dd"
          }

        fetchMock.mockResponseOnce(JSON.stringify(refreshResponse), {
            status: 200,
            ok: true
        });

        let refreshTokenResult = await refreshToken();

        expect(refreshTokenResult).toEqual(refreshResponse);
    });

    test('getUser should return a user', async () => {
        const getUserResponse = {
            "success": true,
            "user": {
              "email": "shmidt_o@inbox.ru",
              "name": "Otto7"
            }
          }

        fetchMock.mockResponseOnce(JSON.stringify(getUserResponse), {
            status: 200,
            ok: true
        });

        let getUserResult = await userApi.getUser();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(getUserResult).toEqual(getUserResponse.user);
    })

    test('updateUser should return a update user', async () => {
        const updateUserResponse = {
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODkyZjU4ODc4OTljMDAxYjgyNTQ5MSIsImlhdCI6MTcwODQxMjcyNiwiZXhwIjoxNzA4NDEzOTI2fQ.q_w3Q1Il_HuIdHWXA-KZWlXWFe_m3Md_J7zKkMo1AZw",
            "name": "name",
            "email": "email",
            "password": "password"
        }

        fetchMock.mockResponseOnce(JSON.stringify(updateUserResponse), {
            status: 200,
            ok: true
        });

        let updateUserResult = await userApi.updateUser({ name: 'name', email: 'email', password: 'password' });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(updateUserResult).toEqual(updateUserResponse);
    })

    test('register should return a register response', async () => {
        const registerResponse = {
            "email": "email",
            "password": "password",
            "name": "name"
        }

        fetchMock.mockResponseOnce(JSON.stringify(registerResponse), {
            status: 200,
            ok: true
        });

        let registerResult = await userApi.register('email', 'password', 'name');

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(registerResult).toEqual(registerResponse);
    })

    test('login should return a login response', async () => {
        const loginResponse = {
            "success": true,
            "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODkyZjU4ODc4OTljMDAxYjgyNTQ5MSIsImlhdCI6MTcwODQxMzcyMiwiZXhwIjoxNzA4NDE0OTIyfQ.8PIdZKPsVQaBQnz7PHmEqdhS9E4zEw0v-xBbVHTWnsA",
            "refreshToken": "d4542c88792577c6b0e66881d9db57c67dc7a6e3651df21cbaca19c5e90de957913436a87760c7fb",
            "user": {
                "email": "email",
                "name": "name"
            }
        }

        fetchMock.mockResponseOnce(JSON.stringify(loginResponse), {
            status: 200,
            ok: true
        });

        let loginResult = await userApi.login('email', 'password');

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(loginResult).toEqual(loginResponse);
    })


    test('logout should return nothing', async () => {
        const logoutResponse = {
            "success": true,
            "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODkyZjU4ODc4OTljMDAxYjgyNTQ5MSIsImlhdCI6MTcwODQxMzcyMiwiZXhwIjoxNzA4NDE0OTIyfQ.8PIdZKPsVQaBQnz7PHmEqdhS9E4zEw0v-xBbVHTWnsA",
            "refreshToken": "d4542c88792577c6b0e66881d9db57c67dc7a6e3651df21cbaca19c5e90de957913436a87760c7fb",
            "user": {
                "email": "email",
                "name": "name"
            }
        }

        fetchMock.mockResponseOnce(JSON.stringify(logoutResponse), {
            status: 200,
            ok: true
        });

        let logoutResult = await userApi.logout();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(logoutResult).toEqual(undefined);
    })

    test('resetPassword should return resetPassword response', async () => {
        const resetPasswordResponse = {
            "success": true,
            "message": "Password successfully reset"
        }

        fetchMock.mockResponseOnce(JSON.stringify(resetPasswordResponse), {
            status: 200,
            ok: true
        });

        let resetPasswordResult = await userApi.resetPassword('password');

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(resetPasswordResult).toEqual(resetPasswordResponse);
    })

    test('forgotPassword should return forgotPassword response', async () => {
        const forgotPasswordResponse = {
            "success": true,
            "message": "Reset email sent"
        }

        fetchMock.mockResponseOnce(JSON.stringify(forgotPasswordResponse), {
            status: 200,
            ok: true
        });

        let forgotPasswordResult = await userApi.forgotPassword('password', 'token');

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(forgotPasswordResult).toEqual(forgotPasswordResponse);
    })
})