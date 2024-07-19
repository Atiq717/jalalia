import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

import Today from "./Today";
import August from "./August";
import September from "./September";
import October from "./October";
import November from "./November";
import December from "./December";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomHeader({ navigation }) {
  return (
    <Animated.View style={styles.headerContainer}>
      <Pressable
        onPress={() => navigation.toggleDrawer()}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={24} color="#006b52" />
      </Pressable>
      <Text style={styles.headerTitle}>Jalalia Sunni Masjid and Madrasha</Text>
    </Animated.View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="Today" component={Today} />
      <Stack.Screen name="August" component={August} />
      <Stack.Screen name="September" component={September} />
      <Stack.Screen name="October" component={October} />
      <Stack.Screen name="November" component={November} />
      <Stack.Screen name="December" component={December} />
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
          drawerActiveTintColor: "#006b52",
          drawerInactiveTintColor: "grey",
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="August" component={August} />
        <Drawer.Screen name="September" component={September} />
        <Drawer.Screen name="October" component={October} />
        <Drawer.Screen name="November" component={November} />
        <Drawer.Screen name="December" component={December} />
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
    color: "#006b52",
    backgroundColor: "#f0f8ff",
  },
});
