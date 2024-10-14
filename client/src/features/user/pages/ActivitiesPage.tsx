import ActivitiesTable from "../../../components/Tables/ActivitesTable";
import Breadcrumb from "../../../components/common/Breadcrumbs";

const ActivitiesPage = () => {
    return (
        <div>
            <Breadcrumb dashboardUrl="" currentPage="Activities" />
            <ActivitiesTable />
        </div>
    );
};

export default ActivitiesPage;
