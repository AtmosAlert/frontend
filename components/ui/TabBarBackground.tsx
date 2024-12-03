// This is a shim for web and Android where the tab bar is generally opaque.

import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export default function TabBarBackground() {
  return (
    <BlurView tint="light" intensity={70} style={StyleSheet.absoluteFill} />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
