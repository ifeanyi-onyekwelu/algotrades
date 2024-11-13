import { Table } from "flowbite-react";
import formatAmount from "../../../config/format";

export function AllUserWalletTable({ wallets }: any) {
    return (
        <div className="overflow-x-auto">
            {wallets.length ? (
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Full Name</Table.HeadCell>
                        <Table.HeadCell>Email Address</Table.HeadCell>
                        <Table.HeadCell>Balance</Table.HeadCell>
                        <Table.HeadCell>Profit</Table.HeadCell>
                        <Table.HeadCell>Referral Bonus</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {wallets?.map((wallet: any) => (
                            <Table.Row
                                key={wallet._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {wallet.user?.fullName ?? "Unknown User"}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {wallet.user?.email ?? "Unknown User"}
                                </Table.Cell>
                                <Table.Cell>
                                    ${formatAmount(wallet.balance)}
                                </Table.Cell>
                                <Table.Cell>
                                    ${formatAmount(wallet.profit)}
                                </Table.Cell>
                                <Table.Cell>
                                    ${formatAmount(wallet.referralBonus)}
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
