import { useNavigate } from "react-router-dom";

const DashboardHeader = ({ username }: any) => {
    const navigate = useNavigate();

    const navigateToPlans = () => navigate("/plans");
    const navigateToWithdraw = () => navigate("/dashboard/withdraw");

    return (
        <div className="flex flex-col justify-between p-4 rounded-lg mb-6">
            <div>
                <p className="text-gray-600 mt-1 text-md md:text-xl">
                    Welcome back <span className="font-bold">{username}</span>,
                    always keep your login details private. Do not reveal it to
                    anyone. We will never ask for your login details.
                </p>
            </div>

            <div className="flex space-x-3 mt-3 justify-start">
                <button
                    className=" text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-emeraldGreen hover:text-white transition duration-150 border border-emeraldGreen"
                    onClick={navigateToPlans}
                >
                    Package Options $
                </button>
                <button
                    className="bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150"
                    onClick={navigateToWithdraw}
                >
                    Withdraw
                </button>
            </div>
        </div>
    );
};

export default DashboardHeader;
