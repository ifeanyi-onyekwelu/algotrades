import baseApi from "../../../app/api/apiSlice.ts";
import { setCredentials } from "../slices/authSlice.ts";
import { logout } from "../slices/authSlice.ts";

export const authApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: { ...data },
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: { ...data },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch }) {
                try {
                    dispatch(logout());
                    setTimeout(() => {
                        dispatch(baseApi.util.resetApiState());
                    }, 1000);
                } catch (err: any) {
                    console.log(err);
                }
            },
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    const { accessToken } = data;
                    dispatch(setCredentials({ accessToken }));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: { ...data },
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: { ...data },
            }),
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: "/auth/verify-email",
                method: "POST",
                body: { ...data },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useRefreshMutation,
    useVerifyEmailMutation,
} = authApiSlice;

export default authApiSlice;
