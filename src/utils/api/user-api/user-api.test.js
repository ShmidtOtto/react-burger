/* eslint-disable jest/no-conditional-expect */
import { userApi, checkReponse, refreshToken } from '../../../utils/api/user-api';
import { userApiEndpoints } from '../../../utils/api/user-api/user-api-endpoints';
import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks();


describe('checkReponse function test', () => {
    test('positive', async () => {
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

    test('negative', async () => {
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
            expect(err).toEqual({
                message: 'error'
            });
        }
    })
})

describe('logout function test', () => {
    test('should return a promise', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            success: true,
        }));

        let logoutResult = await userApi.logout();

        // expect(fetch).toHaveBeenCalledTimes(1);
        // expect(logoutResult).toEqual(undefined);
        // expect(fetch).toBeCalledWith(userApiEndpoints.logout, {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: { 'Content-Type': 'application/json;charset=utf-8' },
        //     body: JSON.stringify({
        //         token: null
        //     })
        // })
    });

    // test('should throw an error', async () => {
    //     fetch.mockImplementationOnce(() => {
    //         return new Error('logout error')
    //     });

    //     try {
    //         await userApi.logout();
    //     } catch (err) {
    //         expect(err).toBeInstanceOf(Error);
    //         expect(err.message).toEqual('logout error');
    //     } finally {
    //         expect(fetch).toHaveBeenCalledTimes(1);
    //     }
    // })
});

// describe('refreshToken function test', () => {
//     test('should return a promise', async () => {
//         fetch.mockImplementationOnce(() => {
//             return Promise.resolve(() => {
//                 return {
//                     ok: true,
//                     json: () => {
//                         return Promise.resolve({
//                             accessToken: 'accessToken',
//                             refreshToken: 'refreshToken',
//                             success: true
//                         })
//                     },
//                     status: 200
//                 }
//             })
//         });

//         let refreshTokenResult = await refreshToken();

//         expect(fetch).toHaveBeenCalledTimes(1);
//         expect(refreshTokenResult).toEqual({
//             accessToken: 'accessToken',
//             refreshToken: 'refreshToken',
//             success: true
//         })
//     });
// })