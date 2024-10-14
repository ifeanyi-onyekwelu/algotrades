import Breadcrumb from "../../../components/common/Breadcrumbs";
import KYCForm from "../../../components/Forms/KycVerificationForm";

const KycPage = () => {
    return (
        <div className="p-3">
            <Breadcrumb dashboardUrl="" currentPage="KYC" />
            <KYCForm />
        </div>
    );
};

export default KycPage;
