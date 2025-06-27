/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable no-bitwise */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import {
    View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert, Modal,
    RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/auth/authcontext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ip } from '../../config';
import axios from 'axios';

import EventCard from '../../components/accountsdepartment/approvedeventcard';
import { useSociety } from '../../context/society/societycontext';
import { localStyles, styles } from '../../styles/accountdepartment/homeaccount';

const Homeaccounts = () => {
    const { items, fetchData } = useSociety();
    const [eventlist, seteventlist] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('Pending');
    const tabs = ['Pending', 'Approved', 'Rejected'];
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [societies, setSocieties] = useState([]);
    console.log(selectedOption)
    useEffect(() => {
        if (Array.isArray(items) && items.length > 0) {
            const formattedItems = items.map(society => ({
                label: society.S_name,
                value: society.society_id,
            }));
            setDropdownItems(formattedItems);
        }
    }, [items]);

    useEffect(() => {
        fetchDatabyTabs();
    }, [activeTab]);

    useEffect(() => {
        if (selectedOption) {
            loadEventsFromSociety();
            const selected = items.find(s => s.society_id === selectedOption);
            console.log(selected)
            if (selected) {
                setSocieties([selected]);
            }
        }
    }, [selectedOption, items]);

    const fetchDatabyTabs = async () => {
        try {
            setLoading(true);
            let endpoint = '/api/accountsdepartment/pending';
            switch (activeTab) {
                case 'Approved':
                    endpoint = '/api/accountsdepartment/approved';
                    break;
                case 'Rejected':
                    endpoint = '/api/accountsdepartment/rejected';
                    break;
                default:
                    endpoint = '/api/accountsdepartment/pending';
            }

            const response = await axios.get(`${ip}${endpoint}`);
            if (response.data.success) {
                setAllEvents(response.data.data);
                seteventlist(response.data.data);
            } else {
                setAllEvents([]);
                seteventlist([]);
            }
        } catch (err) {
            setAllEvents([]);
            seteventlist([]);
        } finally {
            setLoading(false);
        }
    };

    const loadEventsFromSociety = () => {
        console.log(allEvents);
        const getEventsBySociety = allEvents.filter(e => e.society_id === selectedOption);
        console.log(getEventsBySociety)
        seteventlist(getEventsBySociety);
    };

    const handleLogout = () => {
        logout();
        if (user) {
            navigation.replace('login');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Accounts Department</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Icon name="sign-out" size={24} color="#fff" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="green" />
                        <Text style={{ color: 'green', marginTop: 5 }}>Please Wait</Text>
                    </View>
                </View>
            </Modal>

            <View style={styles.tabContainer}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                        onPress={() => {
                            setSelectedOption(null);
                            setActiveTab(tab);
                        }}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={localStyles.dropdownRow}>
                <TouchableOpacity
                    style={localStyles.dropdownButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={localStyles.dropdownButtonText}>
                        {selectedOption
                            ? dropdownItems.find(item => item.value === selectedOption)?.label
                            : 'Select Society'}
                    </Text>
                    <Icon name="caret-down" size={16} color="#333" />
                </TouchableOpacity>

                {societies.length > 0 && (
                    <View style={localStyles.budgetBox}>
                        <Text style={localStyles.budgetText}>
                            Budget: {societies[0].budget}
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.listContainer}>
                <FlatList
                    data={eventlist}
                    keyExtractor={(item, index) =>
                        item?.event_requisition_id?.toString() || `key-${index}`
                    }
                    renderItem={({ item, index }) => (
                        <EventCard item={item} index={index} />
                    )}
                    contentContainerStyle={styles.cardList}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchDatabyTabs} />}
                    ListEmptyComponent={<Text style={styles.emptyText}>No events found.</Text>}
                    ListFooterComponent={<View style={{ marginBottom: 20 }} />}
                />
            </View>

            {/* Modal Dropdown */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={localStyles.modalOverlay}>
                    <View style={localStyles.modalContainer}>
                        <Text style={localStyles.modalTitle}>Choose a Society</Text>
                        <FlatList
                            data={dropdownItems}
                            keyExtractor={(item) => item.value.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={localStyles.modalItem}
                                    onPress={() => {
                                        setSelectedOption(item.value);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={localStyles.modalItemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={localStyles.closeModalButton}
                        >
                            <Text style={localStyles.closeModalText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    );
};

export default Homeaccounts;
