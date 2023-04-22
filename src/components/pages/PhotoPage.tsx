import React, { useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import Page from "./Page";
import { cameraOutline } from "ionicons/icons";
import usePhotoGallery from "../../hooks/usePhotoGallery";
import {ImageCropper} from "../molecules/ImageCropper";

const PhotoPage = () => {
  const { takePhoto } = usePhotoGallery();
  const [selectedImage, setSelectedImage] = useState<string>();

  const handleImageCrop = (croppedImage: string) => {
    // Handle the cropped image (e.g., save it or display it)
    console.log("Cropped image:", croppedImage);
    setSelectedImage(undefined);
  };

  const handleCancelCrop = () => {
    setSelectedImage(undefined);
  };

  const handleTakePhoto = async () => {
    const photo = await takePhoto();
    setSelectedImage(photo);
  };

  return (
    <Page title="Photo">
      <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton onClick={handleTakePhoto}>
          <IonIcon icon={cameraOutline} />
        </IonFabButton>
      </IonFab>
      <div className="flex items-center justify-center h-full">
        {selectedImage && (
          <ImageCropper
            imageSrc={selectedImage}
            onCrop={handleImageCrop}
            onCancel={handleCancelCrop}
          />
        )}
      </div>
    </Page>
  );
};

export default PhotoPage;
