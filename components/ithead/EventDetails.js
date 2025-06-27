/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ip } from '../../config';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useSociety } from '../../context/society/societycontext';
import { SafeAreaView } from 'react-native-safe-area-context';

const ItEventDetails = ({ route }) => {
    const { items } = useSociety();
    const navigation = useNavigation();
    const [society, setSociety] = useState(null);
    const [technicalrequirements, setTechnicalRequirements] = useState('');
    const [loading, setLoading] = useState(false);
    const { event } = route.params;
    const currentDate = new Date().toISOString().split('T')[0];
    console.log(event);
    useEffect(() => {
        if (items && Array.isArray(items)) {
            const foundSociety = items.find(s => s.society_id === event.society_id);
            setSociety(foundSociety);
        }
    }, [items, event.society_id]);

    const getStatus = () => {
        if (event.status === 'Approved' && event.adstatus === 'Approved' && event.sfstatus === 'Approved' && event.itstatus === null) {
            return 'Pending';
        }
        if (event.status === 'Approved' && event.adstatus === 'Approved' && event.sfstatus === 'Approved' && event.itstatus === 'Completed') {
            return 'Completed';
        }
        if (event.status === 'Approved' && event.adstatus === 'Approved' && event.sfstatus === 'Approved' && event.itstatus === 'Rejected') {
            return 'Rejected';
        }
    };
    let status = getStatus();
    const getStatusColor = () => {
        switch (status.toLowerCase()) {
            case 'approved':
                return '#388e3c';
            case 'pending':
                return '#fdd835';
            case 'rejected':
                return '#d32f2f';
            case 'completed':
                return '#2196F3';
            default:
                return '#c8e6c9';
        }
    };


    const formatTime = (time) => {
        const cleanTime = time.replace(/Z$/, '');
        const formattedTime = new Date(cleanTime)
            .toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', hour12: true })
            .toLowerCase();
        return formattedTime;
    };



    const handleComplete = async () => {
        if (!technicalrequirements.trim()) {
            Alert.alert('Missing Info', 'Please enter a technical reason before rejecting.');
            return;
        }
        Alert.alert('Confirm', 'Are you sure you want to mark this event as completed?', [
            {
                text: 'Cancel',
            },
            {
                text: 'Confirm',
                onPress: async () => {
                    setLoading(true);
                    const payload = {
                        event_requisition_id: event.event_requisition_id,
                        review: technicalrequirements,
                        status: 'Completed',
                        society_id: event.society_id,
                        date: currentDate,
                    };
                    console.log(payload);
                    try {
                        const response = await axios.post(`${ip}/api/ithead/approvedrejected`, {
                            eventid: payload.event_requisition_id,
                            society_id: payload.society_id,
                            review: payload.review,
                            status: payload.status,
                            date: payload.date,
                        });
                        if (response.data.success) {
                            navigation.replace('itdashboard');
                        }
                    } catch (error) {
                    } finally {
                        setLoading(false);
                    }
                },
            },
        ]);
    };
    const handleReject = async () => {
        if (!technicalrequirements.trim()) {
            Alert.alert('Missing Info', 'Please enter a technical reason before rejecting.');
            return;
        }
        setLoading(true);
        const payload = {
            event_requisition_id: event.event_requisition_id,
            review: technicalrequirements,
            status: 'Rejected',
            society_id: event.society_id,
            date: currentDate,
        };
        console.log(payload);
        try {
            const response = await axios.post(`${ip}/api/ithead/approvedrejected`, {
                eventid: payload.event_requisition_id,
                society_id: payload.society_id,
                review: payload.review,
                status: payload.status,
                date: payload.date,
            });
            if (response.data.success) {
                navigation.replace('itdashboard');
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>{event.event_name}</Text>
                <Text style={styles.subtitle}>{event.venue}</Text>
            </View>

            <ScrollView style={styles.container}>
                {loading && (
                    <Modal visible transparent>
                        <View style={styles.modalBackground}>
                            <ActivityIndicator size="large" color="#4caf50" />
                            <Text style={styles.modalText}>Processing...</Text>
                        </View>
                    </Modal>
                )}

                <View style={styles.detailRow}>
                    {society && (
                        <>
                            <View style={styles.infoBlock}>
                                <Text style={[styles.infoText, { color: 'black' }]}>Society: {society.S_name}</Text>
                            </View>
                            <View style={styles.infoBlock}>
                                <Text style={[styles.infoText, { color: 'black' }]}>Budget: RS {society.budget}</Text>
                            </View>
                        </>
                    )}
                </View>

                <View style={styles.card}>
                    <View style={styles.statusBadge}>
                        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                        <Text style={[styles.statusText, { color: getStatusColor() }]}>{status}</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Event Details</Text>
                    <Text style={styles.description}>{event.event_description}</Text>

                    <View style={styles.detailRow}>
                        <Icon name="calendar-today" size={18} color="#2e7d32" />
                        <Text style={styles.detailText}>
                            {new Date(event.event_start_date).toLocaleDateString()} - {new Date(event.event_end_date).toLocaleDateString()}
                        </Text>
                        <Icon name="access-time" size={18} color="#2e7d32" />
                        <Text style={styles.detailText}>
                            {formatTime(event.event_start_time)} - {formatTime(event.event_end_time)}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Icon name="money" size={18} color="#2e7d32" />
                        <Text style={styles.detailText}>RS {event.budget}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Icon name="build" size={18} color="#2e7d32" />
                        <Text style={styles.detailText}>{event.resources || 'No resources specified'}</Text>
                    </View>

                    {event.notes && (
                        <View style={styles.detailRow}>
                            <Icon name="notes" size={18} color="#2e7d32" />
                            <Text style={styles.detailText}>{event.notes}</Text>
                        </View>
                    )}

                    <Text style={styles.sectionTitle}>Submission Details</Text>

                    <View style={styles.detailRow}>
                        <Icon name="event" size={18} color="#2e7d32" />
                        <Text style={styles.detailText}>
                            Submitted on {new Date(event.submission_date).toLocaleDateString()}
                        </Text>
                    </View>
                    {(status === 'Pending') && (
                        <View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Technical Requirement</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter the technical requirement e.g. multimedia support etc"
                                    multiline
                                    maxLength={400}
                                    value={technicalrequirements}
                                    onChangeText={setTechnicalRequirements}
                                />
                                <Text>{technicalrequirements.length} / 400</Text>
                            </View>
                            <View style={styles.actionGroup}>
                                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#4CAF50' }]} onPress={handleComplete}>
                                    <Icon name="check-circle" size={22} color="#fff" style={styles.actionIcon} />
                                    <Text style={styles.actionLabel}>Mark as Completed</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#f44336' }]} onPress={handleReject}>
                                    <Icon name="cancel" size={22} color="#fff" style={styles.actionIcon} />
                                    <Text style={styles.actionLabel}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: '#f5f5f5', flex: 1 },
    header: {
        padding: 24,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#388e3c',
        elevation: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#a5d6a7',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 18,
        marginTop: -10,
        padding: 18,
        elevation: 100,
    },
    statusBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
    statusDot: { width: 14, height: 14, borderRadius: 7, marginRight: 12 },
    statusText: { fontSize: 18, fontWeight: '600', color: '#388e3c', textTransform: 'capitalize' },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 16,
        borderBottomWidth: 3,
        borderBottomColor: '#388e3c',
        paddingBottom: 10,
        color: '#388e3c',
    },
    description: { fontSize: 16, color: 'black', lineHeight: 24, marginBottom: 16 },
    detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    detailText: { marginLeft: 14, color: 'black', fontSize: 16, fontWeight: '600', flex: 1 },
    inputContainer: { marginTop: 20 },
    inputLabel: { fontSize: 18, marginBottom: 8, color: '#388e3c', fontWeight: '600' },
    input: {
        backgroundColor: '#f1f8e9',
        borderColor: '#81c784',
        borderWidth: 1,
        borderRadius: 14,
        padding: 14,
        minHeight: 100,
        textAlignVertical: 'top',
        fontSize: 15,
        color: '#2e7d32',
    },
    infoBlock: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#e8f5e9',
        borderRadius: 10,
        marginVertical: 12,
    },
    infoText: { fontSize: 18, fontWeight: '600', color: '#388e3c' },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalText: { fontSize: 20, color: '#fff', fontWeight: '700', marginTop: 16 },
    actionGroup: {
        marginTop: 30,
        flexDirection: 'column',
        gap: 16,
    },

    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 14,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    actionIcon: {
        marginRight: 12,
    },

    actionLabel: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '700',
    },

});

export default ItEventDetails;
