import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import InputScreen from "../src/screens/InputScreen";

export default function Index() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor="transparent" />
      <InputScreen />
    </SafeAreaProvider>
  );
}
