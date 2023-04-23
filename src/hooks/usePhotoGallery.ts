import { IPhoto } from "../types/Photo";
import { useEffect, useState } from "react";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { isPlatform } from "@ionic/react";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";

const PHOTOS_PREF_KEY = "photos";

const usePhotoGallery = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key: PHOTOS_PREF_KEY });
      const photosInPreferences: IPhoto[] = value ? JSON.parse(value) : [];

      if (!isPlatform("hybrid")) {
        for (let photo of photosInPreferences) {
          const file = await Filesystem.readFile({
            path: photo.filePath,
            directory: Directory.Data,
          });
          photo.webViewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }
      setPhotos(photosInPreferences);
    };

    loadSaved();
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      Preferences.set({ key: PHOTOS_PREF_KEY, value: JSON.stringify(photos) });
    }
  }, [photos]);

  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    return cameraPhoto;
  };

  const savePhoto = async (photo: Photo) => {
    const fileName = new Date().getTime() + ".jpeg";
    let base64data: string;
    if (isPlatform("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64data = file.data;
    } else {
      base64data = await base64FromPath(photo.webPath!);
    }
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      directory: Directory.Data,
      data: base64data,
    });
    const savedPhoto = (): IPhoto => {
      if (isPlatform("hybrid")) {
        return {
          filePath: savedFile.uri,
          webViewPath: photo.webPath,
        };
      }
      return {
        filePath: fileName,
        webViewPath: photo.webPath,
      };
    };
    setPhotos((photos) => [...photos, savedPhoto()]);
  };

  const deletePhoto = async (fileName: string) => {
    setPhotos(photos.filter((photo) => photo.filePath !== fileName));
    await Filesystem.deleteFile({
      path: fileName,
      directory: Directory.Data,
    });
  };

  return {
    photos,
    takePhoto,
    savePhoto,
    deletePhoto,
  };
};

export default usePhotoGallery;

async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("method did not return a string");
      }
    };

    reader.readAsDataURL(blob);
  });
}
