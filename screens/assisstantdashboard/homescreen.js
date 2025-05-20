/* eslint-disable no-shadow */
/* eslint-disable jsx-quotes */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
// AssistantDashboard.js
import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    FlatList, ActivityIndicator, RefreshControl,
} from 'react-native';
import styles from '../../styles/assisstantdirector/styles_homescreen';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/auth/authcontext';
import { useSociety } from '../../context/society/societycontext';
import { useNavigation } from '@react-navigation/native';
import { useEvents } from '../../context/events/eventcontext';
import EventCard from '../../components/assisstantdirector/EventCard';

const AssistantDashboard = () => {
    const navigation = useNavigation();
    const { events, fetchEvents, loadeventfromsearchquery } = useEvents();
    const { user, logout } = useAuth();
    const { items } = useSociety();
    const [dropdownItems, setDropdownItems] = useState([]);
    const [activeTab, setActiveTab] = useState('All event');
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [visibleEvents, setVisibleEvents] = useState(10);
    const [refreshing, setRefreshing] = useState(false);
    const [eventlist, seteventlist] = useState([]);
    const [society, setsociety] = useState([]);

    useEffect(() => {
        if (activeTab === 'All event') {
            fetchEvents();
            const societyevents = events.filter(e => e.society_id === selectedOption);
            seteventlist(societyevents);
            if (items && Array.isArray(items)) {
                const getsociety = items.find(s => s.society_id === selectedOption);
                setsociety(getsociety);
            }
            return;
        }

        const applyFilters = async () => {
            await fetchEvents();
            if (events && Array.isArray(events)) {
                const filtered = events.filter(
                    event => event.status === activeTab && event.society_id === selectedOption
                );
                seteventlist(filtered);
            }
            if (items && Array.isArray(items)) {
                const getsociety = items.find(s => s.society_id === selectedOption);
                setsociety(getsociety);
            }
        };

        if (selectedOption !== null) {
            applyFilters();
        }
    }, [selectedOption]);

    useEffect(() => {
        const load = async () => {
            setsociety([]);
            setSelectedOption(null);
            await fetchEvents();
            const updatedEvents = activeTab === 'All event'
                ? events
                : events.filter(event => event.status === activeTab);
            seteventlist(updatedEvents);
        };
        load();
    }, [activeTab]);

    useEffect(() => {
        if (items && Array.isArray(items)) {
            const formattedItems = items.map(society => ({
                label: society.S_title,
                value: society.society_id,
            }));
            setDropdownItems(formattedItems);
        }
    }, [items]);

    const loadMoreEvents = () => {
        setVisibleEvents(prev => prev + 10);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        setActiveTab('All event');
        setSelectedOption(null);
        await fetchEvents();
        seteventlist(events);
        setRefreshing(false);
    };

    const handleLogout = () => {
        logout();
        navigation.replace('login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome, {user?.name}</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

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

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search events..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={async () => {
                        setRefreshing(true);
                        await loadeventfromsearchquery(searchQuery);
                        seteventlist(events);
                        setRefreshing(false);
                    }}
                >
                    <Ionicons name="search" size={20} color="#fff" />
                </TouchableOpacity>
                <View style={styles.dropdownWrapper}>
                    <DropDownPicker
                        open={dropdownOpen}
                        value={selectedOption}
                        items={dropdownItems}
                        setOpen={setDropdownOpen}
                        setValue={setSelectedOption}
                        setItems={setDropdownItems}
                        placeholder="Select Society"
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                        textStyle={styles.dropdownText}
                    />
                </View>
            </View>

            {(society && Object.keys(society).length > 0) || (eventlist && eventlist.length > 0) ? (
                <View style={styles.infoContainer}>
                    {society && Object.keys(society).length > 0 && (
                        <>
                            <View style={styles.infoBox}>
                                <Text style={styles.infoText}>Society: {society.S_name}</Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={styles.infoText}>Budget: {parseInt(society.budget).toLocaleString('en-IN')}</Text>
                            </View>
                        </>
                    )}
                    {eventlist && eventlist.length > 0 && (
                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>Total Events: {eventlist.length}</Text>
                        </View>
                    )}
                </View>
            ) : null}

            {eventlist ? (
                <FlatList
                    data={eventlist.slice(0, visibleEvents)}
                    keyExtractor={(item) => item?.event_requisition_id?.toString() ?? Math.random().toString()}
                    renderItem={({ item, index }) => <EventCard item={item} index={index} />}
                    contentContainerStyle={styles.cardList}
                    onEndReached={loadMoreEvents}
                    onEndReachedThreshold={0.5}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={<Text style={styles.emptyText}>No events found.</Text>}
                    ListFooterComponent={<View style={styles.footerSpace} />}
                />
            ) : (
                <ActivityIndicator size='large' />
            )}
        </View>
    );
};

export default AssistantDashboard;
