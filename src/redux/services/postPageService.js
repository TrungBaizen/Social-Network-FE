import axios from 'axios';
const API_URL = 'http://localhost:8080/posts/users/1';

export const fetchPostsService = async () => {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
};




