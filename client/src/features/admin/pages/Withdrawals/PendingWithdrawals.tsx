import StatsSection from "../../../../components/Admin/StatsSection";
import { PendingWithdrawalTable } from "../../../../components/Admin/Tables/PendingWithdrawalsTable";
import { useGetAllPendingWithdrawalsQuery } from "../../api/adminApiSlice";
import RefetchButton from "../../../../components/Admin/RefetchButton";
const PendingWithdraw = () => {
    const {
        data: withdrawals,
        isLoading,
        error,
        refetch,
    } = useGetAllPendingWithdrawalsQuery({});

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading withdrawals...</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col space-y-5">
            <StatsSection />
            <RefetchButton refetch={refetch} isLoading={isLoading} />
            <PendingWithdrawalTable withdrawals={withdrawals.withdrawals} />
        </div>
    );
};

export default PendingWithdraw;
