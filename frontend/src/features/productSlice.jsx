import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";


// INITIAL STATE
const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    createLoading: false,
    deleteLoading: false,
    updateLoading: false,
    message: ''
};

//API URL
const createProductUrl = "http://localhost:4000/api/v1/product/create";
const getAllProductUrl = "http://localhost:4000/api/v1/product/getAll";
const updateProductUrl = "http://localhost:4000/api/v1/product/update";
const deleteProductUrl = "http://localhost:4000/api/v1/product/delete";


// Create product
export const createProductAsync = createAsyncThunk("product/create", async (formData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.post(createProductUrl, formData, config);
        console.log(response.data);
        toast.success(response.data.message)
        return response.data;

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get all product
export const getProductAsync = createAsyncThunk("product/all", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get(getAllProductUrl, config);
        // console.log(response.data);
        return response.data;

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


// Update product
export const updateProductAsync = createAsyncThunk("product/update", async (formData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.put(updateProductUrl, formData, config);
        console.log(response.data);
        toast.success(response.data.message)
        return response.data;

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


// Delete product
export const deleteGoalsAsync = createAsyncThunk("product/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        // const response = await axios.delete(deleteProductUrl + id, config);
        const response = await axios.delete(`${deleteProductUrl}/${id}`, config);
        toast.success(response.data.message)
        return response.data;

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        resetGoals: (state) => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(createProductAsync.pending, (state, action) => {
                state.createLoading = true;
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.createLoading = false;
                state.isSuccess = true;
                state.products.push(action.payload)
            })
            .addCase(createProductAsync.rejected, (state, action) => {
                state.createLoading = false;
                state.isError = true;
                state.message = action.payload;
            })



            .addCase(getProductAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getProductAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProductAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })



            .addCase(deleteGoalsAsync.pending, (state, action) => {
                // state.isLoading = true;
                state.deleteLoading = true;
            })
            .addCase(deleteGoalsAsync.fulfilled, (state, action) => {
                // state.isLoading = false;
                state.deleteLoading = false;
                state.isSuccess = true;
                state.products = state.products.filter((product) => product._id !== action.payload.id);
            })
            .addCase(deleteGoalsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


            .addCase(updateProductAsync.pending, (state, action) => {
                state.updateLoading = true;
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.isSuccess = true;
            })
    },
});

export const { resetGoals } = productSlice.actions;
export default productSlice.reducer;


