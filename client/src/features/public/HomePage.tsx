import Hero from "../../components/public/home/Hero.tsx";
import { HowToUse } from "../../components/public/home/HowToUse.tsx";
import WhyChooseUs from "../../components/public/home/WhyChooseUs.tsx";
import Testimonials from "../../components/public/Testimonials.tsx";

import OurPurpose from "../../components/public/home/OurPurpose.tsx";
import Overview from "../../components/public/home/Overview.tsx";
import GetStarted from "../../components/public/home/GetStarted.tsx";

export default function HomePage() {
    return (
        <div>
            <Hero />
            <HowToUse />
            <OurPurpose />
            <WhyChooseUs />
            <Overview />
            <Testimonials />
            <GetStarted />
        </div>
    );
}
