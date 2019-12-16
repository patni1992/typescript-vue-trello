import axios from 'axios';
import { UserInfo, UserLogin, UserRegister } from '@/store/user';
import { BoardsData, NewBoard, UpdateBoard } from '@/store/boards';
import { ColumnsData, UpdateColumn } from '@/store/columns';
import { CardsData, UpdateCard } from '@/store/cards';

export const api = axios.create({
    baseURL: '/api',
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

export const registerUser = (userInfo: UserRegister) => {
    return api.post('/register', userInfo);
};


export const fetchBoards = () => {
    return api.get<BoardsData[]>('/boards');
};

export const removeBoard = (id: number) => {
    return api.delete<BoardsData[]>(`/boards/${id}`);
};

export const fetchBoardById = (id: number) => {
    return api.get<BoardsData>(`/boards/${id}`);
};

export const createBoard = (newBoard: NewBoard) => {
    return api.post<BoardsData>(`/boards/`, newBoard);
};

export const updateBoard = (updateBoard: UpdateBoard) => {
    return api.put<BoardsData>(`/boards/${updateBoard.id}`, updateBoard);
};

export const addCard = (card: CardsData) => {
    return api.post<CardsData>(`/columns/${card.columnId}/cards`, card);
};

export const updateCard = (card: UpdateCard) => {
    return api.put<CardsData>(`/cards/${card.id}`, card);
};

export const reOrderCards = (data: { columnId: number; cardIds: number[] }) => {
    return api.patch<number[]>(`/cards/reorder`, data);
};

export const addColumn = (column: ColumnsData) => {
    return api.post<ColumnsData>(`/boards/${column.boardId}/columns`, column);
};

export const updateColumn = (column: UpdateColumn) => {
    return api.put<ColumnsData>(`/columns/${column.id}`, column);
};

export const removeColumn = (id: number) => {
    return api.delete<ColumnsData>(`/columns/${id}`);
};

export const reOrderColumns = (data: { boardId: number; columnIds: number[] }) => {
    return api.patch<number[]>(`/columns/reorder`, data);
};

export const fetchColumnsWithCards = (boardId: number) => {
    return api.get<ColumnsWithCards[]>(`/columns`, {
        params: {
            boardId,
            include: 'cards',
        },
    });
};
