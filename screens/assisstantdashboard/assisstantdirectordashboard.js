/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-quotes */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AssistantDashboard from './homescreen';
import Createsocieties from './createsocieties';
const Tab = createBottomTabNavigator();

const AssisstantDirectorDashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Add Society') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: '#green',          // active icon & text color
        tabBarInactiveTintColor: 'lighgreen',          // inactive icon & text color
        tabBarStyle: {
          position: 'absolute',
          bottom: '0%',
          backgroundColor: '#ffffff',             // white background
          borderTopLeftRadius: 20,               // rounded corners
          borderTopRightRadius: 20,
          height: "7%",                            // make it taller
          paddingBottom: 10,                     // extra bottom padding
          shadowColor: '#000',                   // subtle shadow
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          elevation: 100,                         // shadow for Android
        },
        tabBarLabelStyle: {
          fontSize: 15,
          color: 'green',                          // smaller font
          fontWeight: '600',                     // semi-bold
        },
        headerShown: false,                      // hide header if needed
      })}
    >
      <Tab.Screen name='Home' component={AssistantDashboard} />
      <Tab.Screen name='Add Society' component={Createsocieties} />
    </Tab.Navigator>
  );
};

export default AssisstantDirectorDashboard;
