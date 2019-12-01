import axios from 'axios';
import { UserInfo, UserLogin } from '@/store/user';
import { BoardsData } from '@/store/boards';

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

export const fetchBoards = () => {
    return api.get<BoardsData[]>('/boards');
};

export const fetchColumns = (boardId: string) => {
    return api.get(`/columns`, {
        params: {
            boardId,
        },
    });
};

export const fetchColumnsWithCards = (boardId: string) => {
    return api.get(`/columns`, {
        params: {
            boardId,
            include: 'cards',
        },
    });
};
