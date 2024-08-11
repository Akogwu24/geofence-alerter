import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export default function useGetUsersLiveLocation() {
  const [liveLocation, setLiveLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    const requestUserLocation = async () => {
      const { status, granted } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Access not granted',
          'Location access is blocked. Please enable it in the app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );

        return;
      }

      const options: Location.LocationOptions = {
        distanceInterval: 1, //1 meter interval
        timeInterval: 5 * 60 * 1000, //5 minutes
      };
      await Location.watchPositionAsync(options, (data) => setLiveLocation(data));
    };
    requestUserLocation();
  }, []);

  return { liveLocation };
}
