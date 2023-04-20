import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import Page from "./Page";
import { cameraOutline } from "ionicons/icons";
import usePhotoGallery from "../../hooks/usePhotoGallery";
const PhotoPage = () => {
  const { takePhoto } = usePhotoGallery();
  return (
    <Page title="Photo">
      <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton
          onClick={() => {
            takePhoto();
          }}
        >
          <IonIcon icon={cameraOutline} />
        </IonFabButton>
      </IonFab>
      <div className="flex items-center justify-center h-full"></div>
    </Page>
  );
};

export default PhotoPage;
