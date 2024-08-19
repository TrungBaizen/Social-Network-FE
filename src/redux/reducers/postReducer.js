import {createSlice} from "@reduxjs/toolkit";
import {
    createPost,
    deletePost,
    getAllPostByFollowing,
    getPostByUserId,
    searchPost,
    updatePost
} from "../services/postService";

const initialState = {
    list: [],
    listSearch:[],
    listPostHome : []
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(createPost.fulfilled, (state, {payload}) => {
            state.list.unshift(payload); // Thêm bài viết mới vào đầu danh sách
            state.listPostHome.unshift(payload);
        });
        builder.addCase(getPostByUserId.fulfilled, (state, {payload}) => {
            state.list = payload; // Cập nhật danh sách bài viết
        });
        builder.addCase(deletePost.fulfilled, (state, {payload}) => {
            state.list = state.list.filter(post => post.id !== payload.id); // Xóa bài viết khỏi danh sách
            state.listPostHome = state.listPostHome.filter(post => post.id !== payload.id); // Xóa bài viết khỏi danh sách
        });
        builder.addCase(updatePost.fulfilled, (state, {payload}) => {
            const index = state.list.findIndex(post => post.id === payload.id);
            if (index !== -1) {
                state.list[index] = payload; // Thay thế bài viết cũ bằng bài viết mới
            }
            const indexHome = state.listPostHome.findIndex(post => post.id === payload.id);
            if (indexHome !== -1) {
                state.listPostHome[indexHome] = payload; // Thay thế bài viết cũ bằng bài viết mới
            }
        })
        builder.addCase(searchPost.fulfilled,(state,{payload})=>{
            state.listSearch = payload;
        })
        builder.addCase(getAllPostByFollowing.fulfilled,(state,{payload})=>{
            state.listPostHome = payload;
        })
    }
});

export default postSlice.reducer;
