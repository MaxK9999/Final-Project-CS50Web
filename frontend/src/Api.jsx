import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
};

// Fetch Blog Posts from the BlogPost API
export const getBlogPosts = async (searchQuery = '') => {
    try {
        const response = await api.get(`blogposts?search=${searchQuery}`);
        console.log('Blog posts fetched succesful', response);
        return response;
    } catch (error) {
        console.log('Error fetching blog posts:', error);
        throw error;
    }
};

// Fetch email data from the EmailHandler API
export const getEmailData = async (data) => {
    try {
        const csrftoken = getCookie('csrftoken');
        const response = await api.post('send_mail/', data, {
            headers: {
                'X-CSRFToken': csrftoken
            },
            withCredentials: true
        });
        console.log('Email sent succesful', response);
        return response;
    } catch (error) {
        console.log('Error sending email:', error);
        throw error;
    }
};