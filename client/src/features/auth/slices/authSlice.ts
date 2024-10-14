import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store.tsx";

interface InitialState {
    token: string | null;
}

const initialState: InitialState = {
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
        },
        setCredentials: (state, action: PayloadAction<any>) => {
            state.token = action.payload.accessToken;
            localStorage.setItem("token", action.payload.accessToken);
        },
    },
});

export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const { logout, setCredentials } = authSlice.actions;
