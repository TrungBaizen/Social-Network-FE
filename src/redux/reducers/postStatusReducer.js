import {createSlice} from "@reduxjs/toolkit";
import {getAllPostStatus} from "../services/postStatusService";

const initialState = {
    list:[]
}
const postStatusSlice = createSlice({
    name:'postStatuses',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllPostStatus.fulfilled,(state, {payload})=>{
            state.list = payload;
        })
    }
});
export default postStatusSlice.reducer;