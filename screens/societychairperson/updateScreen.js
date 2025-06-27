/* eslint-disable curly */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Platform,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView,
} from 'react-native';
import { styles } from '../../styles/societychairperson/updateevents';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../context/auth/authcontext';
import { useNavigation } from '@react-navigation/native';
import { useSociety } from '../../context/society/societycontext';
import { ip } from '../../config';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const UpdateEventDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { society_id, items } = useSociety();
    const { user } = useAuth();
    let user_id = user.user_id;
    const event = route.params?.event[0] || {};
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState('date');
    const [activeField, setActiveField] = useState('');
    console.log(event);
    const [societiesData, setSocietiesData] = useState({});
    const [form, setForm] = useState({
        eventName: '',
        venue: '',
        description: '',
        budget: '',
        resources: '',
        notes: '',
        startDate: new Date(),
        endDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
    });

    const getSociety = () => {
        const society = items.filter(s => s.society_id === society_id);
        setSocietiesData(society);
    };
    useEffect(() => {
        getSociety();
    }, []);
    console.log(societiesData);
    useEffect(() => {
        if (Object.keys(event).length >= 0) {
            setForm({
                eventName: event.event_name || '',
                venue: event.venue || '',
                description: event.event_description || '',
                budget: event.budget?.toString() || '',
                resources: event.resources || '',
                notes: event.notes || '',
                startDate: event.event_start_date ? new Date(event.event_start_date) : new Date(),
                endDate: event.event_end_date ? new Date(event.event_end_date) : new Date(),
                startTime: event.event_start_time ? new Date(event.event_start_time) : new Date(),
                endTime: event.event_end_time ? new Date(event.event_end_time) : new Date(),
            });
        }
    }, [event]);
    // Handle input changes for each field
    const handleInputChange = (field, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value,
        }));
    };

    // DateTime picker change handler
    const onChangeDateTime = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setForm((prevForm) => ({
                ...prevForm,
                [activeField]: selectedDate,
            }));
        }
    };

    // Show date or time picker
    const showDateTimePicker = (mode, field) => {
        setPickerMode(mode);
        setActiveField(field);
        setShowPicker(true);
    };
    const handleUpdate = async (id) => {
        try {
            const {
                eventName,
                venue,
                description,
                startDate,
                endDate,
                startTime,
                endTime,
                budget,
                resources,
                notes,
            } = form;
            if (
                !form.eventName ||
                !form.venue ||
                !form.description ||
                !form.budget ||
                !form.resources ||
                !form.notes ||
                !form.startDate ||
                !form.endDate ||
                !form.startTime ||
                !form.endTime ||
                !society_id
            ) {
                Alert.alert('Validation Error', 'Please fill all the required fields.');
                return;
            }
            if (!society_id) {
                Alert.alert('Validation Error', 'Please select a society.');
                return;
            }
            const formatDate = (date) => date.toISOString().split('T')[0];
            const formatTime = (time) =>
                time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                });
            const payload = {
                eventName,
                venue,
                description,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                startTime: formatTime(startTime),
                endTime: formatTime(endTime),
                budget,
                resources,
                notes,
                society_id,
                user_id,
            };
            const response = await axios.put(`${ip}/api/societychairperson/update/${id}`, payload);
            setForm({
                eventName: '',
                venue: '',
                description: '',
                budget: '',
                resources: '',
                notes: '',
                startDate: new Date(),
                endDate: new Date(),
                startTime: new Date(),
                endTime: new Date(),
            });
            if (response.data.success)
                navigation.replace('SocietyChairpersonhomescreen');
        } catch (error) {
            Alert.alert('Alert', 'Event already exists or server error');
        }
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' size={20} color='white' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Update Event Details</Text>
            </View>

            {/* Custom Dropdown for Societies */}
            <View style={styles.inputContainer}>
                <View style={styles.dropdownTouchable}>
                    <Text style={styles.dropdownText}>
                        {societiesData[0]?.S_name || 'Society'}
                    </Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingView}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    {/* Event Name */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Event Name</Text>
                        <View style={styles.inputWrapper}>
                            <Icon name="calendar" style={styles.icon} />
                            <TextInput
                                value={form.eventName}
                                onChangeText={(value) => handleInputChange('eventName', value)}
                                placeholder="Enter event name"
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Venue */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Venue</Text>
                        <View style={styles.inputWrapper}>
                            <Icon name="map-marker" style={styles.icon} />
                            <TextInput
                                value={form.venue}
                                onChangeText={(value) => handleInputChange('venue', value)}
                                placeholder="Enter venue"
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Description</Text>
                        <View style={styles.inputWrapper}>
                            <Icon name="file-text" style={styles.icon} />
                            <TextInput
                                value={form.description}
                                onChangeText={(value) => handleInputChange('description', value)}
                                placeholder="Enter event description"
                                multiline
                                style={[styles.input, styles.multilineInput]}
                            />
                        </View>
                    </View>

                    {/* Budget */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Budget</Text>
                        <View style={styles.inputWrapper}>
                            <Icon name="money" style={styles.icon} />
                            <TextInput
                                value={form.budget}
                                onChangeText={(value) => handleInputChange('budget', value)}
                                placeholder="Enter budget"
                                keyboardType="numeric"
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Resources */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Resources</Text>
                        <View style={styles.inputWrapper}>
                            <Icon name="cogs" style={styles.icon} />
                            <TextInput
                                value={form.resources}
                                onChangeText={(value) => handleInputChange('resources', value)}
                                placeholder="Enter resources"
                                multiline
                                style={[styles.input, styles.multilineInput]}
                            />
                        </View>
                    </View>

                    {/* Notes */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Notes</Text>
                        <View style={styles.inputWrapper}>
                            <Icon name="sticky-note" style={styles.icon} />
                            <TextInput
                                value={form.notes}
                                onChangeText={(value) => handleInputChange('notes', value)}
                                placeholder="Enter additional notes"
                                multiline
                                style={[styles.input, styles.multilineInput]}
                            />
                        </View>
                    </View>
                    {/* Date & Time Pickers in rows */}
                    <View style={styles.dateTimeContainer}>

                        {/* First row: Start Date and End Date */}
                        <View style={styles.dateTimeRow}>
                            <TouchableOpacity
                                style={styles.dateTimeButtonHalf}
                                onPress={() => showDateTimePicker('date', 'startDate')}
                            >
                                <Text style={styles.dateTimeButtonText}>
                                    Start Date: {form.startDate.toISOString().split('T')[0]}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.dateTimeButtonHalf}
                                onPress={() => showDateTimePicker('date', 'endDate')}
                            >
                                <Text style={styles.dateTimeButtonText}>
                                    End Date: {form.endDate.toISOString().split('T')[0]}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Second row: Start Time and End Time */}
                        <View style={styles.dateTimeRow}>
                            <TouchableOpacity
                                style={styles.dateTimeButtonHalf}
                                onPress={() => showDateTimePicker('time', 'startTime')}
                            >
                                <Text style={styles.dateTimeButtonText}>
                                    Start Time: {form.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.dateTimeButtonHalf}
                                onPress={() => showDateTimePicker('time', 'endTime')}
                            >
                                <Text style={styles.dateTimeButtonText}>
                                    End Time: {form.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    {/* DateTime Picker Component */}
                    {showPicker && (
                        <DateTimePicker
                            value={form[activeField]}
                            mode={pickerMode}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChangeDateTime}
                            is24Hour={false}
                            minimumDate={new Date()}
                        />
                    )}

                    {/* Submit Button */}
                    <View style={styles.submitButtonContainer}>
                        <TouchableOpacity style={styles.submitButton} onPress={() => { handleUpdate(event.event_requisition_id)}}>
                            <Text style={styles.submitButtonText}>Update Event</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView >
    );
};

export default UpdateEventDetails;
