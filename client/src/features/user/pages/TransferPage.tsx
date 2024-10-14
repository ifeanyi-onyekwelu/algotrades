import Breadcrumb from "../../../components/common/Breadcrumbs";
import TransferForm from "../../../components/Forms/TransferForm";

const TransferPage = () => {
    return (
        <div>
            <Breadcrumb dashboard="/dashboard/me" currentPage="Transfer" />
            <TransferForm />
        </div>
    );
};

export default TransferPage;
