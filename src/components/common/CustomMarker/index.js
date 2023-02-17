import React from "react";
import { StyleSheet } from "react-native";
import { Box, Center, Heading, Text, VStack } from "native-base";

const CustomMarker = (props) => {
  return (
    <VStack bg="transparent" rounded="md" overflow="visible" {...props}>
      <Center bg="black" rounded="md" px="3" py="2">
        <Heading size="xs" lineHeight={"xs"}>
          Order will be delivered here
        </Heading>
        <Text fontSize="xs" lineHeight={"xs"} opacity="60" fontWeight="light">
          Place the pin accurately on the map
        </Text>
      </Center>
      <Box style={styles.triangle} alignSelf="center" />
    </VStack>
  );
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "black",
    transform: [{ rotate: "180deg" }],
  },
});

export default CustomMarker;
