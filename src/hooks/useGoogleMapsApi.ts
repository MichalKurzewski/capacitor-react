import { useState, useEffect } from "react";

const useGoogleMapsApi = (apiKey: string) => {
  const [mapsApiLoaded, setMapsApiLoaded] = useState<boolean>(false);

  useEffect(() => {
    const handleScriptLoad = () => {
      setMapsApiLoaded(true);
    };

    const scriptElement = document.querySelector(
      "#google-maps-script"
    ) as HTMLScriptElement;

    if (!scriptElement) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = handleScriptLoad;
      document.head.appendChild(script);
    } else if (window.google) {
      setMapsApiLoaded(true);
    }
  }, [apiKey]);

  return { mapsApiLoaded };
};

export default useGoogleMapsApi;
