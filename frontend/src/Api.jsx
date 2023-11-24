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

export const registerUser = async (userData) => {
    try {
        const response = await api.post('register/', userData);
        console.log('Registration succesful', response);
        return response;
    } catch (error) {
        console.log('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post('login/', userData);
        console.log('Login succesful', response);
        return response;
    } catch (error) {
        console.log('Error logging in:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await api.post('logout/');
        console.log('Logout succesful', response);
        return response;
    } catch (error) {
        console.log('Error logging out:', error);
        throw error;
    }
};