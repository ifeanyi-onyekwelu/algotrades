import { Table } from "flowbite-react";

export function AllDepositTable({ deposits }: any) {
    return (
        <div className="overflow-x-auto">
            {deposits.length ? (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Cryptocurrency</Table.HeadCell>
                        <Table.HeadCell>Currency</Table.HeadCell>
                        <Table.HeadCell>Amount ($)</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
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
                                <Table.Cell>{deposit.amount}</Table.Cell>
                                <Table.Cell>{deposit.status}</Table.Cell>
                                <Table.Cell>
                                    {new Date(
                                        deposit.createdAt,
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
