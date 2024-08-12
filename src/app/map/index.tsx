import { StyleSheet, Alert, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Circle, LatLng, MapPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { isPointWithinRadius } from 'geolib';
import useGetUsersLiveLocation from '../../hooks/useGetUsersLiveLocation';
import tw from 'twrnc';
import { COLORS } from '../../utils/constatnts';

const Home = () => {
  const { liveLocation } = useGetUsersLiveLocation();
  const [selectedGeoFencePoint, setSelectedGeoFencePoint] = useState<LatLng>();
  const [isUserWithinGeofencedArea, setIsUserWithinGeofencedArea] = useState(false);
  const mapRef = useRef<MapView>(null);

  const handleMapPress = (event: MapPressEvent) => {
    if (!selectedGeoFencePoint) {
      setSelectedGeoFencePoint(event.nativeEvent.coordinate);
    }
  };

  useEffect(() => {
    if (!liveLocation?.coords || !selectedGeoFencePoint) return;

    // checks if user is within a radius of 500m from the goefence zone
    const checkIfUserIsWithinGeofenceArea = () => {
      const result = isPointWithinRadius(liveLocation?.coords, selectedGeoFencePoint, 400);
      setIsUserWithinGeofencedArea(result);
    };

    checkIfUserIsWithinGeofenceArea();
  }, [liveLocation?.coords.latitude, liveLocation?.coords.latitude]);

  useEffect(() => {
    if (selectedGeoFencePoint && isUserWithinGeofencedArea) {
      Alert.alert('You are within your zone');
    } else if (selectedGeoFencePoint && !isUserWithinGeofencedArea) {
      Alert.alert('You are outside your zone');
    }
  }, [isUserWithinGeofencedArea]);

  const handleUpdateGeofencePoint = () => {
    Alert.alert('Update Geofence Area', 'Are you sure you want to change your tracking zone?', [
      { text: 'Cancel', style: 'destructive' },
      { text: 'Yes', style: 'default', onPress: () => setSelectedGeoFencePoint(undefined) },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        onPress={handleMapPress}
        region={{
          latitude: (liveLocation?.coords.latitude as number) || 0,
          longitude: (liveLocation?.coords.longitude as number) || 0,
          latitudeDelta: 0.0502,
          longitudeDelta: 0.0201,
        }}
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        followsUserLocation
        zoomEnabled
        style={StyleSheet.absoluteFill}
      >
        <Marker
          coordinate={{
            latitude: (liveLocation?.coords.latitude as number) || 0,
            longitude: (liveLocation?.coords.longitude as number) || 0,
          }}
          title={'User'}
          description={'This is my current location'}
        />

        {selectedGeoFencePoint && (
          <Circle
            center={{
              latitude: Number(selectedGeoFencePoint?.latitude),
              longitude: Number(selectedGeoFencePoint?.longitude),
            }}
            radius={400}
            strokeColor='rgba(0, 150, 255, 0.5)'
            fillColor='rgba(0, 150, 255, 0.2)'
          />
        )}
      </MapView>
      <View style={tw`px-3 z-10 absolute bottom-10 right-0 mb-14`}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleUpdateGeofencePoint}
          style={tw` h-[50px] w-[50px] rounded-full bg-[${COLORS.primary}] justify-center items-center`}
        >
          <Image
            style={tw`w-[20px] h-[20px] rounded-full`}
            source={require('../../../assets/images/world-map.jpg')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
