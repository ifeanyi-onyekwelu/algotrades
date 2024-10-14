import StatsSection from "../../../components/Admin/StatsSection";
import { InvestmentPlansTable } from "../../../components/Admin/Tables/PlansTable";
import { useGetAllPlansQuery } from "../api/adminApiSlice";

const Plans = () => {
    const { data: plans, isLoading, error } = useGetAllPlansQuery({});

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading plans.</p>;
    }
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col space-y-5">
            <StatsSection />
            <InvestmentPlansTable plans={plans.plans} />
        </div>
    );
};

export default Plans;
