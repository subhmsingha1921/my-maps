import * as Location from "expo-location";
import { decode } from "@mapbox/polyline";

export const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  return location;
};

export const getDirections = async (startLoc, destinationLoc) => {
  try {
    const KEY = "AIzaSyCefhcV9-ujmM9sCEhlgvpgZAi6-RFOTxA";
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
    );
    let respJson = await resp.json();
    let points = decode(respJson.routes[0].overview_polyline.points);
    console.log(respJson);
    // console.log(points);

    let coords = points.map((point) => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });
    return coords;
  } catch (error) {
    console.log(error);
  }
};
