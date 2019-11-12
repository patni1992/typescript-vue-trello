import axios from 'axios';
import { UserInfo, UserLogin } from '@/store/user';

export const api = axios.create({
    baseURL: 'http://localhost:1337',
});

interface LoginResponse {
    user: UserInfo;
    token: string;
}

export const loginUser = (userInfo: UserLogin) => {
    return api.post<LoginResponse>('/login', userInfo);
};
