import axios from 'axios';

 export const createPostService = async (post) => {
    try {
        const response = await axios.post('http://localhost:8080/posts ', {
            email: post.email,
            content: post.content,
            postImages: post.postImages,
            postStatus: post.postStatus
        });
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
    }
};

 export const fetchPostsService = async (postId) => {
    try {
        const response = await axios.get(`http://localhost:8080/posts/${postId}`);
        const { email, content, postImages, postStatus } = response.data;
        return { email, content, postImages, postStatus };
    } catch (error) {
        console.error("Error fetching post:", error);
    }
};


