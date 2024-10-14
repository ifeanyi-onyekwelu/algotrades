// CardList.js
import DashboardCard from "./Card";
import { GiWallet, GiProfit } from "react-icons/gi";
import { BsFillCloudDownloadFill, BsCloudUploadFill } from "react-icons/bs";

const CardList = ({ balance, deposit, withdrawal, profit }: any) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 w-full p-4">
            <DashboardCard
                title="Account Balance"
                amount={balance}
                icon={<GiWallet />}
            />
            <DashboardCard
                title="Your Deposit"
                amount={deposit}
                icon={<BsFillCloudDownloadFill />}
            />
            <DashboardCard
                title="Your Withdrawal"
                amount={withdrawal}
                icon={<BsCloudUploadFill />}
            />
            <DashboardCard
                title="Accumulated Interest/profit"
                amount={profit}
                icon={<GiProfit />}
            />
        </div>
    );
};

export default CardList;
