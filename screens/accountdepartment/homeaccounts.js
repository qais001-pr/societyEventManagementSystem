/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-quotes */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DropDownPicker from 'react-native-dropdown-picker';
import { useAuth } from '../../context/auth/authcontext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/accountdepartment/homeaccount';
import { ip } from '../../config';
import axios from 'axios';
import { useEvents } from '../../context/events/eventcontext';
import EventCard from '../../components/accountsdepartment/approvedeventcard';
import { useSociety } from '../../context/society/societycontext';
const Homeaccounts = () => {
    const { items, fetchData } = useSociety()
    const { events } = useEvents()
    const [eventlist, seteventlist] = useState([])
    const navigation = useNavigation()
    const { user, logout } = useAuth()
    const [dropdownItems, setDropdownItems] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [societies, setSocieties] = useState([])
    useEffect(() => {
        const fetchApprovedEvents = async () => {
            await fetchData()
            try {
                const response = await axios.get(`${ip}/api/events/department/approve/rejected`);
                if (response.data.success) {
                    seteventlist(response.data.data);
                }
            } catch (err) {
                // console.error('Failed to load department events:', err);
                Alert.alert(err.message)
            }
        };
        fetchApprovedEvents();
    }, []);

    // Load dropdown items from context
    useEffect(() => {
        if (Array.isArray(items) && items.length > 0) {
            const formattedItems = items.map(society => ({
                label: society.S_title,
                value: society.society_id,
            }));
            setDropdownItems(formattedItems);
        }
    }, [items]);

    // Load society events from `/api/societies/:id` when one is selected
    const loadEventsFromSociety = async () => {
        try {
            console.log('Selected Society ID:', selectedOption);
            const response = await axios.get(`${ip}/api/societies/${parseInt(selectedOption)}`);
            console.log('API Success:', response.data.success);

            if (response.data.success) {
                seteventlist(response.data.data);
            } else {
                seteventlist([]); // Clear if no success
            }

        } catch (err) {
            seteventlist([]);
        }
    };

    useEffect(() => {
        if (selectedOption) {
            loadEventsFromSociety();
            // Also update selected society's budget display
            const selected = items.find(s => s.society_id === selectedOption);
            if (selected) {
                setSocieties([selected]);
            }
        }
    }, [selectedOption, items]);
    const handleLogout = () => {
        logout()
        if (user) {
            navigation.replace('login')
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome, {user.name}</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Icon name="sign-out" size={24} color="#fff" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: 12,
                    gap: 10,
                }}
            >
                <View style={{ flex: 1 }}>
                    <DropDownPicker
                        open={dropdownOpen}
                        value={selectedOption}
                        items={dropdownItems}
                        setOpen={setDropdownOpen}
                        setValue={setSelectedOption}
                        setItems={setDropdownItems}
                        placeholder="Select Society"
                        style={{
                            borderColor: '#E0E0E0',
                            borderRadius: 10,
                            paddingVertical: 10,
                            paddingHorizontal: 12,
                            backgroundColor: '#fff',
                            zIndex: dropdownOpen ? 1000 : 0, // Ensure dropdown overlays
                        }}
                        dropDownContainerStyle={{
                            borderColor: '#E0E0E0',
                            borderRadius: 10,
                            backgroundColor: '#fff',
                        }}
                        textStyle={{ fontSize: 14, color: '#333' }}
                        placeholderStyle={{ color: '#999' }}
                    />
                </View>

                {societies.length > 0 && (
                    <View
                        style={{
                            flexShrink: 0,
                            paddingVertical: 10,
                            paddingHorizontal: 14,
                            backgroundColor: '#f0f9f2',
                            borderRadius: 10,
                            borderColor: '#cce5cc',
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 13, fontWeight: '600', color: '#2E8B57' }}>
                            Budget: {societies[0].budget}
                        </Text>
                    </View>
                )}
            </View>

            <View>
                {eventlist ? (
                    <FlatList
                        data={eventlist}
                        keyExtractor={(item) => item?.event_requisition_id?.toString() ?? null}
                        renderItem={({ item, index }) => <EventCard item={item} index={index} />}
                        contentContainerStyle={styles.cardList}
                        onEndReachedThreshold={0.5}
                        ListEmptyComponent={<Text style={styles.emptyText}>No events found.</Text>}
                        ListFooterComponent={<View style={{ marginBottom: "50%" }}></View>}
                    />
                ) : (
                    <ActivityIndicator size='small' />
                )}

            </View>
        </SafeAreaView>
    )

}


export default Homeaccounts