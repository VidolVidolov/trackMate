import { useCallback, useEffect, useState } from "react";

import { PartyDTO } from "types/Party";
import { io } from "socket.io-client";
import { useStore } from "zustand";
import { userStore } from "store/userStore";

const socket = io(import.meta.env.VITE_BACKEND_WEBSOCKET_URL);
export const useWebsocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { party, setParty, userProfile } = useStore(userStore);
  const [userCurrentLocation, setUserCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  const onPartyUpdate = useCallback(
    (value: PartyDTO) => {
      setParty(value);
    },
    [setParty]
  );

  useEffect(() => {
    if (party) {
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("onPartyUpdate", onPartyUpdate);
    }

    return () => {
      if (party) {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("onPartyUpdate", onPartyUpdate);
      }
    };
  }, [party, onPartyUpdate]);

  useEffect(() => {
    const successCallback: PositionCallback = (position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setUserCurrentLocation(location);
      socket.emit("onPartyUpdate", {
        userId: userProfile?.id,
        location,
        partyId: party?.id,
      });
    };

    const errorCallback: PositionErrorCallback = (error) => {
      console.error("Error getting location:", error);
    };

    let watchId: number;
    if (userProfile?.id) {
      watchId = navigator.geolocation.watchPosition(
        successCallback,
        errorCallback
      );
    }

    return () => navigator.geolocation.clearWatch(watchId);
  }, [party?.id, userProfile?.id]);

  return { isConnected, userCurrentLocation };
};
