// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from './hooks'
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUserInfo } from '@interfaces/index';

import { ILoginResponse } from '@api/user-api/index';

import { userApi } from '@api/';

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }:  { email: string; password: string; }) => {
        const res = await userApi.login(email, password);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
    }
);

export const register = createAsyncThunk(
    'user/register',
    async ({ email, password, name }: { email: string; password: string; name: string; }) => {
        const res = await userApi.register(email, password, name);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        await userApi.logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
);

interface IUserState {
    user: Pick<IUserInfo, 'email' | 'name'> | null;
    isAuthChecked: boolean;
}

const initialState: IUserState = {
    user: null,
    isAuthChecked: false,
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action: PayloadAction<Pick<IUserInfo, 'email' | 'name'> | null>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })
    }
});

export default userReducer.reducer;
const { setAuthChecked, setUser } = userReducer.actions;

const getUser = () => {
    return async (dispatch: typeof useAppDispatch) => {
        const res = await userApi.getUser();
        dispatch(setUser(res));
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};

export { setAuthChecked, setUser };