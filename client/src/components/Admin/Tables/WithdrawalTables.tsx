import { Table } from "flowbite-react";
import formatAmount from "../../../config/format";

export function AllWithdrawalTable({ withdrawals }: any) {
    return (
        <div className="overflow-x-auto">
            {withdrawals.length ? (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Currency</Table.HeadCell>
                        <Table.HeadCell>($) Amount</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Profit/Balance</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {withdrawals?.map((withdrawal: any) => (
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
                                <Table.Cell>{withdrawal.status}</Table.Cell>
                                <Table.Cell>
                                    {withdrawal.profitOrBalance}
                                </Table.Cell>
                                <Table.Cell>
                                    {new Date(
                                        withdrawal.createdAt,
                                    ).toLocaleDateString()}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <p>No records</p>
            )}
        </div>
    );
}
