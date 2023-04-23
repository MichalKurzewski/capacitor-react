import { useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import Page from "./Page";
import { cameraOutline } from "ionicons/icons";
import usePhotoGallery from "../../hooks/usePhotoGallery";
import { ImageCropper } from "../molecules/ImageCropper";
import PhotoGallery from "../molecules/PhotoGallery";
import { Photo } from "@capacitor/camera";

const PhotoPage = () => {
  const { photos, takePhoto, savePhoto, deletePhoto } = usePhotoGallery();
  const [imgSrc, setImgSrc] = useState<string>();
  const [originalPhoto, setOriginalPhoto] = useState<Photo | null>(null);

  const handleImageCrop = (croppedImage: string) => {
    console.log("Cropped image:", croppedImage);
    savePhoto({ ...originalPhoto!, webPath: croppedImage});
    setImgSrc(undefined);
  };

  const handleCancelCrop = () => {
    setImgSrc(undefined);
  };

  const handleTakePhoto = async () => {
    const photo = await takePhoto().catch((err) => console.error(err.message));
    if (photo) {
      setImgSrc(photo.webPath);
      setOriginalPhoto(photo);
    }
  };

  return (
    <Page title="Photo">
      <PhotoGallery photos={photos} deletePhoto={deletePhoto} />
      <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton onClick={handleTakePhoto}>
          <IonIcon icon={cameraOutline} />
        </IonFabButton>
      </IonFab>
      <div className="flex items-center justify-center h-full">
        {imgSrc && (
          <ImageCropper
            imageSrc={imgSrc}
            onCrop={handleImageCrop}
            onCancel={handleCancelCrop}
          />
        )}
      </div>
    </Page>
  );
};

export default PhotoPage;
