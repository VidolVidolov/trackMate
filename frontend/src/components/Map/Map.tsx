import {
  APIProvider,
  AdvancedMarker,
  Map as GoogleMap,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

import pin from "assets/mapMarker.svg";
import { saveUserLocation } from "services/userService";

export const Map = () => {
  const [openInfoBox, setOpenInfoBox] = useState(false);

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const handleOpenInfoBox = () => setOpenInfoBox(true);
  const handleCloseInfoBox = () => setOpenInfoBox(false);

  useEffect(() => {
    const successCallback: PositionCallback = (position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setCurrentLocation({
        lat: location.latitude,
        lng: location.longitude,
      });
      saveUserLocation(location);
    };

    const errorCallback: PositionErrorCallback = (error) => {
      console.error("Error getting location:", error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  if (!currentLocation.lat && !currentLocation.lng) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <div className="w-screen h-screen">
        <GoogleMap
          defaultCenter={currentLocation}
          defaultZoom={18}
          mapId={import.meta.env.VITE_GOOGLE_MAP_STYLE_ID}
        >
          <AdvancedMarker
            position={currentLocation}
            onClick={handleOpenInfoBox}
          >
            <img src={pin} alt="Marker" />
          </AdvancedMarker>
          {openInfoBox && (
            <InfoWindow position={currentLocation} onClose={handleCloseInfoBox}>
              TEST
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </APIProvider>
  );
};
