import axios from 'axios';
import { UserInfo, UserLogin } from '@/store/user';
import { BoardsData, NewBoard } from '@/store/boards';
import { ColumnsData } from '@/store/columns';
import { CardsData } from '@/store/cards';

export const api = axios.create({
    baseURL: 'http://localhost:1337',
});

interface LoginResponse {
    user: UserInfo;
    token: string;
}

interface ColumnsWithCards extends Omit<ColumnsData, 'cards'> {
    cards: CardsData[];
}

export const loginUser = (userInfo: UserLogin) => {
    return api.post<LoginResponse>('/login', userInfo);
};

export const fetchBoards = () => {
    return api.get<BoardsData[]>('/boards');
};

export const fetchBoardById = (id: number) => {
    return api.get<BoardsData>(`/boards/${id}`);
};

export const createBoard = (newBoard: NewBoard) => {
    return api.post<BoardsData>(`/boards/`, newBoard);
};

export const addCard = (card: CardsData) => {
    return api.post<CardsData>(`/columns/${card.columnId}/cards`, card);
};

export const reOrderCards = (data: { columnId: number; cardIds: number[] }) => {
    return api.patch<ColumnsWithCards>(`/cards/reorder`, data);
};

export const fetchColumnsWithCards = (boardId: number) => {
    return api.get<ColumnsWithCards[]>(`/columns`, {
        params: {
            boardId,
            include: 'cards',
        },
    });
};
