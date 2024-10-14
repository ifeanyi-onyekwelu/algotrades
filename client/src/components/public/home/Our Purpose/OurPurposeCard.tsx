const OurPurposeCard = ({ image, title, content }: any) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img
                className="w-full h-60 object-cover"
                src={image}
                alt="Handshake"
            />

            {/* Card Content */}
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-700 text-base">{content}</p>
            </div>
        </div>
    );
};

export default OurPurposeCard;
