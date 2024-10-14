import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout.tsx";
import HomePage from "../features/public/HomePage.tsx";
import CompanyPage from "../features/public/CompanyPage.tsx";
import PlansPage from "../features/public/PlansPage.tsx";
import ContactPage from "../features/public/ContactPage.tsx";
import CareerPage from "../features/public/CareerPage.tsx";
import CryptocurrencyPage from "../features/public/CryptocurrencyPage.tsx";
import RealEstatePage from "../features/public/RealEstatePage.tsx";
import RetirementPage from "../features/public/RetirementPage.tsx";
import ForexPage from "../features/public/ForexPage.tsx";
import GoldPage from "../features/public/GoldPage.tsx";
import AgriculturePage from "../features/public/AgriculturePage.tsx";
import StocksPage from "../features/public/StocksPage.tsx";

function PublicRoutes() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="about" element={<CompanyPage />} />
                <Route path="plans" element={<PlansPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="career" element={<CareerPage />} />
                <Route path="cryptocurrency" element={<CryptocurrencyPage />} />
                <Route path="forex" element={<ForexPage />} />
                <Route path="gold" element={<GoldPage />} />
                <Route path="agriculture" element={<AgriculturePage />} />
                <Route path="stocks" element={<StocksPage />} />
                <Route path="real-estate" element={<RealEstatePage />} />
                <Route path="retirement" element={<RetirementPage />} />
            </Route>
        </Routes>
    );
}

export default PublicRoutes;
