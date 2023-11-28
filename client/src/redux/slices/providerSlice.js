import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const fetchProviders = createAsyncThunk('provider/fetchProviders', async () => {
    const { data } = await axios.get('provider/getAll')
    return data;
});

export const fetchCreateProvider = createAsyncThunk('provider/fetchCreateProvider', async (params) => {
    const { data } = await axios.post('provider/create', params)
    return data;
})

export const fetchDeleteProvider = createAsyncThunk('provider/fetchDeleteProvider', async (params) => {
    const { data } = await axios.delete(`provider/delete?id=${params.id}`)
    return data;
})

const initialState = {
    data: null,
    providers: {
        items: [],
        status: 'loading'
    },
    error: null,

}

const providerSlice = createSlice({
    name: 'providers',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProviders.pending]: (state) => {
            state.providers.items = [];
            state.providers.status = 'loading';
        },
        [fetchProviders.fulfilled]: (state, action) => {
            state.providers.items = action.payload;
            state.providers.status = 'loaded'
        },
        [fetchProviders.rejected]: (state) => {
            state.providers.items = [];
            state.providers.status = 'error';
        },
        [fetchCreateProvider.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchCreateProvider.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchCreateProvider.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        }
    },
})

export const providerReducer = providerSlice.reducer