import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { useGesture } from "react-use-gesture";

import "react-image-crop/dist/ReactCrop.css";

interface ImageCropperProps {
  imageSrc: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  imageSrc,
  onCrop,
  onCancel,
}) => {
  const [crop, setCrop] = useState<Crop>(() => {
    const defaultCropSize = 200;
    const defaultCropPosition = {
      x: (window.innerWidth - defaultCropSize) / 2,
      y: (window.innerHeight - defaultCropSize) / 2,
    };

    return {
      unit: "px",
      x: defaultCropPosition.x,
      y: defaultCropPosition.y,
      width: defaultCropSize,
      height: defaultCropSize,
    };
  });

  const [croppedImage, setCroppedImage] = useState<string>();
  const imageRef = useRef<HTMLImageElement>(new Image());

  useEffect(() => {
    imageRef.current.src = imageSrc;
    imageRef.current.onload = () => {
      const initialCrop = createInitialCrop(imageRef.current);
      setCrop(initialCrop);
      const setInitialCroppedImage = async () => {
        const croppedDataURL = await getCroppedImageURL(initialCrop);
        setCroppedImage(croppedDataURL);
      };
      // Call the async function with the void operator
      void setInitialCroppedImage();
    };
  }, [imageSrc]);

  const createInitialCrop = (image: HTMLImageElement): Crop => {
    const minDimension = Math.min(image.width, image.height);
    const cropSize = minDimension * 0.95;

    return {
      unit: "px",
      x: (image.width - cropSize) / 2,
      y: (image.height - cropSize) / 2,
      width: cropSize,
      height: cropSize,
    };
  };
  const getCroppedImageURL = async (localCrop: Crop): Promise<string> => {
    if (!localCrop.width || !localCrop.height) return "";

    const pixelCrop: PixelCrop = {
      x: localCrop.x,
      y: localCrop.y,
      width: localCrop.width,
      height: localCrop.height,
      unit: "px",
    };

    const canvas = document.createElement("canvas");
    const scaleX = imageRef.current.width / imageRef.current.naturalWidth;
    const scaleY = imageRef.current.height / imageRef.current.naturalHeight;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    ctx?.drawImage(
      imageRef.current,
      pixelCrop.x / scaleX,
      pixelCrop.y / scaleY,
      pixelCrop.width / scaleX,
      pixelCrop.height / scaleY,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  const handleCropComplete = async (pixelCrop: PixelCrop) => {
    const croppedDataURL = await getCroppedImageURL(pixelCrop);
    setCroppedImage(croppedDataURL);
  };

  const bind = useGesture({
    onPinch: ({ event, da: [d, a], vdva: [vd, va], origin: [x, y], memo }) => {
      event.preventDefault();

      if (!memo) {
        memo = { initialWidth: crop.width, initialHeight: crop.height };
      }

      const newWidth = Math.max(50, memo.initialWidth * d);
      const newHeight = Math.max(50, memo.initialHeight * d);

      setCrop({
        ...crop,
        width: newWidth,
        height: newHeight,
      });

      return memo;
    },
  });
  return (
    <div>
      <ReactCrop
        crop={crop}
        onChange={(newCrop: Crop) => setCrop(newCrop)}
        onComplete={handleCropComplete}
      >
        <img
          src={imageSrc}
          alt="cropped"
          ref={imageRef}
          style={{ display: "block" }}
          {...bind()}
        />
      </ReactCrop>
      <button
        onClick={() => {
          if (croppedImage) {
            onCrop(croppedImage);
          }
        }}
      >
        Crop
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
