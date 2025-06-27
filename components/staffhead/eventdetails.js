/* eslint-disable radix */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSociety } from '../../context/society/societycontext';
import { styles } from '../../styles/staffhead/style_eventdetails';
import { useNavigation } from '@react-navigation/native';
import { ip } from '../../config';
import axios from 'axios';
const EventDetails = ({ route }) => {
    const { items } = useSociety();
    const { item } = route.params || {};
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState(0);
    const [societyName, setSocietyName] = useState('');
    const [logisticsInfo, setLogisticsInfo] = useState('');
    console.log(item);
    useEffect(() => {
        const getBudget = items.find(society => society.society_id === item?.society_id);
        setBudget(getBudget?.budget);
        setSocietyName(getBudget?.S_name);
    }, [items, item]);

    const handleApproved = async () => {
        if (logisticsInfo.length > 500) {
            return;
        }
        if (!logisticsInfo) {
            Alert.alert("Please enter logistics information");
            return;
        }
        const payload = {
            logistics: logisticsInfo,
            status: 'Approved',
            eventid: parseInt(item?.event_requisition_id),
            societyid: parseInt(item?.society_id),
        };
        // Approval logic goes here
        try {
            setLoading(true);
            const response = await axios.post(`${ip}/api/logistics`, {
                logistics: payload.logistics,
                status: payload.status,
                eventid: payload.eventid,
                societyid: payload.societyid,
            });
            console.log(response);
            if (response.data.success) {
                Alert.alert("Operation Succeed");
                navigation.navigate('homestaffheadpage');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong!.Please try again later');
        }
        finally {
            setLoading(false);
        }
    };
    const handleRejected = async () => {
        if (logisticsInfo.length > 500) {
            return;
        }
        if (!logisticsInfo) {
            Alert.alert("Please enter logistics information");
            return;
        }
        const payload = {
            logistics: logisticsInfo,
            status: 'Rejected',
            eventid: parseInt(item?.event_requisition_id),
            societyid: parseInt(item?.society_id),
        };
        // Rejection logic goes here
        try {
            setLoading(true);
            const response = await axios.post(`${ip}/api/logistics`, {
                logistics: payload.logistics,
                status: payload.status,
                eventid: payload.eventid,
                societyid: payload.societyid,
            });
            console.log(response);
            if (response.data.success) {
                Alert.alert("Operation Succeed");
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong!.Please try again later');
        }
        finally {
            setLoading(false);
        }
    };

    const getStatusColor = () => {
        switch (getDisplayStatus().toLowerCase()) {
            case 'approved':
                return '#4CAF50';
            case 'pending':
                return '#FFC107';
            case 'rejected':
                return '#F44336';
            default:
                return '#9E9E9E';
        }
    };

    const getDisplayStatus = () => {
        if (item.status === 'Approved' && item.adstatus === 'Approved' && item.ststatus === null) {
            return 'Pending';
        }
        if (item.status === 'Approved' && item.adstatus === 'Approved' && item.ststatus === 'Rejected') {
            return 'Rejected';
        }
        if (item.status === 'Approved' && item.adstatus === 'Approved' && item.ststatus === 'Approved') {
            return 'Approved';
        }
    };

    const formatTime = (time) => {
        const cleanTime = time.replace(/Z$/, '');
        const formattedTime = new Date(cleanTime)
            .toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', hour12: true })
            .toLowerCase();
        return formattedTime;
    };


    return (
        <ScrollView style={styles.container}>
            <View style={[styles.header, { backgroundColor: 'green' }]}>
                <Text style={styles.title}>{item?.event_name || 'Event Title'}</Text>
                <Text style={styles.subtitle}>{item?.venue || 'Venue Name'}</Text>
            </View>

            <Modal visible={loading} transparent={true}>
                <ActivityIndicator size={'large'} color={'green'} style={{ flex: 1, justifyContent: 'center' }} />
            </Modal>

            <View style={styles.card}>
                <View style={styles.statusBadge}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                    <Text style={[styles.statusText, { color: getStatusColor() }]}>{getDisplayStatus()}</Text>
                </View>

                <Text style={[styles.sectionTitle, { fontWeight: 'bold', color: getStatusColor() }]}>Society: {societyName}</Text>
                <Text style={styles.sectionTitle}>Total Budget: RS  {budget}</Text>
                <Text style={styles.sectionTitle}>Event Details</Text>
                <Text style={styles.description}>{item?.event_description || 'No description available'}</Text>

                <View style={styles.detailRow}>
                    <Icon name="calendar-today" size={18} color="#555" />
                    <Text style={styles.detailText}>
                        {new Date(item?.event_start_date).toLocaleDateString()} - {new Date(item?.event_end_date).toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Icon name="access-time" size={18} color="#555" />
                    <Text style={styles.detailText}>
                        {formatTime(item?.event_start_time)} - {formatTime(item?.event_end_time)}

                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Icon name="money" size={18} color="#555" />
                    <Text style={styles.detailText}>RS {item?.budget}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Icon name="build" size={18} color="#555" />
                    <Text style={styles.detailText}>{item?.resources || 'No resources specified'}</Text>
                </View>

                {item?.notes && (
                    <View style={styles.detailRow}>
                        <Icon name="notes" size={18} color="#555" />
                        <Text style={styles.detailText}>{item?.notes}</Text>
                    </View>
                )}

                <Text style={styles.sectionTitle}>Submission Details</Text>

                <View style={styles.detailRow}>
                    <Icon name="event" size={18} color="#555" />
                    <Text style={styles.detailText}>Submitted on {new Date(item?.submission_date).toLocaleDateString()}</Text>
                </View>

                {item?.approved_date && (
                    <View style={styles.detailRow}>
                        <Icon name="check-circle" size={18} color="#555" />
                        <Text style={styles.detailText}>
                            Approved on {new Date(item?.approved_date).toLocaleDateString()}
                        </Text>
                    </View>
                )}

                {item?.rejection_date && (
                    <View style={styles.detailRow}>
                        <Icon name="cancel" size={18} color="#555" />
                        <Text style={styles.detailText}>
                            Rejected on {new Date(item?.rejection_date).toLocaleDateString()}
                        </Text>
                    </View>
                )}
                {(getDisplayStatus() === 'Pending') && (
                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Logistics Information (Required)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter logistics details..."
                                multiline
                                value={logisticsInfo}
                                onChangeText={setLogisticsInfo}
                            />
                            <Text>{logisticsInfo.length} / 500</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonWrapper} onPress={handleApproved}>
                                <View style={[styles.button, { backgroundColor: '#4CAF50' }]}>
                                    <Icon name="check" size={20} color="#fff" />
                                    <Text style={styles.buttonText}>Approve</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonWrapper} onPress={handleRejected}>
                                <View style={[styles.button, { backgroundColor: '#F44336' }]}>
                                    <Icon name="close" size={20} color="#fff" />
                                    <Text style={styles.buttonText}>Reject</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default EventDetails;
