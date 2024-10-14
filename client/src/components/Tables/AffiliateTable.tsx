import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useGetAllReferralsQuery } from "../../features/user/api/userApiSlice";

const columns: GridColDef[] = [
    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email Address", width: 200 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function AffiliateTable() {
    const { data } = useGetAllReferralsQuery({});

    const referralsData = data?.referrals;

    // If the API data doesn't match the shape of `rows`, ensure the mapping is correct.
    const rows =
        referralsData?.map((referral: any, index: any) => ({
            id: referral.id || index,
            username: referral.username || index, // Use index as fallback if `id` is missing
            email: referral.email,
        })) || [];

    return (
        <Paper>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
