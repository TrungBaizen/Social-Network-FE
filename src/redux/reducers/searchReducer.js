// src/redux/searchReducer.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { searchProfiles } from '../services/searchService';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        profiles: [],
        error: '',
    },
    reducers: {
        setProfiles: (state, action) => {
            state.profiles = action.payload;
            state.error = '';
        },
        setError: (state, action) => {
            state.profiles = [];
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProfilesThunk.fulfilled, (state, action) => {
                state.profiles = action.payload;
                state.error = '';
            })
            .addCase(searchProfilesThunk.rejected, (state, action) => {
                state.profiles = [];
                state.error = action.error.message || 'No profiles found.';
            });
    },
});
export const { setProfiles, setError } = searchSlice.actions;

export const searchProfilesThunk = createAsyncThunk(
    'search/searchProfiles',
    async (name, { rejectWithValue }) => {
        try {
            const profiles = await searchProfiles(name);
            return profiles;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export default searchSlice.reducer;
