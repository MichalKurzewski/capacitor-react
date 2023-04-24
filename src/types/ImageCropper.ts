export interface IImageCropperProps {
  imageSrc: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
}
