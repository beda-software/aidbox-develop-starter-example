import { service } from 'aidbox-react/lib/services/service';

import { RemoteDataResult } from 'aidbox-react/lib/libs/remoteData';
import { User } from '../types/aidbox';

export function getToken() {
    return window.localStorage.getItem('token') || undefined;
}

export function setToken(token: string) {
    window.localStorage.setItem('token', token);
}

export function removeToken() {
    window.localStorage.removeItem('token');
}

export function logout() {
    return service({
        method: 'DELETE',
        url: '/Session',
    });
}

export function getUserInfo() {
    return service<User>({
        method: 'GET',
        url: '/auth/userinfo',
    });
}

export interface SigninBody {
    email: string;
    password: string;
}

export function signin(data: SigninBody): Promise<RemoteDataResult> {
    return service({
        url: '/auth/token',
        method: 'POST',
        data: {
            username: data.email,
            password: data.password,
            client_id: 'SPA',
            grant_type: 'password',
        },
    });
}
