import baseApi from "../../../app/api/apiSlice";

const userApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => "user/profile",
        }),
        updateUser: builder.mutation({
            query: (userData) => ({
                url: "/user/update",
                method: "PUT",
                body: userData,
            }),
        }),
        deleteUserProfile: builder.mutation({
            query: () => ({
                url: "/user/delete",
                method: "POST",
            }),
        }),
        changeProfilePhoto: builder.mutation({
            query: (photoData) => ({
                url: "/user/upload",
                method: "PUT",
                body: photoData,
            }),
        }),
        getUserWallet: builder.query({
            query: () => "user/wallet",
        }),
        getAllReferrals: builder.query({
            query: () => "user/referrals",
        }),
        reinvest: builder.mutation({
            query: (reinvestData) => ({
                url: "/deposits/reinvest",
                method: "POST",
                body: reinvestData,
            }),
        }),
        handleUserDeposit: builder.mutation({
            query: (depositData) => ({
                url: "/deposits/",
                method: "POST",
                body: depositData,
            }),
        }),
        getAllUserDeposits: builder.query({
            query: () => "/deposits/all",
        }),
        getUserTotalDeposit: builder.query({
            query: () => "/deposits/total",
        }),
        handleUserWithdrawal: builder.mutation({
            query: (withdrawalData) => ({
                url: "/withdrawals/",
                method: "POST",
                body: withdrawalData,
            }),
        }),
        getAllUserWithdrawals: builder.query({
            query: () => "/withdrawals/all",
        }),
        getUserTotalWithdrawal: builder.query({
            query: () => "/withdrawals/total",
        }),
        getAllUserPlans: builder.query({
            query: () => "/plans",
        }),
        // New transfer routes
        transferFunds: builder.mutation({
            query: (transferData) => ({
                url: "/transfer/",
                method: "POST",
                body: transferData,
            }),
        }),
        checkUsername: builder.query({
            query: (username) =>
                `/transfer/check-username?username=${username}`,
        }),
        getUserTransfers: builder.query({
            query: () => `/transfer/all/`,
        }),
    }),
});

export const {
    useGetUserProfileQuery,
    useUpdateUserMutation,
    useDeleteUserProfileMutation,
    useChangeProfilePhotoMutation,
    useGetUserWalletQuery,
    useHandleUserDepositMutation,
    useGetAllUserDepositsQuery,
    useGetUserTotalDepositQuery,
    useHandleUserWithdrawalMutation,
    useGetAllUserWithdrawalsQuery,
    useGetUserTotalWithdrawalQuery,
    useGetAllUserPlansQuery,
    useGetAllReferralsQuery,
    useReinvestMutation,
    useTransferFundsMutation,
    useCheckUsernameQuery,
    useGetUserTransfersQuery,
} = userApiSlice;

export default userApiSlice;
