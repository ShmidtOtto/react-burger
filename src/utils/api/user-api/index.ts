
import { userApiEndpoints } from './user-api-endpoints';
import { IShortUserInfo } from '@interfaces/index';

interface IApiTokenResponse {
    accessToken: string;
    refreshToken: string;
}

interface IStatusResponse {
    success: boolean;
}

export interface ILoginResponse extends IStatusResponse, IApiTokenResponse {
    accessToken: string;
    refreshToken: string;
    user: IShortUserInfo;
}

export interface IRegisterResponse extends IStatusResponse, IApiTokenResponse {
    accessToken: string;
    refreshToken: string;
    user: IShortUserInfo;
}

interface IUpdateUserResponse extends IStatusResponse {
    user: IShortUserInfo;
}

interface IGetUserResponse extends IStatusResponse {
    user: IShortUserInfo;
}

interface IRefreshTokenResponse extends IApiTokenResponse, IStatusResponse {}

interface IForgotPasswordResponse extends IStatusResponse {
    message: string;
}

interface IResetPasswordResponse extends IStatusResponse {
    message: string;
}


const checkReponse = <T>(response: Response ): Promise<T> => {
    return response.ok ? response.json().then(response => Promise.resolve<T>(response)) : response.json().then((err) => Promise.reject(err));
};

export const refreshToken = async (): Promise<IRefreshTokenResponse> => {
    const response = await fetch(userApiEndpoints.token, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        })
    });
    return await checkReponse(response);
};

export const fetchWithRefresh = async <T>(url: string, options: RequestInit): Promise<T> => {
    try {
        let response = await fetch(url, options);
        return await checkReponse<T>(response);
    } catch (err: unknown) {
        if (err instanceof Error && 'message' in err && err.message === 'jwt expired') {
            const refreshData = await refreshToken(); //обновляем токен
            if (!refreshData.success) throw new Error('Error with refresh token request');
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            const response = await fetch(url, options);
            return await checkReponse<T>(response);
        }

        return Promise.reject(err);
    }
};

const getUser = async (): Promise<IShortUserInfo> => {
    try {
        const { user } = await fetchWithRefresh<IGetUserResponse>(userApiEndpoints.user, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': localStorage.getItem('accessToken') || ''
            }
        });

        return user;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('unknown error');
        }
    }
}

interface IUpdateUserProps {
    name: string;
    email: string;
    password: string;
}

const updateUser = async ({ name, email, password }: IUpdateUserProps): Promise<IUpdateUserResponse> => {
    try {
        return await fetchWithRefresh<IUpdateUserResponse>(userApiEndpoints.user, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': localStorage.getItem('accessToken') || ''
            },
            body: JSON.stringify({
                authorization: localStorage.getItem('accessToken'),
                name: name,
                email: email,
                password: password,
            })
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('unknown error');
        }
    }
}

const register = async (email: string, password: string, name: string): Promise<IRegisterResponse> => {
    try {
        const response = await fetch(userApiEndpoints.register, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        });

        return await checkReponse<IRegisterResponse>(response);
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('unknown error');
        }
    }
}

const login = async (email: string, password: string): Promise<ILoginResponse> => {
    try {
        const response = await fetch(userApiEndpoints.login, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        return await checkReponse<ILoginResponse>(response);
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('unknown error');
        }
    }
}

const logout = async (): Promise<void> => {
    try {
        await fetch(userApiEndpoints.logout, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('unknown error');
        }
    }
}

const forgotPassword = async (email: string): Promise<IForgotPasswordResponse> => {
    try {
        const response = await fetch(userApiEndpoints.forgotPassword, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                email: email
            })
        });

        return await checkReponse<IForgotPasswordResponse>(response);
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('unknown error');
        }
    }
}

const resetPassword = async (password: string, token: string): Promise<IResetPasswordResponse> => {
    try {
        const response = await fetch(userApiEndpoints.resetPassword, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                password: password,
                token: token
            })
        });

        return await checkReponse(response);
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('unknown error');
        }
    }
}

export const userApi = {
    getUser,
    updateUser,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
};