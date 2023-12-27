import { userApiEndpoints } from './user-api-endpoints';

const checkReponse = (response) => {
    return response.ok ? response.json().then(response => Promise.resolve(response)) : response.json().then((err) => Promise.reject(err));
};

export const refreshToken = async () => {
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

export const fetchWithRefresh = async (url, options) => {
    try {
        let response = await fetch(url, options);
        return await checkReponse(response);
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken(); //обновляем токен
            if (!refreshData.success) throw new Error(refreshData);
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            return await fetch(url, options); //повторяем запрос
        } else {
            throw new Error(err.message);
        }
    }
};

const getUser = async () => {
    try {
        const { user } = await fetchWithRefresh(userApiEndpoints.user, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': localStorage.getItem('accessToken')
            }
        });

        return user;
    } catch (err) {
        throw new Error(err);
    }
}

const updateUser = async ({ name, email, password }) => {
    try {
        return await fetchWithRefresh(userApiEndpoints.user, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                authorization: localStorage.getItem('accessToken'),
                name: name,
                email: email,
                password: password,
            })
        });
    } catch (err) {
        return new Error(err);
    }
}

const register = async (email, password, name) => {
    try {
        const { accessToken, refreshToken, user } = await fetch(userApiEndpoints.register, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        });

        return { accessToken, refreshToken, user };
    } catch (err) {
        throw new Error(err);
    }
}

const login = async (email, password) => {
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

        return await checkReponse(response);
    } catch (err) {
        throw new Error(err.message);
    }
}

const logout = async () => {
    try {
        await fetch(userApiEndpoints.logout, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        });
    } catch (err) {
        return new Error(err);
    }
}

const forgotPassword = async (email) => {
    try {
        return await fetch(userApiEndpoints.forgotPassword, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                email: email
            })
        });
    } catch (err) {
        throw new Error(err);
    }
}

const resetPassword = async (password, token) => {
    try {
        return await fetch(userApiEndpoints.resetPassword, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                password: password,
                token: token
            })
        });
    } catch (err) {
        throw new Error(err);
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