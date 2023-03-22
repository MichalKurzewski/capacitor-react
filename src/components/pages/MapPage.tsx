import { GoogleMap } from "@capacitor/google-maps";
import { useEffect, useRef, useState } from "react";
import { Geolocation, PositionOptions, Position } from "@capacitor/geolocation";
import Page from "./Page";

const MapPage: React.FC = (): JSX.Element => {
  return (
    <Page title="Map Tracker">
      <MapTrackingComponent />
    </Page>
  );
};

export const MapTrackingComponent: React.FC = (): JSX.Element => {
  const mapRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [map, setMap] = useState<GoogleMap | null>(null);
  const [timeStamp, setTimestamp] = useState<string>(new Date().toJSON());

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

    const destroyMap = async () => {
      await map?.destroy();
    };
    createMap();

    return () => {
      destroyMap();
      setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const positionOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 1000,
    };

    const setWatch = async () => {
      return await Geolocation.watchPosition(positionOptions, (position) => {
        setPosition(position);
      });
    };

    const settedWatchId = setWatch();
    const unWatch = async () => {
      const watchId = await settedWatchId;
      if (watchId !== null) {
        Geolocation.clearWatch({ id: watchId });
      }
    };
    return () => {
      unWatch();
    };
  }, []);

  useEffect(() => {
    async function updateMap() {
      if (!mapRef.current || !position) return;
      setTimestamp(new Date().toJSON());
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
    return () => {};
  }, [position, map]);

  return (
    <>
      <div className="h-full w-full flex flex-col">
        <capacitor-google-map
          ref={mapRef}
          style={{
            display: "inline-block",
            height: "100%",
            width: "100%",
            border: "red solid 1px",
          }}
        />

        <div className="m-3">Last update: {timeStamp}</div>
      </div>
    </>
  );
};

export default MapPage;
