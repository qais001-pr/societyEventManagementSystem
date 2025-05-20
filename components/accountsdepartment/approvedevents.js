/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eol-last */
/* eslint-disable quotes */
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
    Dimensions,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSociety } from '../../context/society/societycontext';
import axios from 'axios';
import { ip } from '../../config';

const ApprovedEventDetails = ({ route }) => {
    const naviagtion = useNavigation()
    const { items, fetchData } = useSociety()
    const [localChecked, setLocalChecked] = useState(false);
    const { event } = route.params;
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectionInput, setShowRejectionInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [budget, setbudget] = useState(0)
    const [societyname, setsocietyname] = useState('')

    useEffect(() => {
        const getbudget = items.find(society => society.society_id === event.society_id);
        // console.log(getbudget)
        setbudget(getbudget.budget)
        setsocietyname(getbudget.S_name)
        // console.log(societyname)
    }, []);
    const handleApprove = async () => {
        const payload = {
            event_id: event.event_requisition_id,
            review: rejectionReason,
            status: 'Approved',
            newbudget: budget - event.budget,
            society_id: event.society_id,
            budget: event.budget,
        };
        console.log(payload)
        if (showRejectionInput) {
            setShowRejectionInput(false);
            return;
        }
        if (!localChecked) {
            Alert.alert('Check to Approve it')
            return;
        }
        if (parseInt(event.budget) >= parseInt(budget)) {
            Alert.alert('Amount not sufficient');
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${ip}/api/societies/updatebudget`, payload);
            await fetchData()
            Alert.alert('Approved Successfully');
            setTimeout(() => {
                setLoading(false);
                naviagtion.replace('homeaccounts');
            }, 2000);

        } catch (error) {
            Alert.alert('Error', 'Something went wrong while approving.');
            setLoading(false);
        }
    };


    const handleReject = async () => {
        if (!showRejectionInput) {
            setShowRejectionInput(true);
            return;
        }
        if(!rejectionReason){
            Alert.alert('Enter Reason to reject it');
            return;
        }
        const payload = {
            event_id: event.event_requisition_id,
            review: rejectionReason,
            status: 'Rejected',
            newbudget: budget,
            society_id: event.society_id,
            budget: event.budget,
        };
        try {
            setLoading(true);
            await axios.post(`${ip}/api/societies/updatebudget`, payload);
            await fetchData()
            Alert.alert('Approved Successfully');
            setTimeout(() => {
                setLoading(false);
                naviagtion.replace('homeaccounts');
            }, 2000);

        } catch (error) {
            // console.error('Approval failed:', error);
            Alert.alert('Error', 'Something went wrong while approving.');
            setLoading(false);
        }
    };

    const getStatusColor = () => {
        switch (event.status.toLowerCase()) {
            case 'approved': return '#4CAF50';
            case 'pending': return '#FFC107';
            case 'rejected': return '#F44336';
            default: return '#9E9E9E';
        }
    };

    const formatTime = (time) => {
        return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={[styles.header, { backgroundColor: '#3f51b5' }]}>
                <Text style={styles.title}>{event.event_name}</Text>
                <Text style={styles.subtitle}>{event.venue}</Text>
            </View>

            <Modal visible={loading} transparent={true}>
                <ActivityIndicator size={'large'} color={'green'} style={{ justifyContent: "center", alignContent: "center", flex: 1 }} />
            </Modal>
            <View style={styles.card}>
                <View style={styles.statusBadge}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                    <Text style={styles.statusText}>{event.status}</Text>
                </View>
                <Text style={[styles.sectionTitle, { fontWeight: 'bold', color: 'green', maxWidth: Dimensions.get('screen').width, fontSize: 20 }]}>Society: {societyname} </Text>
                <Text style={styles.sectionTitle}>Total Budget: {budget} </Text>
                <Text style={styles.sectionTitle}>Event Details</Text>
                <Text style={styles.description}>{event.event_description}</Text>

                <View style={styles.detailRow}>
                    <Icon name="calendar-today" size={18} color="#555" />
                    <Text style={styles.detailText}>
                        {new Date(event.event_start_date).toLocaleDateString()} - {new Date(event.event_end_date).toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Icon name="access-time" size={18} color="#555" />
                    <Text style={styles.detailText}>
                        {formatTime(event.event_start_time)} - {formatTime(event.event_end_time)}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Icon name="attach-money" size={18} color="#555" />
                    <Text style={styles.detailText}>₹{event.budget}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Icon name="build" size={18} color="#555" />
                    <Text style={styles.detailText}>{event.resources || 'No resources specified'}</Text>
                </View>

                {event.notes && (
                    <View style={styles.detailRow}>
                        <Icon name="notes" size={18} color="#555" />
                        <Text style={styles.detailText}>{event.notes}</Text>
                    </View>
                )}

                <Text style={styles.sectionTitle}>Submission Details</Text>

                <View style={styles.detailRow}>
                    <Icon name="event" size={18} color="#555" />
                    <Text style={styles.detailText}>
                        Submitted on {new Date(event.submission_date).toLocaleDateString()}
                    </Text>
                </View>

                {event.approved_date && (
                    <View style={styles.detailRow}>
                        <Icon name="check-circle" size={18} color="#555" />
                        <Text style={styles.detailText}>
                            Approved on {new Date(event.approved_date).toLocaleDateString()}
                        </Text>
                    </View>
                )}

                {event.rejection_date && (
                    <View style={styles.detailRow}>
                        <Icon name="cancel" size={18} color="#555" />
                        <Text style={styles.detailText}>
                            Rejected on {new Date(event.rejection_date).toLocaleDateString()}
                        </Text>
                    </View>
                )}
                <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                    <BouncyCheckbox
                        isChecked={localChecked}
                        fillColor="green"
                        size={18}
                        useBuiltInState={false}
                        iconImageStyle={styles.iconImageStyle}
                        iconStyle={{ borderColor: 'green' }}
                        onPress={() => {
                            setLocalChecked(!localChecked);
                        }}
                    />
                    <Text style={{ fontSize: 16, color: 'black' }}>Check To Confirm</Text>
                </View>
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

                {event.status.toLowerCase() === 'approved' && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonWrapper} onPress={handleApprove}>
                            <View style={[styles.button, { backgroundColor: '#4CAF50' }]}>
                                <Icon name="check" size={20} color="#fff" />
                                <Text style={styles.buttonText}>{showRejectionInput ? 'Cancel' : 'Approve'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonWrapper} onPress={handleReject}>
                            <View style={[styles.button, { backgroundColor: '#F44336' }]}>
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
    container: { backgroundColor: '#f0f0f0' },
    header: { padding: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
    title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
    subtitle: { fontSize: 16, color: '#e0e0e0' },
    card: { backgroundColor: '#fff', borderRadius: 16, margin: 20, padding: 20, elevation: 5 },
    statusBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
    statusText: { fontSize: 14, fontWeight: 'bold', color: '#333', textTransform: 'capitalize' },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 6, color: '#333' },
    description: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 10 },
    detailRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
    detailText: { marginLeft: 10, color: '#555', fontSize: 15, flex: 1 },
    inputContainer: { marginTop: 15 },
    inputLabel: { fontSize: 14, marginBottom: 6, color: '#666' },
    input: { backgroundColor: '#f9f9f9', borderColor: '#ddd', borderWidth: 1, borderRadius: 10, padding: 10, minHeight: 80, textAlignVertical: 'top', fontSize: 14, color: '#333' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    buttonWrapper: { flex: 1, marginHorizontal: 5, borderRadius: 12, overflow: 'hidden' },
    button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15, marginLeft: 8 },
});

export default ApprovedEventDetails;