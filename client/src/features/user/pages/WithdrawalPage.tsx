import Breadcrumb from "../../../components/common/Breadcrumbs";
import WithdrawalFrom from "../../../components/Forms/WithdrawalForm";

const WithdrawalPage = () => {
    return (
        <div className="p-3">
            <Breadcrumb dashboardUrl="" currentPage="Withdraw" />
            <WithdrawalFrom />
        </div>
    );
};

export default WithdrawalPage;
