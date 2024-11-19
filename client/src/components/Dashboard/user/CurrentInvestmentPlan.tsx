import { FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import formatAmount from "../../../config/format";

const CurrentInvestmentPlan = ({ investmentPlan, profit }: any) => {
    // Check if `investmentPlan` is defined and has a valid `planName`
    const hasValidPlan =
        investmentPlan &&
        investmentPlan.planName &&
        investmentPlan.planName.length > 0;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            {hasValidPlan ? (
                <>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                        <FaDollarSign className="text-blue-600 mr-2" />
                        Current Investment Plan
                    </h2>
                    <div className="space-y-4">
                        {investmentPlan.planName && (
                            <p className="flex items-center text-gray-700">
                                <span className="font-semibold">
                                    Plan Name:
                                </span>
                                <span className="ml-2 text-gray-600">
                                    {investmentPlan.planName}
                                </span>
                            </p>
                        )}
                        {investmentPlan.initialInvestment != null && (
                            <p className="flex items-center text-gray-700">
                                <FaDollarSign className="text-green-500 mr-2" />
                                <span className="font-semibold">
                                    Investment Amount:
                                </span>
                                <span className="ml-2 text-gray-600">
                                    ${" "}
                                    {formatAmount(
                                        investmentPlan.initialInvestment,
                                    )}
                                </span>
                            </p>
                        )}
                        {investmentPlan.investmentDate && (
                            <p className="flex items-center text-gray-700">
                                <FaCalendarAlt className="text-blue-400 mr-2" />
                                <span className="font-semibold">
                                    Start Date:
                                </span>
                                <span className="ml-2 text-gray-600">
                                    {new Date(
                                        investmentPlan.investmentDate,
                                    ).toLocaleString()}
                                </span>
                            </p>
                        )}
                        {investmentPlan.endDate && (
                            <p className="flex items-center text-gray-700">
                                <FaCalendarAlt className="text-blue-400 mr-2" />
                                <span className="font-semibold">End Date:</span>
                                <span className="ml-2 text-gray-600">
                                    {new Date(
                                        investmentPlan.endDate,
                                    ).toLocaleString()}
                                </span>
                            </p>
                        )}
                        {investmentPlan.simulatedDays != 0 && (
                            <p className="flex items-center text-gray-700">
                                <FaCalendarAlt className="text-blue-400 mr-2" />
                                <span className="font-semibold">
                                    Days Gone:
                                </span>
                                <span className="ml-2 text-gray-600">
                                    {investmentPlan.simulatedDays}
                                </span>
                            </p>
                        )}
                        {profit != null && (
                            <p className="flex items-center text-gray-700">
                                <FaDollarSign className="text-yellow-500 mr-2" />
                                <span className="font-semibold">
                                    Profit Accumulated:
                                </span>
                                <span className="ml-2 text-gray-600">
                                    $
                                    {formatAmount(
                                        investmentPlan.profitAccumulated,
                                    )}
                                </span>
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center text-gray-500">
                    <p>No current investment plan.</p>
                </div>
            )}
        </div>
    );
};

export default CurrentInvestmentPlan;
