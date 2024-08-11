import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useGetUsersLiveLocation() {
  const [liveLocation, setLiveLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    const requestUserLocation = async () => {
      const { status, granted } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('location permission denied');
        return;
      }
      // const currentUserLocation = await Location.LocationGeofencingRegionState
      // const currentUserLocation = await Location.getCurrentPositionAsync();
      // console.log('currentUserLocation', currentUserLocation);
      // setUserLocation(currentUserLocation);

      const options: Location.LocationOptions = {
        distanceInterval: 10,
        timeInterval: 30 * 60 * 1000,
      };
      await Location.watchPositionAsync(options, (data) => setLiveLocation(data));
    };
    requestUserLocation();
  }, []);

  return { liveLocation };
}
