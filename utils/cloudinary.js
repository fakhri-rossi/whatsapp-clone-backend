const _cloudinary = require("cloudinary").v2;

const cloudinary = () => {
  _cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  return _cloudinary;
};

const uploadToCloudinary = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary().uploader.upload(
      image,
      { upload_preset: "chat_app" },
      (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      }
    );
  });
};

module.exports = {
  uploadToCloudinary,
  cloudinary,
};
