import { createSlice } from "@reduxjs/toolkit";
import { createPost, deletePost, getPostByUserId } from "../services/postService";

const initialState = {
    list: []
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(createPost.fulfilled, (state, { payload }) => {
            state.list.push(payload); // Thêm bài viết mới vào danh sách
        });
        builder.addCase(getPostByUserId.fulfilled, (state, { payload }) => {
            state.list = payload; // Cập nhật danh sách bài viết
        });
        builder.addCase(deletePost.fulfilled, (state, { payload }) => {
            state.list = state.list.filter(post => post.id !== payload.id); // Xóa bài viết khỏi danh sách
        });
    }
});

export default postSlice.reducer;
