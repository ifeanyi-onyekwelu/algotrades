// CardList.js
import DashboardCard from "./Card";
import { GiWallet, GiProfit, GiPerson } from "react-icons/gi";
import { BsFillCloudDownloadFill, BsCloudUploadFill } from "react-icons/bs";
import formatAmount from "../../../config/format";

const CardList = ({
    balance,
    deposit,
    withdrawal,
    profit,
    referralBonus,
}: any) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 w-full py-4">
            <DashboardCard
                title="Account Balance"
                amount={formatAmount(balance)}
                icon={<GiWallet />}
            />
            <DashboardCard
                title="Your Deposit"
                amount={formatAmount(deposit)}
                icon={<BsFillCloudDownloadFill />}
            />
            <DashboardCard
                title="Your Withdrawal"
                amount={formatAmount(withdrawal)}
                icon={<BsCloudUploadFill />}
            />
            <DashboardCard
                title="Accumulated Interest/profit"
                amount={formatAmount(profit)}
                icon={<GiProfit />}
            />
            <DashboardCard
                title="Referral Bonus"
                amount={formatAmount(referralBonus)}
                icon={<GiPerson />}
            />
        </div>
    );
};

export default CardList;
