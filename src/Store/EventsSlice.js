import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "../Utils";
import axios from "axios";
const baseUrl = "https://eko-server.onrender.com";
export const getAllEvents = createAsyncThunk("events/getAllEvents", async () => {

    try{
        const request = await axios.get(`${baseUrl}/events`);
        const response = request.data;
        console.log(response);
        return response;
    
    }catch(err){
        console.log(err.message);
        return err.message;
    }
})

const EventsSlice = createSlice({
    name: 'events',
    initialState: {
        loading: true,
        events: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getAllEvents.pending, (state, action) => {
            state.loading = true;
            state.events = [];
            state.error = null;
        })
        .addCase(getAllEvents.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action);
            if(action.payload.status === "FAILED"){
                state.error = action.payload.message;
                state.events = [];
            }else{
                state.events = action.payload.data;
                state.error = null;
            }
        })
        .addCase(getAllEvents.rejected, (state, action) => {
           console.log(action);
            state.loading = false;
            state.events = [];
            state.error =action.error.message
        })
    }
})
export default EventsSlice.reducer;