import { useState } from "react";
import StatsSection from "../../../components/Admin/StatsSection";
import { UserTable } from "../../../components/Admin/Tables/UsersTable";
import { useGetAllUsersQuery } from "../api/adminApiSlice";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import RefetchButton from "../../../components/Admin/RefetchButton";

const Users = () => {
    const { data: users, isLoading, error, refetch } = useGetAllUsersQuery({});
    const [open, setOpen] = useState(true);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading users.</p>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col space-y-5">
            <Collapse in={open}>
                <Alert
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    To validate a pending deposit, navigate to the 'Pending
                    Deposits' page. Then, select the action dropdown and choose
                    either 'Approve' or 'Decline' for the deposit.
                </Alert>
            </Collapse>
            <StatsSection />
            <RefetchButton refetch={refetch} />
            <UserTable users={users?.users} />
        </div>
    );
};

export default Users;
