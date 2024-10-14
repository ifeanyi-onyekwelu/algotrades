const Overview = () => {
    return (
        <div
            data-aos="fade-up" // Add AOS animation
            data-aos-duration="1000" // Animation duration
            className="w-full md:w-3/4 shadow-xl p-10 sm:p-16 text-center flex flex-col space-y-4 m-auto relative md:-top-20 top-0 bg-white"
        >
            <h2 className="text-sm">Overview</h2>
            <h1 className="text-3xl sm:text-5xl font-semibold">
                Start a Good Plan
            </h1>
            <p className="mb-5 text-left">
                Think about what you want, make the best out of it by starting
                with us today. We are always available to make the right choice
                for you.
            </p>
            <p className="text-left">
                Our experts are the best in everything. They are well trained in
                forex, cryptocurrency trading and also in giving investment
                advice.
            </p>
        </div>
    );
};

export default Overview;
