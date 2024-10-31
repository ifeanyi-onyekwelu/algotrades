import StatsSection from "../../../components/Admin/StatsSection";
import { AllUserWalletTable } from "../../../components/Admin/Tables/UserWalletTable";
import { useGetAllUserWalletsQuery } from "../api/adminApiSlice";

const AllUserWallets = () => {
    const { data: wallets, isLoading, error } = useGetAllUserWalletsQuery({});

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading deposits...</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col space-y-5">
            <StatsSection />

            <AllUserWalletTable wallets={wallets.wallets} />
        </div>
    );
};

export default AllUserWallets;
