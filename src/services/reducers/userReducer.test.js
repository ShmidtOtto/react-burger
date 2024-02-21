import reducer, { setAuthChecked, setUser, login, register, initialState, logout } from './userReducer';

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks();

const userReducerInitialState = Object.assign({}, initialState);

describe('userReducer test', () => {
    beforeEach(() => {
        fetch.resetMocks()
    });

    test('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(userReducerInitialState)
    });

    test('should handle setAuthChecked', () => {
        expect(reducer(userReducerInitialState, setAuthChecked(true))).toEqual({
            ...userReducerInitialState,
            isAuthChecked: true
        })
    });

    test('should handle setUser', () => {
        expect(reducer(userReducerInitialState, setUser({}))).toEqual({
            ...userReducerInitialState,
            user: {}
        })

        expect(reducer(userReducerInitialState, setUser({ email: 'email', name: 'name' }))).toEqual({
            ...userReducerInitialState,
            user: {
                email: 'email',
                name: 'name'
            }
        });

        expect(reducer(userReducerInitialState, setUser(null))).toEqual({
            ...userReducerInitialState,
            user: null
        })
    });

    test('should handle login action', async () => {
        const loginResponse = {
            success: true,
            accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODkyZjU4ODc4OTljMDAxYjgyNTQ5MSIsImlhdCI6MTcwODMxMDczMSwiZXhwIjoxNzA4MzExOTMxfQ.dPLaSBacTZ9TvP-A3kFdHcxs0svyO5x-hJ1gPAeWqVY",
            refreshToken: "81666d693eede7c70abe9580162690b6d17cd55b0cddf357b91fb6b036579da769ab034ad99a9601",
            user: {
                email: "email",
                name: "password"
            }
        }

        fetchMock.mockResponseOnce(JSON.stringify(loginResponse), {
            status: 200,
            ok: true
        });

        const dispatch = jest.fn();
        const loginRequest = login({ email: 'email', password: 'password' });
        await loginRequest(dispatch)

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(login.pending().type);
        expect(end[0].type).toBe(login.fulfilled().type);
        expect(end[0].payload).toEqual(loginResponse);

        expect(fetch).toBeCalledWith('https://norma.nomoreparties.space/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            mode: "cors",
            body: JSON.stringify({ email: 'email', password: 'password' })
        })

        let state = await reducer(userReducerInitialState, login.fulfilled(loginResponse));

        expect(state).toEqual({
            ...userReducerInitialState,
            isAuthChecked: true,
            user: loginResponse.user
        })
    });

    test('should handle login state', async () => {

        const loginResponse = {
            success: true,
            accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODkyZjU4ODc4OTljMDAxYjgyNTQ5MSIsImlhdCI6MTcwODMxMDczMSwiZXhwIjoxNzA4MzExOTMxfQ.dPLaSBacTZ9TvP-A3kFdHcxs0svyO5x-hJ1gPAeWqVY",
            refreshToken: "81666d693eede7c70abe9580162690b6d17cd55b0cddf357b91fb6b036579da769ab034ad99a9601",
            user: {
                email: "email",
                name: "password"
            }
        }

        fetchMock.mockResponseOnce(JSON.stringify(loginResponse), {
            status: 200,
            ok: true
        });

        const loginRequest = reducer(userReducerInitialState,  await login({ email: 'email', password: 'password' }));

        expect(loginRequest).toEqual({ 
            ...userReducerInitialState,
            user: null
        });
    });


    test('should handle register action', async () => {
        const registerResponse = {
            success: true,
            user: {
                email: "email",
                name: "name"
            },
            accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDQxNmM2OTdlZGUwMDAxZDA1Y2ZlNCIsImlhdCI6MTcwODM5ODI3OCwiZXhwIjoxNzA4Mzk5NDc4fQ.Qkr7oCwr-AAYoCVZEmhGQGT8hkhFejao1edBYAA1fO8",
            refreshToken: "2d441a5d1a92be1134c80c7e7b07ce7eca8e6fdd8816a783ee045110fb0cbb88c8981975b8bca59e"
        }

        fetchMock.mockResponseOnce(JSON.stringify(registerResponse), {
            status: 200,
            ok: true
        });

        const dispatch = jest.fn();
        const registerRequest = register({ email: 'email', password: 'password', name: 'name' });
        await registerRequest(dispatch)

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(register.pending().type);
        expect(end[0].type).toBe(register.fulfilled().type);
        expect(end[0].payload).toEqual(registerResponse);

        expect(fetch).toBeCalledWith('https://norma.nomoreparties.space/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            mode: 'cors',
            body: JSON.stringify({ email: 'email', password: 'password', name: 'name' })
        })

        let state = await reducer(userReducerInitialState, register.fulfilled(registerResponse));

        expect(state).toEqual({
            ...userReducerInitialState,
            isAuthChecked: true,
            user: registerResponse.user
        })
    });

    test('should handle register state', async () => {
        const registerResponse = {
            success: true,
            user: {
                email: "email",
                name: "name"
            },
            accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDQxNmM2OTdlZGUwMDAxZDA1Y2ZlNCIsImlhdCI6MTcwODM5ODI3OCwiZXhwIjoxNzA4Mzk5NDc4fQ.Qkr7oCwr-AAYoCVZEmhGQGT8hkhFejao1edBYAA1fO8",
            refreshToken: "2d441a5d1a92be1134c80c7e7b07ce7eca8e6fdd8816a783ee045110fb0cbb88c8981975b8bca59e"
        }

        fetchMock.mockResponseOnce(JSON.stringify(registerResponse), {
            status: 200,
            ok: true
        });

        const loginRequest = reducer(userReducerInitialState, await register({ email: 'email', password: 'password', name: 'name' }));

        expect(loginRequest).toEqual({ 
            ...userReducerInitialState,
            user: null
        });
    });

    test('should handle logout action', async () => {
        await fetch.resetMocks()
        const logoutResponse = {
            success: true,
            message: "Successful logout"
          }

        fetchMock.mockResponseOnce(JSON.stringify(logoutResponse), {
            status: 200,
            ok: true
        });

        const dispatch = jest.fn();
        const logoutRequest = logout();
        await logoutRequest(dispatch)

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(logout.pending().type);
        expect(end[0].type).toBe(logout.fulfilled().type);
        expect(end[0].payload).toEqual(undefined);

        expect(fetch).toBeCalledWith('https://norma.nomoreparties.space/api/auth/logout', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                token: '2d441a5d1a92be1134c80c7e7b07ce7eca8e6fdd8816a783ee045110fb0cbb88c8981975b8bca59e'
            })
        })

        let state = await reducer(userReducerInitialState, logout.fulfilled(logoutResponse));

        expect(state).toEqual({
            ...userReducerInitialState,
            user: null
        })
    })
})