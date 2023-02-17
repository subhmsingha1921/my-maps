import React, { useCallback } from "react";
import { Box, NativeBaseProvider, extendTheme, StatusBar } from "native-base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import EditAddressScreen from "./src/components/screens/EditAddressScreen";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Proximanova-Black": require("./assets/fonts/proximanova-black.otf"),
    "Proximanova-Extrabold": require("./assets/fonts/proximanova-extrabold.otf"),
    "Proximanova-Light": require("./assets/fonts/proximanova-light.otf"),
    "Proximanova-Medium": require("./assets/fonts/proximanova-medium.otf"),
    "Proximanova-Regular": require("./assets/fonts/proximanova-regular.otf"),
    "Proximanova-Semibold": require("./assets/fonts/proximanova-semibold.otf"),
    "Proximanova-Thin": require("./assets/fonts/proximanova-thin.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const theme = extendTheme({
    colors: {
      swiggyOrange: {
        400: "#FC8019",
      },
    },
    config: {
      initialColorMode: "dark",
    },
    fontConfig: {
      Proximanova: {
        100: {
          normal: "Proximanova-Thin",
        },
        200: {
          normal: "Proximanova-Thin",
        },
        300: {
          normal: "Proximanova-Light",
        },
        400: {
          normal: "Proximanova-Regular",
        },
        500: {
          normal: "Proximanova-Medium",
        },
        600: {
          normal: "Proximanova-Semibold",
        },
        700: {
          normal: "Proximanova-Extrabold",
        },
        800: {
          normal: "Proximanova-Extrabold",
        },
        900: {
          normal: "Proximanova-Black",
        },
      },
    },
    fonts: {
      heading: "Proximanova",
      body: "Proximanova",
      mono: "Proximanova",
    },
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <Box flex="1" bg="white" onLayout={onLayoutRootView}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <EditAddressScreen />
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
