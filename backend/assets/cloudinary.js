import { v2 as cloudinary } from 'cloudinary';


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET,
// });

cloudinary.config({
    cloud_name: 'dgsnff8tg',
    api_key: '268263978163867',
    api_secret: '_7_skmFqoph4rgl_vT3_6uUx32I'
});

export const uploadImageToCloudinary = async (image, folder = '') => {
    if (!image) {
        throw new Error("Image File Not Detected");
    }
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "suheer-images" + folder,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            timeout: 1200000,
            resource_type: 'auto'
        });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

    export const deleteImageToCloudinary = async (public_id) => {
        if (!public_id) {
            throw new Error("No Images Selected");
        }

        try {
            const result = await cloudinary.uploader.destroy(public_id, {
                type: "upload",
                resource_type: "image",
            });
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Image Was Not Deleted");
        }
    };