import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputScreen from "../src/screens/InputScreen";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <InputScreen />
    </SafeAreaView>
  );
}
