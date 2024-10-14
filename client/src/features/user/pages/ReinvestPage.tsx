import Breadcrumb from "../../../components/common/Breadcrumbs";
import ReinvestForm from "../../../components/Forms/ReinvestForm";

const ReinvestPage = () => {
    return (
        <div>
            <Breadcrumb dashboard="/dashboard/me" currentPage="Reinvest" />
            <ReinvestForm />
        </div>
    );
};

export default ReinvestPage;
