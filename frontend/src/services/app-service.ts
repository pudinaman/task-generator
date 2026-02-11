import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ITask {
    id: string;
    title: string;
    description: string;
    type: 'user_story' | 'engineering_task';
    group?: string;
}

export interface ISpec {
    _id: string;
    goal: string;
    users: string;
    constraints: string;
    template: string;
    tasks: ITask[];
    risks?: string;
    createdAt: string;
}

export const specService = {
    create: async (data: any) => {
        const response = await axios.post(`${API_URL}/specs`, data);
        return response.data;
    },
    getRecent: async () => {
        const response = await axios.get(`${API_URL}/specs/recent`);
        return response.data;
    }
};
