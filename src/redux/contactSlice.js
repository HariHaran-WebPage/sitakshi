// src/redux/contactSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/contacts', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    successMessage: null
  },
  reducers: {
    resetContactState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = action.payload.message;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to submit contact form';
      });
  }
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;