import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const { data } = await axios.get('categories/getAll')
    return data;
});

export const fetchCreateCategories = createAsyncThunk('categories/fetchCreateCategories', async (params) => {
    const { data } = await axios.post('categories/create', params)
    return data;
})

export const fetchDeleteCategories = createAsyncThunk('categories/fetchDeleteCategories', async (params) => {
    const { data } = await axios.delete(`categories/delete?id=${params.id}`)
    return data;
})

const initialState = {
    data: null,
    categories: {
        items: [],
        status: 'loading'
    },
    error: null,

}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCategories.pending]: (state) => {
            state.categories.items = [];
            state.categories.status = 'loading';
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.categories.items = action.payload;
            state.categories.status = 'loaded'
        },
        [fetchCategories.rejected]: (state) => {
            state.categories.items = [];
            state.categories.status = 'error';
        },
        [fetchCreateCategories.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchCreateCategories.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchCreateCategories.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        }
    },
})

export const categoriesReducer = categoriesSlice.reducer