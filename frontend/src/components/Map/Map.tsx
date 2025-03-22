import {
  APIProvider,
  AdvancedMarker,
  Map as GoogleMap,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useMemo, useState } from "react";

import pin from "assets/mapMarker.svg";
import { useStore } from "zustand";
import { useWebsocket } from "hooks/useWebsocket";
import { userStore } from "store/userStore";

export const Map = () => {
  const { userCurrentLocation } = useWebsocket();
  const [openInfoBox, setOpenInfoBox] = useState<number | null>(null);
  const { party, userProfile } = useStore(userStore);
  const userLocation = useMemo(() => {
    let location = { lat: 0, lng: 0 };
    if (party) {
      const memberLocation = party?.members.find(
        (member) => member?.id === userProfile?.id
      )?.lastKnownLocation;
      location = {
        lat: Number(memberLocation?.latitude ?? 0),
        lng: Number(memberLocation?.longitude ?? 0),
      };
    } else {
      location = {
        lat: userCurrentLocation?.latitude ?? 0,
        lng: userCurrentLocation?.longitude ?? 0,
      };
    }
    return location;
  }, [party, userCurrentLocation, userProfile?.id]);

  const handleOpenInfoBox = (id: number) => setOpenInfoBox(id);
  const handleCloseInfoBox = () => setOpenInfoBox(null);

  if (
    !userProfile?.id ||
    !userCurrentLocation?.latitude ||
    !userCurrentLocation?.latitude
  ) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <div className="w-screen h-screen">
        <GoogleMap
          defaultCenter={{
            lat: userLocation.lat,
            lng: userLocation.lng,
          }}
          defaultZoom={18}
          mapId={import.meta.env.VITE_GOOGLE_MAP_STYLE_ID}
        >
          {party ? (
            party?.members.map((member) => (
              <div key={member?.id}>
                <AdvancedMarker
                  position={{
                    lat: Number(member?.lastKnownLocation.latitude),
                    lng: Number(member?.lastKnownLocation.longitude),
                  }}
                  onClick={() =>
                    member?.id ? handleOpenInfoBox(member.id) : null
                  }
                >
                  <img src={pin} alt="Marker" />
                </AdvancedMarker>
                {openInfoBox === member?.id && (
                  <InfoWindow
                    position={{
                      lat: Number(member?.lastKnownLocation.latitude),
                      lng: Number(member?.lastKnownLocation.longitude),
                    }}
                    onClose={handleCloseInfoBox}
                  >
                    {member?.name}
                  </InfoWindow>
                )}
              </div>
            ))
          ) : (
            <div>
              <AdvancedMarker
                position={{
                  lat: userLocation.lat,
                  lng: userLocation.lng,
                }}
                onClick={() => handleOpenInfoBox(userProfile.id)}
              >
                <img src={pin} alt="Marker" />
              </AdvancedMarker>
              {openInfoBox && (
                <InfoWindow
                  position={{
                    lat: userLocation.lat,
                    lng: userLocation.lng,
                  }}
                  onClose={handleCloseInfoBox}
                >
                  {userProfile?.name}
                </InfoWindow>
              )}
            </div>
          )}
        </GoogleMap>
      </div>
    </APIProvider>
  );
};
