import { Table } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import { useDeleteUserMutation } from "../../../features/admin/api/adminApiSlice";
import AlertMessage from "../../common/Snackbar";
import { useState } from "react";

export function UserTable({ users }: any) {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [deleteUser] = useDeleteUserMutation();

    const handleAction = async (userId: any) => {
        try {
            await deleteUser({ userId });

            setSuccessMessage(`User deleted successfully`);
            setStatusType("success");
            setShowAlert(true);
        } catch (error: any) {
            setErrorMessage(error?.data);
            setShowAlert(true);
        }
    };
    return (
        <div className="overflow-x-auto">
            {users.length ? (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Full Name</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Email Address</Table.HeadCell>
                        <Table.HeadCell>Phone Number</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {users.map((user: any) => (
                            <Table.Row
                                key={user._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.fullName}
                                </Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.phoneNumber}</Table.Cell>
                                <Table.Cell>
                                    <Dropdown
                                        arrowIcon={true}
                                        inline
                                        label={"Action"}
                                    >
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleAction(user._id)
                                            }
                                        >
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <p>No users</p>
            )}

            <AlertMessage
                errorMessage={errorMessage}
                successMessage={successMessage}
                statusType={statusType}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
        </div>
    );
}
