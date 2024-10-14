import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/apiSlice.ts";
import authReducer from "../features/auth/slices/authSlice.ts";
import userReducer from "../features/user/slice/userSlice.ts";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export default store;
