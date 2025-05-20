/* eslint-disable radix */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import EventCard from '../../components/staffhead/eventcard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { styles as customStyles } from '../../styles/staffhead/style_homescreen';
import { ip } from '../../config';
import { useAuth } from '../../context/auth/authcontext';

const HomeStaffheadPage = () => {
  const navigation = useNavigation()
  const { user, logout } = useAuth();
  const [eventData, setEventData] = useState([]);
  const [resfresh, setrefresh] = useState(false)

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setrefresh(true)
        const response = await axios.get(`${ip}/api/societies/eventSociety`);
        if (response.data.success) {
          const data = response.data.data || [];
          setEventData(data);
        } else {
        }
      } catch (error) {
      } finally {
        setrefresh(false)
      }
    };

    fetchEventData();
  }, []);
  const handlelogout = async () => {
    try {
      await logout()
      navigation.replace('login')
    } finally {
    }
  }
  return (
    <SafeAreaView style={customStyles.body}>
      {/* Header */}
      <View style={customStyles.header}>
        <Text style={customStyles.headertext}>{user ? user.name : 'Username'}</Text>
        <TouchableOpacity style={customStyles.logout} onPress={handlelogout}>
          <Icon name="sign-out" size={25} style={customStyles.btnlogout} />
        </TouchableOpacity>
      </View>
      {/* Activitity Indicator */}
      <Modal visible={resfresh} transparent animationType="none">
        <View style={customStyles.modalBackground}>
          <View style={customStyles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color="green" />
          </View>
        </View>
      </Modal>
      {/* Event List */}
      <FlatList
        data={eventData}
        keyExtractor={(item) => `${parseInt(item.event_requisition_id)}`}
        renderItem={({ item }) => <EventCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>
            No events available.
          </Text>
        }
      />
    </SafeAreaView >
  );
};

export default HomeStaffheadPage;
