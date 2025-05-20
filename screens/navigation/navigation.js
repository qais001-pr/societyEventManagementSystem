/* eslint-disable jsx-quotes */
/* eslint-disable comma-dangle */
//
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../auth/loginScreen';
import SignupScreen from '../auth/SignupScreen';
import ChairpersonDashboard from '../societychairperson/ChairpersonDashboard';
import Forgotpassword from '../auth/Forgotpassword';
import Updatepassword from '../auth/updatepassword';
import AssisstantDirectorDashboard from '../assisstantdashboard/assisstantdirectordashboard';
import EventDetails from '../../components/assisstantdirector/Eventdetails';
import Homeaccounts from '../accountdepartment/homeaccounts';
import ApprovedEventDetails from '../../components/accountsdepartment/approvedevents';
import HomeStaffheadPage from '../staffhead/homescreen';
import Staffeventdetails from '../../components/staffhead/eventdetails';
import Itheadhomescreen from '../ithead/itheadhomescreen';
const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} options={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 100
        }} />
        <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: false, animation: 'ios_from_left', animationDuration: 1000 }} />
        <Stack.Screen name="forgotpassword" component={Forgotpassword} options={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 2000
        }} />
        <Stack.Screen name="updatepassword" component={Updatepassword} options={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 2000
        }} />
        <Stack.Screen name="chairpersondashboard" component={ChairpersonDashboard} options={{ headerShown: false, animation: 'slide_from_right', animationDuration: 1000 }} />
        <Stack.Screen name='assisstantdashboard' component={AssisstantDirectorDashboard}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 1000
          }} />
        <Stack.Screen name='eventdetails' component={EventDetails}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 1000
          }} />
        <Stack.Screen name='homeaccounts' component={Homeaccounts}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 1000
          }} />
        <Stack.Screen name='approvedeventdetails' component={ApprovedEventDetails}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 1000
          }} />
            <Stack.Screen name='homestaffheadpage' component={HomeStaffheadPage}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 1000
          }} />
              <Stack.Screen name='staffheadeventdetails' component={Staffeventdetails}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 1000
          }} />
            <Stack.Screen name='itdashboard' component={Itheadhomescreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 1000
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
