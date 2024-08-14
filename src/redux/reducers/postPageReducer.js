import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchPostsService} from '../services/postPageService.js';


const initialState = {
    posts: [],
    status: 'idle',
    error: null
};

 export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
     return await fetchPostsService();
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
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
            });
    }
});

export default postsSlice.reducer;
