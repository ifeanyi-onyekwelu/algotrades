import { Dropdown } from "flowbite-react";
import { Table } from "flowbite-react";
import { useHandleDepositMutation } from "../../../features/admin/api/adminApiSlice";
import AlertMessage from "../../common/Snackbar";
import { useState } from "react";
import formatAmount from "../../../config/format";

export function PendingDepositTable({ deposits }: any) {
    const [handleDeposit] = useHandleDepositMutation();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");

    const handleAction = async (depositId: any, action: string) => {
        try {
            const status = action === "Approve" ? "approved" : "rejected";
            await handleDeposit({ depositId, status });
            setSuccessMessage(`Deposit ${action} successfully`);
            setStatusType("success");
            setShowAlert(true);
        } catch (error: any) {
            setErrorMessage(error?.data?.message);
            setShowAlert(true);
        }
    };

    return (
        <div className="overflow-x-auto">
            {deposits.length ? (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Cryptocurrency</Table.HeadCell>
                        <Table.HeadCell>Currency</Table.HeadCell>
                        <Table.HeadCell>($) Amount</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {deposits?.map((deposit: any) => (
                            <Table.Row
                                key={deposit._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {deposit.user?.username ?? "Unknown User"}
                                </Table.Cell>
                                <Table.Cell>
                                    {deposit.cryptocurrency}
                                </Table.Cell>
                                <Table.Cell>{deposit.currency}</Table.Cell>
                                <Table.Cell>
                                    {formatAmount(deposit.amount)}
                                </Table.Cell>
                                <Table.Cell>{deposit.status}</Table.Cell>
                                <Table.Cell>
                                    {new Date(
                                        deposit.createdAt,
                                    ).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    <Dropdown
                                        arrowIcon={true}
                                        inline
                                        label={"Action"}
                                    >
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleAction(
                                                    deposit._id,
                                                    "Approve",
                                                )
                                            }
                                        >
                                            Approve
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleAction(
                                                    deposit._id,
                                                    "Decline",
                                                )
                                            }
                                        >
                                            Decline
                                        </Dropdown.Item>
                                    </Dropdown>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <p>No records</p>
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
