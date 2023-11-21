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