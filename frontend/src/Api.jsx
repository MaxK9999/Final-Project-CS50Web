import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

export const getBlogPosts = async (searchQuery = '') => {
    try {
        const response = await api.get(`blogposts?search=${searchQuery}`);
        console.log('API Request succesful', response);
        return response;
    } catch (error) {
        console.log('Error fetching blog posts:', error);
        throw error;
    }
};

export const registerUser = async (username, email, password) => {
    try {
        const response = await api.post('api/register/', { username, email, password });
        console.log('API Request succesful', response);
        return response;
    } catch (error) {
        console.log('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await api.post('api/login/', { username, password });
        console.log('API Request succesful', response);
        return response;
    } catch (error) {
        console.log('Error logging in:', error);
        throw error;
    }
};