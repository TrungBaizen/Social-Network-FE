// reducers/notificationReducer.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchNotificationsFromAPI} from '../services/notificationService';

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        const data = await fetchNotificationsFromAPI();
        return data;
    }
);

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        list: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default notificationSlice.reducer;
