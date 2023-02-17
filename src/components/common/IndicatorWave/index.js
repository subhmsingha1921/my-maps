import { StyleSheet } from "react-native";
import React from "react";
import { MotiView } from "moti";
import { Box } from "native-base";

const IndicatorWave = (props) => {
  return (
    <Box flex="1" justifyContent="center" alignItems="center" {...props}>
      <Box
        w="10px"
        h="10px"
        bg="orange.400"
        justifyContent="center"
        alignItems="center"
        rounded="full"
      >
        {[...Array(3).keys()].map((index) => {
          return (
            <MotiView
              from={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 15 }}
              transition={{
                type: "timing",
                duration: 2000,
                loop: true,
                repeatReverse: false,
              }}
              key={index}
              style={[
                StyleSheet.absoluteFillObject,
                styles.dot,
                {
                  backgroundColor: "#FFCD91",
                },
              ]}
            />
          );
        })}
        <Box w="10px" h="10px" bg="orange.400" rounded="full" />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "orange",
  },
});

export default IndicatorWave;
