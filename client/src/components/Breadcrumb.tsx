import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

export default function Breadcrumb({ label, content }: any) {
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
        });
    }, []);

    return (
        <div
            className="py-12 sm:py-28 bg-cover bg-no-repeat"
            style={{
                backgroundPosition: "bottom",
                backgroundImage: `url("https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZGV8ZW58MHx8MHx8fDA%3D")`,
                backgroundAttachment: "fixed",
            }}
        >
            <div className="container p-6 mt-10 flex flex-col justify-center items-center">
                <div className="w-full sm:w-3/4 bg-primary py-12 sm:py-24 px-12 text-center opacity-80">
                    <h3
                        className="text-3xl sm:text-7xl text-white font-bold m-0"
                        data-aos="fade-up"
                    >
                        {label}
                    </h3>
                    <p
                        className="text-md sm:text-lg text-center text-white"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
}
