import Breadcrumb from "../../../components/common/Breadcrumbs";
import ReferralCard from "../../../components/Dashboard/user/AffiliateHeader";
import AffiliateTable from "../../../components/Tables/AffiliateTable";

const AffiliatePage = () => {
    return (
        <div className="p-3">
            <Breadcrumb currentPage="Affiliate" dashboardUrl="" />
            <ReferralCard />
            <AffiliateTable />
        </div>
    );
};

export default AffiliatePage;
