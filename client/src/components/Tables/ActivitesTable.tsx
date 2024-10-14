import { useState } from "react";
import {
    useGetAllUserDepositsQuery,
    useGetAllUserWithdrawalsQuery,
    useGetUserTransfersQuery, // <-- Import the new query
} from "../../features/user/api/userApiSlice";

const WalletTable = () => {
    const [activeTab, setActiveTab] = useState<string>("all");

    // Fetch deposits, withdrawals, and transfers
    const {
        data: deposits = { deposits: [] },
        error: depositsError,
        isLoading: depositsLoading,
    } = useGetAllUserDepositsQuery({});

    const {
        data: withdrawals = { withdrawals: [] },
        error: withdrawalsError,
        isLoading: withdrawalsLoading,
    } = useGetAllUserWithdrawalsQuery({});

    const {
        data: transfers = { transfers: [] }, // Fetching transfers
        error: transfersError,
        isLoading: transfersLoading,
    } = useGetUserTransfersQuery({});

    const depositsData = deposits?.deposits || [];
    const withdrawalsData = withdrawals?.withdrawals || [];
    const transfersData = transfers?.transfers || [];

    // Combine all transactions and add a 'type' for filtering
    const allTransactions = [
        ...depositsData.map((deposit: any) => ({
            ...deposit,
            type: "Deposit",
        })),
        ...withdrawalsData.map((withdrawal: any) => ({
            ...withdrawal,
            type: "Withdrawal",
        })),
        ...transfersData.map((transfer: any) => ({
            ...transfer,
            type: "Transfer", // <-- New transfer type
        })),
    ];

    const filteredTransactions = allTransactions.filter((transaction) => {
        if (activeTab === "all") return true;
        if (activeTab === "withdrawals")
            return transaction.type === "Withdrawal";
        if (activeTab === "deposits") return transaction.type === "Deposit";
        if (activeTab === "transfers") return transaction.type === "Transfer";
        return true;
    });

    // Determine the title based on the active tab
    const currentTabTitle =
        activeTab === "all"
            ? "All Transactions"
            : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

    if (depositsLoading || withdrawalsLoading || transfersLoading) {
        return <div className="text-gray-700">Loading...</div>;
    }

    if (depositsError || withdrawalsError || transfersError) {
        return <div className="text-red-500">Error fetching transactions!</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-xl font-bold text-gray-900 mb-4">Activities</h1>

            {/* Tabs */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4 sm:space-x-4 sm:flex-row sm:space-y-0 flex-wrap">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-4 py-2 rounded-md font-medium ${
                            activeTab === "all"
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveTab("withdrawals")}
                        className={`px-4 py-2 rounded-md font-medium ${
                            activeTab === "withdrawals"
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        Withdrawals
                    </button>
                    <button
                        onClick={() => setActiveTab("deposits")}
                        className={`px-4 py-2 rounded-md font-medium ${
                            activeTab === "deposits"
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        Deposits
                    </button>
                    <button
                        onClick={() => setActiveTab("transfers")} // Add transfers tab
                        className={`px-4 py-2 rounded-md font-medium ${
                            activeTab === "transfers"
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        Transfers
                    </button>
                </div>
            </div>

            {/* Dynamic Table Title */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {currentTabTitle}
            </h2>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-gray-900">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left">
                                Transaction ID
                            </th>
                            <th className="px-6 py-3 text-left">Type</th>
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-left">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-50">
                        {filteredTransactions.map((transaction, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200"
                            >
                                <td className="px-6 py-4">{transaction._id}</td>
                                <td className="px-6 py-4">
                                    {transaction.type}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(
                                        transaction.createdAt,
                                    ).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    {/* Status Button with Conditional Colors */}
                                    <span
                                        className={`px-4 py-2 rounded-md text-white font-semibold ${
                                            transaction.status === "successful"
                                                ? "bg-green-500"
                                                : transaction.status ===
                                                    "pending"
                                                  ? "bg-yellow-500"
                                                  : "bg-red-500"
                                        }`}
                                    >
                                        {transaction.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {transaction.amount} {transaction.currency}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WalletTable;
