const StatCard = ({ title, value, icon }: any) => {
    return (
        <div className="flex flex-row space-x-5 md:w-fit w-full justify-between">
            <div className="flex flex-col">
                <h3 className="text-xl text-gray-500 font-light">{title}</h3>
                <span className="font-semibold text-2xl">{value}</span>
            </div>
            {icon && (
                <span className="text-2xl w-12 h-12 rounded-full bg-black text-lightGrey flex items-center justify-center">
                    {icon}
                </span>
            )}
        </div>
    );
};

export default StatCard;
