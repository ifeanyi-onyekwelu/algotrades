import { Table } from "flowbite-react";
import formatAmount from "../../../config/format";

export function InvestmentTable({ users }: any) {
    return (
        <div className="overflow-x-auto">
            {users ? (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Investment</Table.HeadCell>
                        <Table.HeadCell>Initial Investment</Table.HeadCell>
                        <Table.HeadCell>Start Date</Table.HeadCell>
                        <Table.HeadCell>End Date</Table.HeadCell>
                        <Table.HeadCell>Profit Accumulated</Table.HeadCell>
                        <Table.HeadCell>Days Gone</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {users.map((user: any) => (
                            <Table.Row
                                key={user._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.username}
                                </Table.Cell>
                                <Table.Cell>
                                    {user.currentPlan.planName}
                                </Table.Cell>
                                <Table.Cell>
                                    {formatAmount(
                                        user.currentPlan.initialInvestment,
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    {user.currentPlan.endDate
                                        ? new Date(
                                              user.currentPlan.investmentDate,
                                          ).toLocaleDateString()
                                        : "N/A"}
                                </Table.Cell>
                                <Table.Cell>
                                    {user.currentPlan.endDate
                                        ? new Date(
                                              user.currentPlan.endDate,
                                          ).toLocaleDateString()
                                        : "N/A"}
                                </Table.Cell>

                                <Table.Cell>
                                    $
                                    {formatAmount(
                                        user.currentPlan.profitAccumulated,
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    {user.currentPlan.simulatedDays}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <p>No users</p>
            )}
        </div>
    );
}
