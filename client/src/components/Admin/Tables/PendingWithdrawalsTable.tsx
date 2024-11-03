import { Table } from "flowbite-react";
import { useHandleWithdrawalMutation } from "../../../features/admin/api/adminApiSlice";
import { Dropdown } from "flowbite-react";
import AlertMessage from "../../common/Snackbar";
import { useState } from "react";
import formatAmount from "../../../config/format";

export function PendingWithdrawalTable({ withdrawals }: any) {
    const [handleWithdrawal] = useHandleWithdrawalMutation();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");

    console.log(withdrawals);

    const handleAction = async (withdrawalId: any, action: string) => {
        try {
            const status = action === "Approve" ? "approved" : "rejected";
            await handleWithdrawal({ withdrawalId, status }).unwrap();

            setSuccessMessage(`Withdrawal ${action} successfully`);
            setStatusType("success");
            setShowAlert(true);
        } catch (error: any) {
            setErrorMessage(error?.data?.message);
            setShowAlert(true);
        }
    };

    return (
        <div className="overflow-x-auto">
            {withdrawals.length ? (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Currency</Table.HeadCell>
                        <Table.HeadCell>($) Amount</Table.HeadCell>
                        <Table.HeadCell>Wallet Address</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Profit/Balance</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {withdrawals.map((withdrawal: any) => (
                            <Table.Row
                                key={withdrawal._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {withdrawal.user?.username ??
                                        "Unknown User"}
                                </Table.Cell>
                                <Table.Cell>{withdrawal.currency}</Table.Cell>
                                <Table.Cell>
                                    {formatAmount(withdrawal.amount)}
                                </Table.Cell>
                                <Table.Cell>
                                    {withdrawal.walletAddress}
                                </Table.Cell>
                                <Table.Cell>{withdrawal.status}</Table.Cell>
                                <Table.Cell>
                                    {withdrawal.profitOrBalance}
                                </Table.Cell>
                                <Table.Cell>
                                    {new Date(
                                        withdrawal.createdAt,
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
                                                    withdrawal._id,
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
                                                    withdrawal._id,
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
