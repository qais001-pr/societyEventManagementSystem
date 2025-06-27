/* eslint-disable jsx-quotes */
/* eslint-disable react-hooks/exhaustive-deps */
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
  RefreshControl,
  TextInput,
} from 'react-native';
import EventCard from '../../components/staffhead/eventcard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { styles as customStyles } from '../../styles/staffhead/style_homescreen';
import { ip } from '../../config';
import { useAuth } from '../../context/auth/authcontext';
import { useSociety } from '../../context/society/societycontext';


const HomeStaffheadPage = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const { items } = useSociety();
  const [activeTab, setActiveTab] = useState('Pending');
  const tabs = ['Pending', 'Approved', 'Rejected'];
  const [eventData, setEventData] = useState([]);
  const [eventlist, setEventlists] = useState([]);
  const [resfresh, setrefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSociety, setSelectedSociety] = useState(null);
  const [technical, settechnical] = useState(false);
  const [technicaldetails, settechnicaldetails] = useState('')
  const fetchEventsByTabs = async () => {
    let url = '';
    if (activeTab === 'Pending') {
      url = `${ip}/api/staffhead/events/pending`;
    } else if (activeTab === 'Approved') {
      url = `${ip}/api/staffhead/events/approved`;
    } else if (activeTab === 'Rejected') {
      url = `${ip}/api/staffhead/events/rejected`;
    }

    try {
      setrefresh(true)
      const response = await axios.get(url);
      if (response.data.success) {
        const events = response.data.data;
        setEventData(events);
        setEventlists(events);
      } else {
        setEventData([])
        setEventlists([])
      }
    } catch (err) {
      setEventData([])
      setEventlists([])
    } finally {
      setrefresh(false)
    }
  }
  useEffect(() => {
    fetchEventsByTabs()
    setSelectedSociety(null)
  }, [activeTab])
  useEffect(() => {
    console.log(selectedSociety)
    if (selectedSociety) {
      const getEventByusingSocietyid = eventlist.filter(e => e.society_id === selectedSociety.society_id)
      setEventData(getEventByusingSocietyid)
    }
  }, [selectedSociety])
  const handlelogout = async () => {
    try {
      await logout();
      navigation.replace('login');
    } catch (error) { }
  };

  const handleSocietySelect = (society) => {
    setSelectedSociety(society);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={customStyles.body}>
      {/* Header */}
      <View style={customStyles.header}>
        <Text style={customStyles.headertext}>
          Staff Head Dashboard
        </Text>
        <TouchableOpacity style={customStyles.logout} onPress={handlelogout}>
          <Icon name="sign-out" size={25} style={customStyles.btnlogout} />
        </TouchableOpacity>
      </View>
      <View style={customStyles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[customStyles.tabButton, activeTab === tab && customStyles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[customStyles.tabText, activeTab === tab && customStyles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Dropdown Button */}
      <TouchableOpacity
        style={customStyles.dropdownTrigger}
        onPress={() => setModalVisible(true)}
      >
        <Text style={customStyles.dropdownText}>
          {selectedSociety ? selectedSociety.S_name : 'Select Society'}
        </Text>
        <Icon name="chevron-down" size={16} style={customStyles.dropdownIcon} />
      </TouchableOpacity>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        {/* Button to open modal */}
        <TouchableOpacity
          style={{
            height: 50,
            width: 220,
            backgroundColor: 'green',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => settechnical(true)}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Logistics Details
          </Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal visible={technical} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: '85%',
                backgroundColor: '#fff',
                borderRadius: 15,
                padding: 20,
                elevation: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 12,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Enter Technical Requirements
              </Text>

              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  height: 45,
                  paddingHorizontal: 10,
                  fontSize: 16,
                  marginBottom: 20,
                }}
                placeholder="Type here..."
                placeholderTextColor="#999"
                value={technicaldetails}
                onChangeText={settechnicaldetails}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginRight: 10,
                    backgroundColor: '#d9534f',
                  }}
                  onPress={() => {
                    settechnical(false);
                    settechnicaldetails('');
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 16 }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginLeft: 10,
                    backgroundColor: '#5cb85c',
                  }}
                  onPress={() => {
                    try {
                      axios.post(`${ip}/api/staffhead/events/details`, { details: technicaldetails })
                      settechnical(false)
                      settechnicaldetails('')
                    } catch (error) {

                    }
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 16 }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {/* Loading Modal */}
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
        refreshControl={<RefreshControl refreshing={resfresh} onRefresh={fetchEventsByTabs} />}
      />

      {/* Society Dropdown Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={customStyles.modalOverlay}>
          <View style={customStyles.modalContainer}>
            <Text style={customStyles.modalTitle}>Choose a Society</Text>
            <FlatList
              data={items}
              keyExtractor={(item) => item.society_id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={customStyles.modalItem}
                  onPress={() => handleSocietySelect(item)}
                >
                  <Text style={customStyles.modalItemText}>{item.S_name}</Text>
                </TouchableOpacity>
              )}

            />
            <TouchableOpacity
              style={customStyles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={customStyles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeStaffheadPage;
