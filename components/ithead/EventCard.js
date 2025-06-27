import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const EventCard = ({ event }) => {
  const naviagtion = useNavigation();
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, options);
  };

    const formatTime = (time) => {
        const cleanTime = time.replace(/Z$/, '');
        const formattedTime = new Date(cleanTime)
            .toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', hour12: true })
            .toLowerCase();
        return formattedTime;
    };

  return (
    <View style={styles.card}>
      <Text style={styles.eventName}>{event.event_name}</Text>
      <Text style={styles.description}>{event.event_description}</Text>

      <View style={styles.row}>
        <Icon name="calendar" size={16} color="#388e3c" />
        <Text style={styles.text}>
          {formatDate(event.event_start_date)} - {formatDate(event.event_end_date)}
        </Text>
      </View>

      <View style={styles.row}>
        <Icon name="clock-o" size={16} color="#388e3c" />
        <Text style={styles.text}>
          {formatTime(event.event_start_time)} - {formatTime(event.event_end_time)}
        </Text>
      </View>

      <View style={styles.row}>
        <Icon name="map-marker" size={16} color="#388e3c" />
        <Text style={styles.text}>{event.venue}</Text>
      </View>
      {/* Details Button */}
      <TouchableOpacity style={styles.detailsButton} onPress={() => naviagtion.navigate('ItEventdetails', { event: event })}>
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  eventName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  notesText: {
    marginLeft: 8,
    fontSize: 13,
    fontStyle: 'italic',
    color: '#666',
  },
  detailsButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#388e3c',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },

  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
