/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../../components/societychairperson/Card';
import axios from 'axios';
import { ip } from '../../config';
import { useSociety } from '../../context/society/societycontext';
import { useAuth } from '../../context/auth/authcontext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const EventLists = () => {
    const navigation = useNavigation();
    const { society_id, items } = useSociety();
    const { user, logout } = useAuth();

    const tabs = ['Pending', 'Rejected', 'Completed'];
    const [activeTab, setActiveTab] = useState('Pending');
    const [Society, SetSociety] = useState({});
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getSociety();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchEvents(activeTab);
        }, [activeTab])
    );

    const fetchEvents = async (tab) => {
        setError(null);
        setLoading(true);

        let url = '';
        if (tab === 'Pending') {
            url = `${ip}/api/societychairperson`;
        } else if (tab === 'Rejected') {
            url = `${ip}/api/societychairperson/rejected`;
        } else if (tab === 'Completed') {
            url = `${ip}/api/societychairperson/completed`;
        }

        try {
            const response = await axios.get(url);
            if (response.data.success) {
                const evts = response.data.result;
                const filtered = evts.filter(event => event.society_id === society_id);
                setEvents(filtered);
            } else {
                setError('Failed to load events');
            }
        } catch (err) {
            setError('Error fetching events');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const getSociety = () => {
        const society = items.filter(s => s.society_id === society_id);
        SetSociety(society);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchEvents(activeTab);
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
                <Text style={styles.headerText}>Society Chairperson</Text>
                <TouchableOpacity style={styles.iconContainer} onPress={handleLogout}>
                    <Icon name="sign-out" size={20} color="#fff" />
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

            <View style={styles.dropdown}>
                <Text style={styles.societyName}>{Society[0]?.S_name || 'Select Society'}</Text>
            </View>

            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            <Modal visible={loading} transparent={true} animationType="fade">
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingBox}>
                        <ActivityIndicator size="large" color="#4caf50" />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1, marginTop: 80 }}>
                <FlatList
                    data={events}
                    keyExtractor={item => item.event_requisition_id.toString()}
                    renderItem={({ item }) => (
                        <Card item={item} onEventDeleted={() => fetchEvents(activeTab)} />
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No events found.</Text>
                        </View>
                    }
                    contentContainerStyle={{ paddingBottom: 70 }}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2e7d32',
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 4,
    },
    headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    iconContainer: {
        backgroundColor: '#1b5e20',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f9f9f9',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
    activeTab: {
        backgroundColor: '#4caf50',
    },
    tabText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#fff',
        fontWeight: '700',
    },
    dropdown: {
        position: 'absolute',
        top: 135,
        left: 16,
        right: 16,
        zIndex: 10,
        bottom: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    societyName: {
        fontSize: 16,
        color: '#000',
    },
    errorContainer: {
        marginTop: 190,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#ffcdd2',
        borderRadius: 8,
        marginHorizontal: 16,
    },
    errorText: {
        color: '#b00020',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    emptyContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingBox: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 6,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});

export default EventLists;
