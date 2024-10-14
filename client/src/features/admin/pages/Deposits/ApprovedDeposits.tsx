import StatsSection from "../../../../components/Admin/StatsSection";
import { AllDepositTable } from "../../../../components/Admin/Tables/DepositsTable";
import { useGetAllApprovedDepositsQuery } from "../../api/adminApiSlice";
import RefetchButton from "../../../../components/Admin/RefetchButton";

const ApprovedDeposits = () => {
    const {
        data: deposits,
        isLoading,
        error,
        refetch,
    } = useGetAllApprovedDepositsQuery({});

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading deposits...</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col space-y-5">
            <StatsSection />
            <RefetchButton refetch={refetch} isLoading={isLoading} />
            <AllDepositTable deposits={deposits?.deposits} />
        </div>
    );
};

export default ApprovedDeposits;
