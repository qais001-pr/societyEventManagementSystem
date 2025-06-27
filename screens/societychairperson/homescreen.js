/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChairpersonDashboard from './eventrequest';
import EventLists from './eventLists';

const Tab = createBottomTabNavigator();

const SocietyChairperson = () => {

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };



  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Request') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'home' : 'home-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'limegreen',
        tabBarStyle: isKeyboardVisible ? { display: 'none' } : {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 55,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: -3 },
          elevation: 30,
        },

        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Events" component={EventLists} />
      <Tab.Screen name="Request" component={ChairpersonDashboard} />
    </Tab.Navigator>
  );
};

export default SocietyChairperson;
