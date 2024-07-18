import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

import Today from "./Today";
import August from "./August";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomHeader({ navigation }) {
  return (
    <Animated.View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={24} color="#006b52" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Jalalia Sunni Masjid and Madrasha</Text>
    </Animated.View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true, // Enable gestures
        gestureDirection: "horizontal", // Optional: set gesture direction
      }}
    >
      <Stack.Screen name="Jalalia" component={Today} />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: ({ navigation }) => <CustomHeader navigation={navigation} />,
          drawerActiveTintColor: "#006b52", // Active link color
          drawerInactiveTintColor: "#f0f8ff", // Inactive link color
          drawerLabelStyle: {
            fontSize: 16, // Adjust the font size if needed
            fontWeight: "bold",
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f8ff",
  },
  menuButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "#006b52", // Added color property
    backgroundColor: "#f0f8ff",
  },
});
