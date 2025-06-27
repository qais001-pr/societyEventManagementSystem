import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CardDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const event = route.params;
    console.log(event);
    const getStatus = () => {
        if (event.status === 'Pending') return 'Pending';
        if (
            event.status === 'Approved' &&
            (event.accountdepartmentstatus === 'Approved' || event.accountdepartmentstatus === null) &&
            (event.staffheadstatus === 'Approved' || event.staffheadstatus === null) &&
            event.itheadstatus === null
        ) return 'Pending';
        if (
            event.status === 'Rejected' ||
            event.accountdepartmentstatus === 'Rejected' ||
            event.staffheadstatus === 'Rejected' ||
            event.itheadstatus !== 'Completed'
        ) return 'Rejected';
        if (
            event.status === 'Approved' &&
            event.accountdepartmentstatus === 'Approved' &&
            event.staffheadstatus === 'Approved' &&
            event.itheadstatus !== 'Completed'
        ) return 'Pending';
        if (event.itheadstatus === 'Completed') return 'Completed';
        return 'Unknown';
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString();
    };

    const formatTime = (time) => {
        if (!time) return 'N/A';
        const formattedTime = time.replace('Z', '');
        return new Date(formattedTime).toLocaleTimeString('en-PK', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const status = getStatus();

    const getStatusColor = () => {
        if (status === 'Pending') return '#f1c40f';
        if (status === 'Rejected') return '#e74c3c';
        if (status === 'Completed') return '#2ecc71';
        return '#bdc3c7';
    };

    const renderStatusIcon = () => {
        if (status === 'Pending') return <FontAwesome name="hourglass-half" size={18} color={getStatusColor()} />;
        if (status === 'Rejected') return <FontAwesome name="times-circle" size={18} color={getStatusColor()} />;
        if (status === 'Completed') return <FontAwesome name="check-circle" size={18} color={getStatusColor()} />;
        return <FontAwesome name="question-circle" size={18} color={getStatusColor()} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color="#2ecc71" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Event Details</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Event Status Banner */}
                <View style={[styles.statusBanner, { backgroundColor: getStatusColor() }]}>
                    {renderStatusIcon()}
                    <Text style={styles.statusText}>  {status}</Text>
                </View>

                {/* Society Info */}
                <View style={styles.card}>
                    <Text style={styles.section}>Society</Text>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{event.SocietyName}</Text>

                    <Text style={styles.label}>Budget</Text>
                    <Text style={styles.value}>{event.SocietyBudget} PKR</Text>
                </View>

                {/* Event Info */}
                <View style={styles.card}>
                    <Text style={styles.section}>Event Details</Text>

                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{event.event_name}</Text>

                    <Text style={styles.label}>Venue</Text>
                    <Text style={styles.value}>{event.venue}</Text>

                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.value}>{event.event_description}</Text>

                    <Text style={styles.label}>Budget</Text>
                    <Text style={styles.value}>{event.budget}</Text>

                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.value}>
                        {formatDate(event.event_start_date)} to {formatDate(event.event_end_date)}
                    </Text>

                    <Text style={styles.label}>Time</Text>
                    <Text style={styles.value}>
                        {formatTime(event.event_start_time)} to {formatTime(event.event_end_time)}
                    </Text>

                    <Text style={styles.label}>Resources</Text>
                    <Text style={styles.value}>{event.resources}</Text>

                    <Text style={styles.label}>Notes</Text>
                    <Text style={styles.value}>{event.notes}</Text>
                </View>

                {/* Conditional Rendering */}
                {status === 'Rejected' && (
                    <View style={styles.card}>
                        <Text style={styles.section}>Rejection Details</Text>

                        {event.rejection_date && (
                            <>
                                <Text style={styles.label}>Assistant Director</Text>
                                <Text style={styles.value}>Rejected on {formatDate(event.rejection_date)}</Text>
                                <Text style={styles.value}>Review: {event.event_review || 'N/A'}</Text>
                            </>
                        )}
                        {event.accountdepartment_rejectiondate && (
                            <>
                                <Text style={styles.label}>Accounts Dept.</Text>
                                <Text style={styles.value}>Rejected on {formatDate(event.accountdepartment_rejectiondate)}</Text>
                                <Text style={styles.value}>Review: {event.accountdepartmentreviews || 'N/A'}</Text>
                            </>
                        )}
                        {event.staffheadrejectiondate && (
                            <>
                                <Text style={styles.label}>Staff Head</Text>
                                <Text style={styles.value}>Rejected on {formatDate(event.staffheadrejectiondate)}</Text>
                                <Text style={styles.value}>Logistics: {event.staffheadlogistics || 'N/A'}</Text>
                            </>
                        )}
                        {event.itheadrejectiondate && (
                            <>
                                <Text style={styles.label}>IT Head</Text>
                                <Text style={styles.value}>Rejected on {formatDate(event.itheadrejectiondate)}</Text>
                                <Text style={styles.value}>Tech Requirements: {event.itheadtechnicalrequirements || 'N/A'}</Text>
                            </>
                        )}
                    </View>
                )}

                {status === 'Completed' && (
                    <View style={styles.card}>
                        <Text style={styles.section}>Completion Details</Text>
                        <Text style={styles.value}>Completed on {formatDate(event.itheadcompletiondate)}</Text>
                        <Text style={styles.value}>Logistics Details: {event.staffheadlogistics || 'N/A'}</Text>
                        <Text style={styles.value}>Technical Setup: {event.itheadtechnicalrequirements || 'N/A'}</Text>
                    </View>
                )}

                {status === 'Pending' && (
                    <View style={styles.card}>
                        <Text style={styles.section}>Approval Status</Text>
                        <Text style={styles.value}>Main: {event.status}</Text>
                        <Text style={styles.value}>Accounts: {event.accountdepartmentstatus || 'Pending'}</Text>
                        <Text style={styles.value}>Staff Head: {event.staffheadstatus || 'Pending'}</Text>
                        <Text style={styles.value}>IT Head: {event.itheadstatus || 'Pending'}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CardDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f6f3',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomColor: '#dcdde1',
        borderBottomWidth: 1,
    },
    backButton: {
        padding: 6,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2ecc71',
    },
    scrollContent: {
        padding: 16,
    },
    statusBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    section: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        color: '#2ecc71',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginTop: 10,
    },
    value: {
        fontSize: 15,
        color: '#555',
        marginTop: 4,
    },
});
