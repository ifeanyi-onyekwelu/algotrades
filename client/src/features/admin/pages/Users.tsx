import StatsSection from "../../../components/Admin/StatsSection";
import { UserTable } from "../../../components/Admin/Tables/UsersTable";
import { useGetAllUsersQuery } from "../api/adminApiSlice";
import RefetchButton from "../../../components/Admin/RefetchButton";

const Users = () => {
    const { data: users, isLoading, error, refetch } = useGetAllUsersQuery({});

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading users.</p>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col space-y-5">
            <StatsSection />
            <RefetchButton refetch={refetch} />
            <UserTable users={users?.users} />
        </div>
    );
};

export default Users;
