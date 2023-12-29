import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { userApi } from '../../utils/api';

const getUser = () => {
    return async (dispatch) => {
        const res = await userApi.getUser();
        dispatch(setUser(res));
    };
};

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }) => {
        const res = await userApi.login(email, password);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
    }
);

export const register = createAsyncThunk(
    'user/register',
    async ({ email, password, name }) => {
        const res = await userApi.register(email, password, name);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res.user;
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

const initialState = {
    user: null,
    isAuthChecked: false,
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
    }
});

export default userReducer.reducer;
const { setAuthChecked, setUser } = userReducer.actions;

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