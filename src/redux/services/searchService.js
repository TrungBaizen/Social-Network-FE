// src/services/searchService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/profiles/search';

export const searchProfiles = async (name) => {
    try {
        const response = await axios.get(API_URL, {
            params: { name },
        });
        return response.data; //
    } catch (error) {
        throw new Error('No profiles found.');
    }
};
