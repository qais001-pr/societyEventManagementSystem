/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */

import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { localStyles } from '../../styles/staffhead/style_eventcard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const EventCard = ({ item }) => {
    const navigation = useNavigation();

    return (
        <View style={[localStyles.itemBox, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View style={{ flex: 1 }}>
                <Text style={localStyles.itemTitle}>Title: {item.event_name}</Text>
                <Text style={localStyles.itemDetail}>Venue: {item.venue}</Text>
                <Text style={localStyles.itemDetail}>
                    Date: {item.event_start_date ? new Date(item.event_start_date).toLocaleDateString() : 'N/A'}
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('staffheadeventdetails', { item })}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f0f0f0',
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                }}
            >
                <Icon name="arrow-right" size={16} color="black" style={{ marginRight: 6 }} />
                <Text style={{ color: 'black', fontSize: 16 }}>Details</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EventCard;
