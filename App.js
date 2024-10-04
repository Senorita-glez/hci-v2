import * as React from 'react';
import "global.css";
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider";
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icons

import Principal from './screens/principal'; // Importación de Principal
import second from './screens/second';
import UserProfile from './screens/third';
import TaskList from './screens/fourth';
import Pantalla1 from './screens/camera';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#369c94"
          inactiveColor="#23635e"
          barStyle={{ backgroundColor: '#67cbc3' }}
        >
          <Tab.Screen 
            name="Home" 
            component={Principal} 
            options={{
              tabBarLabel: 'Inicio',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }} 
          />
          <Tab.Screen 
            name="Maybe" 
            component={TaskList} 
            options={{
              tabBarLabel: 'Prompt',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="format-quote-close" color={color} size={26} />
              ),
            }} 
          />
          <Tab.Screen 
            name="Cam" 
            component={Pantalla1} 
            options={{
              tabBarLabel: null,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="camera" color={color} size={26} />
              ),
            }} 
          />
          <Tab.Screen 
            name="Inspire you" 
            component={Principal} 
            options={{
              tabBarLabel: 'Inspire',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="lightbulb-on-outline" color={color} size={26} />
              ),
            }} 
          />
          <Tab.Screen 
            name="Your creations" 
            component={UserProfile} 
            options={{
              tabBarLabel: 'Yours',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
