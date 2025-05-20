/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
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
import axios from 'axios';
import { ip } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { useSociety } from '../../context/society/societycontext';
const EventDetails = ({ route }) => {
    const { items } = useSociety();
    const navigation = useNavigation();
    const [society, setsociety] = useState([]);
    const currentDate = new Date().toISOString().split('T')[0];
    const { event } = route.params;
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectionInput, setShowRejectionInput] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (items && Array.isArray(items)) {
            const getsociety = items.find(s => s.society_id === event.society_id);
            setsociety(getsociety);
        }
    }, []);

    const handleApprove = async () => {
        if (showRejectionInput) {
            setShowRejectionInput(false)
            return
        }

        const payload = {
            event_requisition_id: event.event_requisition_id,
            review: '',
            status: event.status,
            date: currentDate,
        };

        setLoading(true);
        try {
            const response = await axios.post(`${ip}/api/events/updatestatus`, payload);
            if (response.data.success) {
                navigation.replace('assisstantdashboard');
            } else {
                Alert.alert('Operation Failed');
            }
        } catch (error) {
            console.error('Error updating event:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        const status = 'Rejected';

        if (!showRejectionInput) {
            setShowRejectionInput(true);
            return;
        }

        const payload = {
            event_requisition_id: event.event_requisition_id,
            review: rejectionReason,
            status,
            date: currentDate,
        };
        if (rejectionReason.length <= 0) {
            Alert.alert('Enter Reason')
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${ip}/api/events/updatestatus`, payload);
            if (response.data.success) {
                navigation.replace('assisstantdashboard');
            } else {
                Alert.alert('Operation Failed');
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = () => {
        switch (event.status.toLowerCase()) {
            case 'approved':
                return '#388e3c'; // Green
            case 'pending':
                return '#fdd835'; // Yellow
            case 'rejected':
                return '#d32f2f'; // Red
            default:
                return '#c8e6c9'; // Default pale green
        }
    };


    const formatTime = (time) => {
        return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{event.event_name}</Text>
                <Text style={styles.subtitle}>{event.venue}</Text>
            </View>

            <Modal visible={loading} transparent={true}>
                <ActivityIndicator size={'large'} color={'#4caf50'} style={{ flex: 1, justifyContent: 'center' }} />
            </Modal>

            {society && Object.keys(society).length > 0 && (
                <>
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoText}>Society: {society.S_name}</Text>
                    </View>
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoText}>Society: {society.budget}</Text>
                    </View>
                </>
            )}

            <View style={styles.card}>
                <View style={styles.statusBadge}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                    <Text style={styles.statusText}>{event.status}</Text>
                </View>

                <Text style={styles.sectionTitle}>Event Details</Text>
                <Text style={styles.description}>{event.event_description}</Text>

                <View style={styles.detailRow}>
                    <Icon name="calendar-today" size={18} color="#2e7d32" />
                    <Text style={styles.detailText}>
                        {new Date(event.event_start_date).toLocaleDateString()} - {new Date(event.event_end_date).toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Icon name="access-time" size={18} color="#2e7d32" />
                    <Text style={styles.detailText}>
                        {formatTime(event.event_start_time)} - {formatTime(event.event_end_time)}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Icon name="attach-money" size={18} color="#2e7d32" />
                    <Text style={styles.detailText}>₹{event.budget}</Text>
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

                {event.approved_date && (
                    <View style={styles.detailRow}>
                        <Icon name="check-circle" size={18} color="#2e7d32" />
                        <Text style={styles.detailText}>
                            Approved on {new Date(event.approved_date).toLocaleDateString()}
                        </Text>
                    </View>
                )}

                {event.rejection_date && (
                    <View style={styles.detailRow}>
                        <Icon name="cancel" size={18} color="#2e7d32" />
                        <Text style={styles.detailText}>
                            Rejected on {new Date(event.rejection_date).toLocaleDateString()}
                        </Text>
                    </View>
                )}

                {showRejectionInput && (
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Reason for rejection</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Please specify the reason..."
                            multiline
                            value={rejectionReason}
                            onChangeText={setRejectionReason}
                        />
                    </View>
                )}

                {event.status.toLowerCase() === 'pending' && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonWrapper} onPress={handleApprove}>
                            <View style={[styles.button, { backgroundColor: '#4CAF50' }]}>
                                <Icon name="check" size={20} color="#fff" />
                                <Text style={styles.buttonText}>{showRejectionInput ? 'Cancel' : 'Approve'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonWrapper} onPress={handleReject}>
                            <View style={[styles.button, { backgroundColor: '#81c784' }]}>
                                <Icon name="close" size={20} color="#fff" />
                                <Text style={styles.buttonText}>{showRejectionInput ? 'Confirm' : 'Reject'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',  // Light grey background to create contrast
        flex: 1,  // Ensures the container takes the full height
    },
    header: {
        padding: 24,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#388e3c', // Strong green header
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,  // Slight elevation to create a floating effect
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#a5d6a7',
        textAlign: 'center',
        fontStyle: 'italic',
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 18,
        padding: 18,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
        marginTop: 12,
    },
    statusDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginRight: 12,
    },
    statusText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#388e3c',
        textTransform: 'capitalize',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 16,
        borderBottomWidth: 3,
        borderBottomColor: '#388e3c', // Green underline
        paddingBottom: 10,
        color: '#388e3c',
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 16,
        fontStyle: 'normal',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    detailText: {
        marginLeft: 14,
        color: '#388e3c',
        fontSize: 16,
        flex: 1,
        fontWeight: '600',
    },
    inputContainer: { marginTop: 20 },
    inputLabel: {
        fontSize: 18,
        marginBottom: 8,
        color: '#388e3c',
        fontWeight: '600',
    },
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 28,
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 14,
        overflow: 'hidden',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 14,
        backgroundColor: '#388e3c',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
        marginLeft: 12,
    },
    infoBlock: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#e8f5e9', // Soft light green background
        borderRadius: 10,
        marginVertical: 12,
    },
    infoText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#388e3c',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker transparent background for modals
    },
    modalText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
});


export default EventDetails;
