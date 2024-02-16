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

// Use this one for Destinations.jsx
export const getCountries = async () => {
    try {
        const response = await api.get(`countries`);
        const countries = response.data.map(country => ({
            name: country.name,
            center: [country.latitude, country.longitude],
        }));
        console.log('Countries fetched succesful', response.data);
        return countries;
    } catch (error) {
        console.log('Error fetching countries:', error);
        throw error;
    }
};

// Use this one for Profile.jsx
export const getUserCountries = async (username, countryType) => {
    try {
        const response = await api.get(`user_countries/${username}/${countryType}`);
        console.log('User countries fetched succesful', response.data);
        return response.data;
    } catch (error) {
        console.log('Error fetching user countries:', error);
        throw error;
    }
};

const addToCountryList = async (countryType, username, countryName) => {
    try {
      const response = await api.post(
        `/user_countries/${username}/${countryType}/`,
        {
          country_name: countryName,
        },
        {
          headers: {
            'X-CSRFToken': getCookie('csrftoken')
          }
        }
      );
      console.log(`Added ${countryName} to ${countryType} countries.`, response.data);
    } catch (error) {
      console.error(`Error adding ${countryName} to ${countryType} countries:`, error);
      throw error;
    }
};

export const addToVisitedCountries = async (username, countryName) => {
    await addToCountryList('visited', username, countryName);
};

export const addToInterestedCountries = async (username, countryName) => {
    await addToCountryList('interested', username, countryName);
};
