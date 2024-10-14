import CardList from "../../../components/Dashboard/user/CardList";
import DashboardHeader from "../../../components/Dashboard/user/DashboardHeader";
import ReferralLink from "../../../components/Dashboard/user/ReferralLink";
import {
    useGetUserWalletQuery,
    useGetUserTotalDepositQuery,
    useGetUserTotalWithdrawalQuery,
    useGetUserProfileQuery,
} from "../api/userApiSlice";
import { Typography, Box, CircularProgress } from "@mui/material";

const DashboardPage = () => {
    const {
        data: walletData,
        error: walletError,
        isLoading: isWalletLoading,
    } = useGetUserWalletQuery({});
    const {
        data: totalDeposit = 0.0,
        error: totalDepositError,
        isLoading: isTotalDepositLoading,
    } = useGetUserTotalDepositQuery({});
    const {
        data: totalWithdrawal = 0.0,
        error: totalWithdrawalError,
        isLoading: isTotalWithdrawalLoading,
    } = useGetUserTotalWithdrawalQuery({});
    const {
        data: userProfileData = {},
        error: userProfileError,
        isLoading: isUserProfileLoading,
    } = useGetUserProfileQuery({});

    // Handling loading and error states
    if (
        isUserProfileLoading ||
        isWalletLoading ||
        isTotalDepositLoading ||
        isTotalWithdrawalLoading
    ) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (userProfileError) {
        return (
            <Box sx={{ padding: 4, color: "red" }}>
                <Typography variant="h6">
                    Error fetching user profile
                </Typography>
            </Box>
        );
    }

    if (totalDepositError) {
        return (
            <Box sx={{ padding: 4, color: "red" }}>
                <Typography variant="h6">
                    Error fetching total deposit data
                </Typography>
            </Box>
        );
    }

    if (totalWithdrawalError) {
        return (
            <Box sx={{ padding: 4, color: "red" }}>
                <Typography variant="h6">
                    Error fetching total withdrawal data
                </Typography>
            </Box>
        );
    }

    if (walletError) {
        return (
            <Box sx={{ padding: 4, color: "red" }}>
                <Typography variant="h6">Error fetching wallet data</Typography>
            </Box>
        );
    }

    return (
        <div className="md:p-3">
            <DashboardHeader username={userProfileData.user.username} />
            <CardList
                balance={walletData.wallet.balance}
                deposit={totalDeposit.totalAmount}
                withdrawal={totalWithdrawal.totalAmount}
                profit={walletData.wallet.profit}
            />
            <ReferralLink link={userProfileData.user.referralLink} />
        </div>
    );
};

export default DashboardPage;
