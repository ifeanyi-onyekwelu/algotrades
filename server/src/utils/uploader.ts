import { InternalServerError } from "./errors";
import { v2 as cloudinary } from "cloudinary";

const uploadImage = async (imagePath: string) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            unique_filename: true,
            overwrite: true,
            use_filename: true,
        });
        return result.url;
    } catch (err: any) {
        console.error("File upload error:", err);
        throw new InternalServerError(err.message);
    }
};

export default uploadImage;
