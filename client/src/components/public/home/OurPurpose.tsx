import OurPurposeList from "./Our Purpose/OurPurposeList";

const OurPurpose = () => {
    return (
        <div className="py-16 px-2">
            <div className="flex md:flex-row flex-col sm:space-x-3 p-3">
                <div className="flex flex-col p-4 w-full sm:w-2/5 space-y-3 sm:space-y-5 py-5">
                    <h3>OUR PURPOSE</h3>
                    <p className="text-2xl sm:text-6xl font-semibold">
                        Our common Purpose is Creating opportunities to rise.
                    </p>
                </div>
                <div className="flex sm:p-2 md:space-x-3 w-full sm:w-3/5">
                    <div className="flex space-y-3 flex-col">
                        <OurPurposeList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurPurpose;
