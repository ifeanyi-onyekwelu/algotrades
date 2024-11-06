import StatsSection from "../../../components/Admin/StatsSection";
import { useGetAllUsersQuery } from "../api/adminApiSlice";
import { InvestmentTable } from "../../../components/Admin/Tables/InvestmentsTable";

const Investments = () => {
    const { data: usersData, isLoading, error } = useGetAllUsersQuery({});

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading users.</p>;
    }

    const users =
        usersData?.users?.filter(
            (user: any) =>
                user.currentPlan?.planId != null &&
                user.currentPlan?.planName != null,
        ) || [];

    console.log(users);

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col space-y-5">
            <StatsSection />

            <InvestmentTable users={users} />
        </div>
    );
};

export default Investments;
