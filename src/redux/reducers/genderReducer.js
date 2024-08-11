import {createSlice} from "@reduxjs/toolkit";
import {getAllGender} from "../services/genderService";

const initialState = {
    list:[]
}
const genderSlice = createSlice({
    name:'genders',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllGender.fulfilled,(state, {payload})=>{
            state.list = payload;
        })
    }
});
export default genderSlice.reducer;