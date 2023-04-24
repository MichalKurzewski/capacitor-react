import { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { IImageCropperProps } from "../../types/ImageCropper";

const ImageCropperEasy: React.FC<IImageCropperProps> = ({
  imageSrc,
  onCrop,
  onCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());

  useEffect(() => {
    imageRef.current.src = imageSrc;
  }, [imageSrc]);

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImageURL = async (localCrop: Area) => {
    if (!localCrop.width || !localCrop.height) return "";

    const canvas = document.createElement("canvas");
    canvas.width = localCrop.width;
    canvas.height = localCrop.height;
    const ctx = canvas.getContext("2d");

    ctx?.drawImage(
      imageRef.current,
      localCrop.x,
      localCrop.y,
      localCrop.width,
      localCrop.height,
      0,
      0,
      localCrop.width,
      localCrop.height
    );

    return await canvas.toDataURL("image/jpeg");
  };

  const handleCrop = async () => {
    if (croppedAreaPixels) {
      const croppedImageURL = await getCroppedImageURL(croppedAreaPixels);
      onCrop(croppedImageURL);
    }
  };

  return (
    <div>
      <Cropper
        cropShape="round"
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-4 p-4">
        <button
          className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center"
          onClick={handleCrop}
        >
          Crop
        </button>
        <button
          className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImageCropperEasy;
