/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Alert,
    RefreshControl,
    TextInput,
    Modal,
} from 'react-native';
import { useAuth } from '../../context/auth/authcontext';
import { useNavigation } from '@react-navigation/native';
import { useSociety } from '../../context/society/societycontext';
import EventCard from '../../components/ithead/EventCard';
import axios from 'axios';
import { ip } from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/ithead/style_ithead';

const Itheadhomescreen = () => {
    const [refresh, setrefresh] = useState(false);
    const [eventlist, seteventlists] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSociety, setSelectedSociety] = useState(null);
    const [activeTab, setActiveTab] = useState('Pending');
    const tabs = ['Pending', 'Rejected', 'Completed'];
    const { items } = useSociety();
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const [technical, settechnical] = useState(false);
    const [technicaldetails, settechnicaldetails] = useState('')

    const fetchEvents = async () => {
        let url = '';
        if (activeTab === 'Pending') {
            url = `${ip}/api/ithead/pending`;
        } else if (activeTab === 'Rejected') {
            url = `${ip}/api/ithead/rejected`;
        } else if (activeTab === 'Completed') {
            url = `${ip}/api/ithead/completed`;
        }

        try {
            setrefresh(true);
            const response = await axios.get(url);
            if (response.data.success) {
                const events = response.data.data;
                console.log(events);
                seteventlists(events);
                setEventData(events);
            } else {
                seteventlists([]);
                setEventData([]);
            }
        } catch (err) {
            seteventlists([])
            setEventData([]);
        } finally {
            setrefresh(false)
        }
    }

    const getEventsBySociety = async (id) => {
        const getEventBysocietyid = eventData.filter(e => e.society_id === id);
        seteventlists(getEventBysocietyid)
    };

    useEffect(() => {
        fetchEvents();
        setSelectedSociety(null);
    }, [activeTab]);

    const handleLogout = () => {
        logout();
        navigation.replace('login');
    };

    const handleSocietySelect = (society) => {
        setSelectedSociety(society);
        getEventsBySociety(parseInt(society.society_id));
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    IT Head
                </Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.tabContainer}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/* Dropdown */}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownTrigger}>
                <Text style={styles.dropdownTriggerText}>
                    {selectedSociety ? selectedSociety.S_name : 'Select Society'}
                </Text>
                <Icon name="chevron-down" size={16} color="#333" style={styles.dropdownIcon} />
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
                        Technical Requirement
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
                                            axios.post(`${ip}/api/logistics/details`, { details: technicaldetails })
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
            {/* Event List */}
            {
                items.length > 0 ? (
                    <FlatList
                        data={eventlist}
                        keyExtractor={(item) => item.event_requisition_id.toString()}
                        renderItem={({ item }) => <EventCard event={item} />}
                        contentContainerStyle={styles.eventList}
                        showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl onRefresh={fetchEvents} refreshing={refresh} />}
                        ListEmptyComponent={
                            <Text style={styles.emptyEventsText}>No events available.</Text>
                        }
                    />
                ) : null
            }

            {/* Modal for Dropdown */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Choose a Society</Text>
                        <FlatList
                            data={items}
                            keyExtractor={(item) => item.society_id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleSocietySelect(item)}
                                >
                                    <Text style={styles.modalItemText}>{item.S_name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalCloseButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    );
};

export default Itheadhomescreen;
