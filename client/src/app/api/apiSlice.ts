import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/slices/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://api.algotrades.io/api/v1/",
    // baseUrl: "http://localhost:3333/api/v1",
    credentials: "include",
    prepareHeaders: (headers, _: any) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log(result);

    if (result.error && result.error.status === 500) {
        // Refresh the token
        const refreshResult: any = await baseQuery(
            "/auth/refresh",
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const { accessToken } = refreshResult.data;

            // Store the new token in the Redux state
            api.dispatch(setCredentials({ accessToken })); // This will update the token in the auth slice

            result = await baseQuery(args, api, extraOptions);
        } else {
            // Handle refresh failure
            if (refreshResult.error?.status === 500) {
            }
        }
    }

    return result;
};

// Base API setup
const baseApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});

export default baseApi;
