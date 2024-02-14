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

export const fetchProfileData = async () => {
    try {
        const response = await api.get(`userprofile`);
        console.log('Profile data fetched succesful', response.data);
        return response.data;
    } catch (error) {
        console.log('Error fetching profile data:', error);
        throw error;
    }
};

export const updateProfile = async (formData) => {
    try {
        const csrftoken = getCookie('csrftoken');
        const data = new FormData();
        
        // Append each form field to the FormData object
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        const response = await api.patch("userprofile/", data, {
            headers: {
                'X-CSRFToken': csrftoken
            },
            withCredentials: true
        });
        console.log("Profile updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

export const getLocalPlace = async () => {
    try {
        const response = await api.get("localplace/");
        const countries = response.data.map(place => ({
            name: place.country,
            code: place.code,
            center: [0,0],
        }));
        console.log("Local places fetched successfully:", response.data);
        return countries;
    } catch (error) {
        console.error("Error fetching local places:", error);
        throw error;
    }
};