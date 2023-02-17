import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import CustomMarker from "../../common/CustomMarker";
import { getDirections, getLocation } from "../../../utils/functions";

const EditAddressScreen = () => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState({
    latitude: 24.82906,
    longitude: 92.751659,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });
  const [isAddressLoaded, setAddressLoaded] = useState(false);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    _getLocation();
  }, []);

  const _getLocation = useCallback(async () => {
    const response = await getLocation();
    if (!response) {
      return;
    }

    const newLocation = {
      ...marker,
      latitude: response.coords.latitude,
      longitude: response.coords.longitude,
    };
    setMarker(newLocation);
    mapRef.current.animateToRegion(newLocation, 1500);
  }, []);

  const _getCoordinates = useCallback(async (newRegion) => {
    const startLoc = `${marker.latitude},${marker.longitude}`;
    const destinationLoc = `${newRegion.latitude},${newRegion.longitude}`;
    const response = await getDirections(startLoc, destinationLoc);
    if (!response) {
      return;
    }
    setCoords(response);
  }, []);

  const _handleChangeRegion = useCallback(
    (newRegion) => {
      setMarker(newRegion);
      setAddressLoaded(!isAddressLoaded);
    },
    [isAddressLoaded]
  );

  return (
    <VStack flex="1" bg="white" alignItems="center">
      <Box
        width="full"
        height="74%"
        justifyContent="center"
        alignItems="center"
      >
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={marker}
          onRegionChangeComplete={_getCoordinates}
          provider={PROVIDER_GOOGLE}
        >
          {coords.length > 0 && <Polyline coordinates={coords} />}
        </MapView>
        <CustomMarker mt="-55" />
        <Button
          bg="white"
          shadow="2"
          rounded="2xl"
          position="absolute"
          bottom="8"
          alignSelf="center"
          leftIcon={
            <Icon
              as={MaterialCommunityIcons}
              name="crosshairs-gps"
              size="md"
              color="swiggyOrange.400"
            />
          }
          _pressed={{
            backgroundColor: "white",
            opacity: 0.7,
          }}
          onPress={_getLocation}
        >
          <Text color="swiggyOrange.400" fontSize="md" bold>
            LOCATE ME
          </Text>
        </Button>
      </Box>
      <VStack flex="1" width="full" p="4">
        <Text
          color="dark.400"
          fontSize="xs"
          letterSpacing="2xl"
          fontWeight="semibold"
          mb="3"
        >
          SELECT DELIVERY LOCATION
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            <Icon
              as={Ionicons}
              name="location-outline"
              size="md"
              color="swiggyOrange.400"
            />
            <Heading color="darkText" ml="1.5">
              Chirukandi
            </Heading>
          </HStack>
          {isAddressLoaded && (
            <Button
              px="2.5"
              py="1"
              bg="dark.800"
              rounded="lg"
              _pressed={{
                backgroundColor: "dark.800",
                opacity: 0.7,
              }}
            >
              <Text
                color="swiggyOrange.400"
                bold
                fontSize="xs"
                letterSpacing="xl"
              >
                CHANGE
              </Text>
            </Button>
          )}
        </HStack>
        <VStack px="1">
          <Skeleton
            h="3.5"
            isLoaded={isAddressLoaded}
            mt="1.5"
            rounded="xs"
            startColor="dark.800"
            endColor="dark.600"
          >
            <Text color="darkText" fontWeight="light">
              Chirukandi, Assam 788026, India
            </Text>
          </Skeleton>
          <Skeleton
            w="60%"
            h="3.5"
            isLoaded={isAddressLoaded}
            mt="1"
            rounded="xs"
            startColor="dark.800"
            endColor="dark.600"
          />
        </VStack>
        <Box flex="1" flexDirection="row" alignItems="flex-end">
          <Button
            width="full"
            bg="swiggyOrange.400"
            alignSelf="flex-end"
            rounded="md"
            py="3.5"
            isDisabled={!isAddressLoaded}
            _disabled={{
              opacity: 0.5,
            }}
            _pressed={{
              backgroundColor: "swiggyOrange.400",
              opacity: 0.7,
            }}
          >
            <Text bold letterSpacing="lg">
              CONFIRM LOCATION
            </Text>
          </Button>
        </Box>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default EditAddressScreen;
