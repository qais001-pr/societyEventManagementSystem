/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ip } from '../../config';


const Card = ({ item, onEventDeleted }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  let rejectedstatus = ""
  const formatTime = (time) => {
    const cleanTime = time.replace(/Z$/, '');
    const formattedTime = new Date(cleanTime).toLocaleTimeString('en-PK', {
      hour: '2-digit', minute: '2-digit', hour12: true,
    }).toLowerCase();
    return formattedTime;
  };

  const getStatus = () => {
    if (item.arstatus === "Rejected" || item.itheadstatus === 'Rejected' || item.staffheadstatus === 'Rejected' || item.eventstatus === "Rejected") {
      rejectedstatus = 'Rejected'
      return 'Rejected';
    }
    if (item.status === 'Pending') {
      return "Pending";
    }
    if (item.status === 'Approved') {
      return "Approved";
    }
    if (item.status === 'Completed') {
      return "Completed";
    }
  }

  const handleUpdate = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${ip}/api/societychairperson/event/${id}`);
      if (response.data && response.data.success && response.data.data) {
        const event = response.data.data;
        navigation.navigate('updateeventdetails', { event });

        console.log('Navigating with event:', event);
      }
      else {
        Alert.alert('Failed to delete the event.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while deleting.');
    } finally {
      setLoading(false);
    }
  }

  const handleDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${ip}/api/societychairperson/event/details/${id}`);
      if (response.data && response.data.success && response.data.data) {
        let event = response.data.data[0];
        console.log(event)
        navigation.navigate('SocietyEventDetails', event);
      }
      else {
        Alert.alert('Failed to delete the event.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while deleting.');
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete?", [
      { text: 'No', onPress: () => { } },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            setLoading(true);
            const response = await axios.delete(`${ip}/api/societychairperson/${id}`);
            if (response.data.success) {
              onEventDeleted();
            } else {
              Alert.alert('Failed to delete the event.');
            }
          } catch (error) {
            Alert.alert('Error', 'Something went wrong while deleting.');
          } finally {
            setLoading(false);
          }
        }
      }
    ]);
  };


  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        {/* Left: Event Info */}
        <View style={styles.eventInfo}>
          {/* Event Name */}
          <View style={styles.detailRow}>
            <Icon name="calendar" size={18} color="#333" style={styles.icon} />
            <Text style={styles.title}>{item.event_name}</Text>
          </View>

          {/* Venue */}
          <View style={styles.detailRow}>
            <Icon name="map-marker" size={18} color="#555" style={styles.icon} />
            <Text style={styles.text}>{item.venue}</Text>
          </View>

          {/* Date & Time */}
          <View style={styles.detailRow}>
            <Icon name="clock-o" size={18} color="#555" style={styles.icon} />
            <Text style={styles.text}>
              {new Date(item.event_start_date).toLocaleDateString().split('T')[0]} at {formatTime(item.event_start_time)}
            </Text>
          </View>

          {/* Status */}
          <View style={styles.detailRow}>
            <Icon
              name={item.status === "Completed" ? "check-circle" : "hourglass-half"}
              size={18}
              color={item.status === "Completed" ? "green" : "orange"}
              style={styles.icon}
            />
            <Text
              style={[
                styles.status,
                { color: item.status === "Completed" ? "green" : "orange" }
              ]}
            >
              {
                getStatus()}
            </Text>
          </View>
        </View>

        {/* Right: Action Buttons */}
        <View style={styles.buttonContainer}>
          {(item.status === "Pending") && (
            <TouchableOpacity onPress={() => { handleUpdate(item.event_requisition_id) }} style={styles.button}>
              <Icon name="pencil" size={18} color="#007bff" />
              <Text style={styles.buttonLabel}>Update</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => handleDetails(item.event_requisition_id)}
            style={styles.button}>
            <Icon name="info-circle" size={18} color="#28AFB0" />
            <Text style={styles.buttonLabel}>Details</Text>
          </TouchableOpacity>
          {(item.status === "Pending" || item.status === "Completed" || rejectedstatus === "Rejected" || item.status === 'Approved') && (
            <TouchableOpacity onPress={() => handleDelete(item.event_requisition_id)}
              style={styles.button}>
              <Icon name="trash" size={18} color="#dc3545" />
              <Text style={styles.buttonLabel}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
        {loading && (
          <Modal
            visible={loading}
            transparent
            animationType="fade"
          >
            <View style={styles.loadingOverlay}>
              <View style={styles.spinnerContainer}>
                <ActivityIndicator size="large" color="#2ecc71" />
                <Text style={styles.loadingText}>Loading event details...</Text>
              </View>
            </View>
          </Modal>
        )}

      </View>
    </View >
  );
};

export default Card;
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventInfo: {
    flex: 1,
    paddingRight: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  text: {
    fontSize: 14,
    color: '#444',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  spinnerContainer: {
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingHorizontal: 35,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: '500',
  },

});
