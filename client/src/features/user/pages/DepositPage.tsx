import DepositForm from "../../../components/Forms/DepositForm";
import CryptoReceiveCard from "../../../components/Dashboard/user/CrypoReceiveCard";
import Breadcrumb from "../../../components/common/Breadcrumbs";

const DepositPage = () => {
    return (
        <div className="p-3">
            <Breadcrumb dashboardUrl="" currentPage="Deposit" />
            <div className="block md:flex md:space-x-8 justify-between space-y-6 md:space-y-4">
                <DepositForm />
                <CryptoReceiveCard />
            </div>
        </div>
    );
};

export default DepositPage;
