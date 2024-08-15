import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPostService, fetchPostsService } from '../services/createPostService';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await fetchPostsService();
        return response;
    }
);

export const addPost = createAsyncThunk(
    'posts/addPost',
    async ({ postContent, visibility, file }, thunkAPI) => {
        try {
            const newPost = await createPostService(postContent, visibility, file);
            return newPost;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            });
    },
});

export const selectPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
