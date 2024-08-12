import axios from 'axios';

export const fetchNotificationsFromAPI = async () => {
    try {
        const response = await axios.get('');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch notifications:', error);
        throw error;
    }
};
