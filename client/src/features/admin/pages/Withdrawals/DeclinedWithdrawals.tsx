import StatsSection from "../../../../components/Admin/StatsSection";
import { AllWithdrawalTable } from "../../../../components/Admin/Tables/WithdrawalTables";
import { useGetAllRejectedWithdrawalsQuery } from "../../api/adminApiSlice";
import RefetchButton from "../../../../components/Admin/RefetchButton";
const DeclinedWithdrawals = () => {
    const {
        data: withdrawals,
        isLoading,
        error,
        refetch,
    } = useGetAllRejectedWithdrawalsQuery({});

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading withdrawals...</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col space-y-5">
            <StatsSection />
            <RefetchButton refetch={refetch} isLoading={isLoading} />
            <AllWithdrawalTable withdrawals={withdrawals.withdrawals} />
        </div>
    );
};

export default DeclinedWithdrawals;
