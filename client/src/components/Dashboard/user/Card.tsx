// DashboardCard.js
import { Card } from "@mui/material";

const DashboardCard = ({ title, amount, icon }: any) => {
    return (
        <Card className="p-7 rounded-lg bg-white flex items-center">
            <div className="flex items-center space-x-4 w-full">
                {/* Icon on the side */}
                <div className="text-emeraldGreen text-4xl bg-blue-100 p-3 rounded-full flex-shrink-0">
                    {icon}
                </div>

                {/* Text content */}
                <div className="flex flex-col">
                    <h4 className="text-lg font-medium text-gray-700">
                        {title}
                    </h4>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        ${amount}
                    </h2>
                </div>
            </div>
        </Card>
    );
};

export default DashboardCard;
