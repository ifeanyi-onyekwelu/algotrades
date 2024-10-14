import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Divider } from "@mui/material";
import { FaQuoteLeft } from "react-icons/fa6";

import Testimonials from "../../assets/images/Man.jpeg";
import Testimonials2 from "../../assets/images/testimoials-1.jpeg";
import Testimonials3 from "../../assets/images/testimoials-2.jpeg";
import Testimonials4 from "../../assets/images/testimoials-3.jpeg";

const TestiMonials = () => {
    const testiMonials = [
        {
            name: "Jessica Lee",
            description:
                "Investing with Algotrades has transformed my financial future. Their expert guidance helped me grow my portfolio significantly in just one year.",
            address: "New York, NY, USA",
            img: Testimonials2,
        },
        {
            name: "Michael Johnson",
            description:
                "The team at Algotrades is incredibly knowledgeable and supportive. They helped me navigate the stock market and make informed decisions.",
            address: "San Francisco, CA, USA",
            img: Testimonials,
        },
        {
            name: "Emily Chen",
            description:
                "I was hesitant to invest at first, but the personalized approach from Algotrades made me feel confident. I've seen great returns on my investments!",
            address: "Chicago, IL, USA",
            img: Testimonials3,
        },
        {
            name: "David Patel",
            description:
                "Thanks to Algotrades, I've achieved financial independence sooner than I expected. Their insights and strategies are top-notch!",
            address: "Austin, TX, USA",
            img: Testimonials4,
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section
            id="testimonial"
            className="py-16 w-full overflow-x-hidden bg-no-repeat bg-cover"
            style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZGV8ZW58MHx8MHx8fDA%3D")`,
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="text-center mb-10">
                <h2 className="text-md text-gray-500 uppercase tracking-wide mb-4">
                    Why Choose Us
                </h2>
                <h1 className="text-5xl font-bold text-gray-800">
                    What Clients Say
                </h1>
            </div>

            <div className="slider-container py-12">
                <Slider {...settings} className="w-full">
                    {testiMonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="item p-6 flex justify-center"
                            data-aos="fade-up" // Add AOS animation
                            data-aos-duration="1000" // Animation duration
                        >
                            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 transform hover:scale-105 flex flex-col justify-center items-start">
                                <p className="text-gray-700 italic mb-4">
                                    <FaQuoteLeft className="inline text-4xl mx-2 text-primary" />
                                    {testimonial.description}
                                </p>
                                <Divider />
                                <div className="flex items-center justify-center mt-4">
                                    <img
                                        className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4 shadow-sm"
                                        src={testimonial.img}
                                        alt={testimonial.name}
                                    />
                                    <div>
                                        <h5 className="text-lg font-semibold text-gray-800">
                                            {testimonial.name}
                                        </h5>
                                        <small className="text-gray-500">
                                            {testimonial.address}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default TestiMonials;
