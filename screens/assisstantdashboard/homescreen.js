/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    FlatList, ActivityIndicator, RefreshControl, Modal,
    SafeAreaView,
} from 'react-native';
import styles from '../../styles/assisstantdirector/styles_homescreen';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/auth/authcontext';
import { useSociety } from '../../context/society/societycontext';
import { useNavigation } from '@react-navigation/native';
import { useEvents } from '../../context/events/eventcontext';
import EventCard from '../../components/assisstantdirector/EventCard';
import { ip } from '../../config';

const AssistantDashboard = () => {
    const navigation = useNavigation();
    const { events, fetchEvents, loadRequestedEvents } = useEvents();
    const { logout } = useAuth();
    const { items } = useSociety();

    const [searchMode, setSearchMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [showData, setShowData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [activeTab, setActiveTab] = useState('All event');
    const [selectedOption, setSelectedOption] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [eventlist, seteventlist] = useState([]);
    const [society, setsociety] = useState({});
    console.log(events);
    useEffect(() => {
        if (items && Array.isArray(items)) {
            const formattedItems = items.map(society => ({
                label: society.S_name,
                value: society.society_id,
            }));
            setDropdownItems(formattedItems);
        }
    }, [items]);
    useEffect(() => {
        seteventlist(events);
    }, [loadRequestedEvents]);

    const handleLogout = () => {
        logout();
        navigation.replace('login');
    };

    const loadEvents = async () => {
        setLoading(true);
        setErrorMessage('');
        setShowData(false);

        try {
            let filtered = [];

            if (searchQuery.trim()) {
                const res = await axios.get(`${ip}/api/events/eventname/${searchQuery}`);
                filtered = res?.data?.data || [];
            } else if (selectedOption !== null) {
                if (activeTab === 'All event') {
                    filtered = events.filter(e => e.society_id === selectedOption);
                } else {
                    const res = await axios.get(`${ip}/api/events/eventstatus/${activeTab}`);
                    filtered = (res?.data?.data || []).filter(e => e.society_id === selectedOption);
                }

                const soc = items.find(s => s.society_id === selectedOption);
                setsociety(soc || {});
            } else {
                const url = activeTab === 'All event'
                    ? `${ip}/api/events`
                    : `${ip}/api/events/eventstatus/${activeTab}`;
                const res = await axios.get(url);
                filtered = res?.data?.data || [];
            }

            seteventlist(filtered);
        } catch (error) {
            seteventlist([]);
            setErrorMessage('Some things went wrong!......................................');
        } finally {
            setTimeout(() => {
                setShowData(true);
                setLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        loadEvents();
    }, [activeTab, selectedOption, searchQuery]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchEvents();
        setSearchMode(false);
        setSearchQuery('');
        setActiveTab('All event');
        setSelectedOption(null);
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {searchMode ? (
                    <>
                        <TextInput
                            style={styles.searchInputHeader}
                            placeholder="Search events..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                            placeholderTextColor="#666"
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setSearchMode(false);
                                setSearchQuery('');
                            }}
                            style={styles.iconButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.headerText}>Assistant Director </Text>
                        <View style={styles.headerIcons}>
                            <TouchableOpacity
                                onPress={() => setSearchMode(true)}
                                style={styles.iconButton}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Ionicons name="search" size={24} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleLogout}
                                style={[styles.iconButton, { marginLeft: 15 }]}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Ionicons name="log-out-outline" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>


            {/* Tabs */}
            <View style={styles.tabContainer}>
                {['All event', 'Pending', 'Approved', 'Rejected'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Dropdown Button */}
            <TouchableOpacity style={styles.responsiveDropdownButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.responsiveDropdownText}>
                    {selectedOption
                        ? dropdownItems.find(item => item.value === selectedOption)?.label
                        : 'Select Society'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#333" />
            </TouchableOpacity>

            {/* Info Section */}
            {(Object.keys(society).length > 0 || eventlist.length > 0) && (
                <View style={styles.infoContainer}>
                    {society?.S_name && (
                        <>
                            <View style={styles.infoBox}>
                                <Text style={styles.infoText}>Society: {society.S_name}</Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={styles.infoText}>Budget: {society.budget}</Text>
                            </View>
                        </>
                    )}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>Total Events: {eventlist.length}</Text>
                    </View>
                </View>
            )}

            {/* Content */}
            {loading || !showData ? (
                <ActivityIndicator size="large" color="green" style={{ marginTop: 20 }} />
            ) : (
                <>
                    {errorMessage && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}
                    <FlatList
                        data={eventlist}
                        keyExtractor={(item) => item?.event_requisition_id?.toString()}
                        renderItem={({ item, index }) => <EventCard item={item} index={index} />}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        ListEmptyComponent={<Text style={styles.emptyText}>No events found.</Text>}
                        ListFooterComponent={<View style={styles.footerSpace} />}
                    />
                </>
            )}

            {/* Dropdown Modal */}
            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Choose a Society</Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={dropdownItems}
                            keyExtractor={(item) => item.value.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setSelectedOption(item.value);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.modalItemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default AssistantDashboard;
