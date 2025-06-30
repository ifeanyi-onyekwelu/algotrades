import { useState } from "react";
import {
    useDeleteUserMutation,
    useSuspendUserAccountMutation,
    useActivateUserAccountMutation,
} from "../../../features/admin/api/adminApiSlice";
import AlertMessage from "../../common/Snackbar";
import {
    FiTrash2,
    FiLock,
    FiUnlock,
    FiUser,
    FiMail,
    FiPhone,
    FiUserCheck,
    FiUserX,
} from "react-icons/fi";

export function UserTable({ users }: { users: any[] }) {
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");

    const [deleteUser] = useDeleteUserMutation();
    const [suspendUser] = useSuspendUserAccountMutation();
    const [activateUser] = useActivateUserAccountMutation();

    const handleAction = async (action: string, userId: string) => {
        try {
            let successMsg = "";

            switch (action) {
                case "delete":
                    await deleteUser({ userId });
                    successMsg = "User deleted successfully";
                    break;
                case "suspend":
                    await suspendUser({
                        userId,
                        reason: "Administrative action",
                    });
                    successMsg = "User suspended successfully";
                    break;
                case "activate":
                    await activateUser({ userId });
                    successMsg = "User activated successfully";
                    break;
                default:
                    throw new Error("Invalid action");
            }

            setSuccessMessage(successMsg);
            setStatusType("success");
            setShowAlert(true);
        } catch (error: any) {
            setErrorMessage(error?.data?.message || "An error occurred");
            setStatusType("error");
            setShowAlert(true);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    User Management
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {users.length} {users.length === 1 ? "user" : "users"} found
                </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                            >
                                User
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                            >
                                Contact
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                                            <FiUser className="text-white" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {user.fullName}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                @{user.username}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 dark:text-white">
                                        {user.email}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {user.phoneNumber}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.isSuspended ? (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                            Suspended
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                            Active
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        {!user.isSuspended ? (
                                            <button
                                                onClick={() =>
                                                    handleAction(
                                                        "suspend",
                                                        user._id,
                                                    )
                                                }
                                                className="flex items-center px-3 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                                title="Suspend user"
                                            >
                                                <FiLock className="mr-1" />
                                                <span>Suspend</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleAction(
                                                        "activate",
                                                        user._id,
                                                    )
                                                }
                                                className="flex items-center px-3 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                                                title="Activate user"
                                            >
                                                <FiUnlock className="mr-1" />
                                                <span>Activate</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() =>
                                                handleAction("delete", user._id)
                                            }
                                            className="flex items-center px-3 py-2 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-lg transition-colors"
                                            title="Delete user"
                                        >
                                            <FiTrash2 className="mr-1" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div
                                key={user._id}
                                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                                        <FiUser className="text-white text-xl" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="text-base font-medium text-gray-900 dark:text-white">
                                            {user.fullName}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            @{user.username}
                                        </div>

                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <FiMail className="mr-2 text-indigo-500" />
                                                <span className="truncate max-w-[120px]">
                                                    {user.email}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <FiPhone className="mr-2 text-indigo-500" />
                                                <span>{user.phoneNumber}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center">
                                            {user.isSuspended ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                                    <FiLock className="mr-1" />{" "}
                                                    Suspended
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                    <FiUserCheck className="mr-1" />{" "}
                                                    Active
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-4 flex space-x-3">
                                            {!user.isSuspended ? (
                                                <button
                                                    onClick={() =>
                                                        handleAction(
                                                            "suspend",
                                                            user._id,
                                                        )
                                                    }
                                                    className="flex items-center px-3 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex-1 justify-center"
                                                >
                                                    <FiLock className="mr-1" />
                                                    <span>Suspend</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleAction(
                                                            "activate",
                                                            user._id,
                                                        )
                                                    }
                                                    className="flex items-center px-3 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors flex-1 justify-center"
                                                >
                                                    <FiUnlock className="mr-1" />
                                                    <span>Activate</span>
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    handleAction(
                                                        "delete",
                                                        user._id,
                                                    )
                                                }
                                                className="flex items-center px-3 py-2 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-lg transition-colors flex-1 justify-center"
                                            >
                                                <FiTrash2 className="mr-1" />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700">
                                <FiUserX className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                No users
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                There are currently no users to display.
                            </p>
                        </div>
                    )}
                </div>
            </div>

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
