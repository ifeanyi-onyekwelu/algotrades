import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApiSlice from "../api/userApiSlice"; // Import your user API slice if needed

// Define initial state for the user dashboard
const initialState = {
    userProfile: null,
    wallet: null,
    loading: false,
    error: null,
};

// Create async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
    "userDashboard/fetchUserProfile",
    async (_, { dispatch }) => {
        const { data } = await dispatch(
            userApiSlice.endpoints.getUserProfile.initiate(undefined),
        );
        return data;
    },
);

// Create async thunk to fetch user wallet
export const fetchUserWallet = createAsyncThunk(
    "userDashboard/fetchUserWallet",
    async (_, { dispatch }) => {
        const { data } = await dispatch(
            userApiSlice.endpoints.getUserWallet.initiate(undefined),
        );
        return data;
    },
);

// Create the user dashboard slice
const userDashboardSlice = createSlice({
    name: "userDashboard",
    initialState,
    reducers: {
        clearError: (state: any) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Handle fetch user profile actions
        builder
            .addCase(fetchUserProfile.pending, (state: any) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state: any, action) => {
                state.loading = false;
                state.userProfile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle fetch user wallet actions
            .addCase(fetchUserWallet.pending, (state: any) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserWallet.fulfilled, (state: any, action) => {
                state.loading = false;
                state.wallet = action.payload;
            })
            .addCase(fetchUserWallet.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export actions and reducer
export const { clearError } = userDashboardSlice.actions;
export default userDashboardSlice.reducer;
