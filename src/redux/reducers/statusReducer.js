import {createSlice} from "@reduxjs/toolkit";
import {getAllStatus} from "../services/statusService";

const initialState = {
    list:[]
}
const statusSlice = createSlice({
    name:'statuses',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllStatus.fulfilled,(state, {payload})=>{
            state.list = payload;
        })
    }
});
export default statusSlice.reducer;