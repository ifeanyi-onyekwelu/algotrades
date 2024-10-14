"use client";

import { Table } from "flowbite-react";

export function InvestmentPlansTable({ plans }: any) {
    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Duration</Table.HeadCell>
                    <Table.HeadCell>Duration Type</Table.HeadCell>
                    <Table.HeadCell>Investment ($)</Table.HeadCell>
                    <Table.HeadCell>Profit ($)</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {plans.map((plan: any) => (
                        <Table.Row
                            key={plan._id}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {plan.name}
                            </Table.Cell>
                            <Table.Cell>{plan.duration}</Table.Cell>
                            <Table.Cell>{plan.durationType}</Table.Cell>
                            <Table.Cell>{plan.initialInvestment}</Table.Cell>
                            <Table.Cell>{plan.profit}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
