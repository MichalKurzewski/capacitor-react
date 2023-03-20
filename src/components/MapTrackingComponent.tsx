import { GoogleMap } from "@capacitor/google-maps";
import { useEffect, useRef, useState } from "react";
import { Geolocation, PositionOptions, Position } from "@capacitor/geolocation";

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  const [position, setPosition] = useState<Position | null>(null);
  const [map, setMap] = useState<GoogleMap | null>(null);

  useEffect(() => {
    async function createMap() {
      if (!mapRef.current) return;
      const initPosition = await Geolocation.getCurrentPosition();
      const map = await GoogleMap.create({
        id: "my-map",
        element: mapRef.current,
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        config: {
          center: {
            lat: initPosition.coords.latitude,
            lng: initPosition.coords.longitude,
          },
          zoom: 15,
        },
      });
      setMap(map);
    }
    const positionOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };
    const setWatch = async () => {
      await Geolocation.watchPosition(positionOptions, (position) => {
        setPosition(position);
      });
    };
    createMap();
    setWatch();
  }, []);

  useEffect(() => {
    async function updateMap() {
      if (!mapRef.current || !position) return;
      await map?.setCamera({
        coordinate: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
      await map?.addMarker({
        title: "My Location",
        coordinate: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    }
    if (position && map) {
      updateMap();
    }
  }, [position, map]);

  return (
    <div className="component-wrapper">
      <capacitor-google-map
        ref={mapRef}
        style={{
          display: "inline-block",
          width: "100%",
          height: 400,
        }}
      ></capacitor-google-map>
    </div>
  );
};

export default MyMap;
