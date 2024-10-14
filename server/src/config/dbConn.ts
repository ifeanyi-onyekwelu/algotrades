import insertPlans from "../middlewares/insertPlans";
import mongoose from "mongoose";

const dbConn = async () => {
    const CONN_STR =
        process.env.NODE_ENV === "production"
            ? process.env.CLOUD_DB_URI
            : process.env.LOCAL_DB_URI;

    try {
        await mongoose.connect(CONN_STR || "");
        insertPlans();
    } catch (error: any) {
        throw new Error(error);
    }
};

export default dbConn;
