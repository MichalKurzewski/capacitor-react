import { IPhoto } from "../types/Photo";
import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const usePhotoGallery = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    console.log("%c%s", "color: #ff0000", cameraPhoto);
    const fileName = new Date().getTime() + ".jpeg";
  };
  const deletePhoto = async (fileName: string) => {};
  return {
    photos,
    takePhoto,
    deletePhoto,
  };
};

export default usePhotoGallery;
