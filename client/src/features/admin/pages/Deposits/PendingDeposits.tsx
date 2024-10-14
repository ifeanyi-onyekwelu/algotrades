import StatsSection from "../../../../components/Admin/StatsSection";
import { PendingDepositTable } from "../../../../components/Admin/Tables/PendingDepositdTable";
import { useGetAllPendingDepositsQuery } from "../../api/adminApiSlice";
import RefetchButton from "../../../../components/Admin/RefetchButton";

const PendingDeposits = () => {
    const {
        data: deposits,
        isLoading,
        error,
        refetch,
    } = useGetAllPendingDepositsQuery({});

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading deposits...</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen space-y-5">
            <StatsSection />
            <RefetchButton refetch={refetch} isLoading={isLoading} />
            <PendingDepositTable deposits={deposits.deposits} />
        </div>
    );
};

export default PendingDeposits;
