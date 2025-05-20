/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView
} from 'react-native';
import styles from '../../styles/societychairperson/style_chairperson';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../context/auth/authcontext';
import { useNavigation } from '@react-navigation/native';
import { useSociety } from '../../context/society/societycontext';
import { ip } from '../config';
import axios from 'axios';

const ChairpersonDashboard = () => {
  console.log(Dropdown)
  const { items } = useSociety();
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  let user_id = user.user_id;
  console.log(items)
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

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');
  const [activeField, setActiveField] = useState('');
  const [societiesData, setSocietiesData] = useState([]);
  const [selectedSociety, setselectedsociety] = useState('');

  useEffect(() => {
    if (items && Array.isArray(items)) {
      const formattedItems = items.map(society => ({
        label: society.S_title,
        value: society.society_id,
      }));
      setSocietiesData(formattedItems);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const onChangeDateTime = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setForm(prevForm => ({
        ...prevForm,
        [activeField]: selectedDate,
      }));
    }
  };

  const showDateTimePicker = (mode, field) => {
    setPickerMode(mode);
    setActiveField(field);
    setShowPicker(true);
  };

  const handleSubmit = async () => {
    try {
      const submissiondate = new Date();
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

      const formatDate = (date) => date.toISOString().split('T')[0];
      const formatTime = (time) => time.toLocaleTimeString('en-US', {
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
        submissiondate: submissiondate.toISOString(),
        notes,
        selectedSociety,
        user_id,
      };

      await axios.post(`${ip}/api/events`, payload);
      Alert.alert('Data Inserted Successfully');
    } catch (error) {
      console.error("Error submitting event:", error);
      Alert.alert('Error', 'Failed to submit event.');
    }
  };

  const handleLogout = () => {
    logout();
    if (user) {
      navigation.replace('login');
    }
  };
  const handleSelectSociety = (item) => {
    // This function will handle the society selection
    setselectedsociety(item.value);
    console.log("Selected Society ID:", item.value); // Or use any further logic here
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome, {user.name}</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="sign-out" size={22} color="green" style={styles.logoutIcon} />
          </TouchableOpacity>
        </View>
        <View>
          <Dropdown
            data={societiesData}  // The data to be displayed in the dropdown
            labelField="label"     // The field to be displayed in the dropdown
            valueField="value"     // The field that will be passed back as the value
            placeholder="Select Society"
            value={selectedSociety} // Bind selectedSociety to value
            onChange={handleSelectSociety} // Update state on selection change
            style={styles.dropdown}  // Apply custom styles for the dropdown
            placeholderStyle={styles.placeholderStyle}  // Style for placeholder
            selectedTextStyle={styles.selectedTextStyle}  // Style for selected text
            inputSearchStyle={styles.inputSearchStyle}  // Style for input search
            maxHeight={200}  // Max height of dropdown
            search={true} // Enables search functionality
            searchPlaceholder="Search society..."
          />
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Explicit Inputs */}
          <View style={styles.inputContainer}>
            <Icon name="calendar" size={20} color="#888" style={styles.iconStyle} />
            <TextInput
              value={form.eventName}
              onChangeText={(value) => handleInputChange('eventName', value)}
              placeholder="Event Name"
              style={styles.inputStyle}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="map-marker" size={20} color="#888" style={styles.iconStyle} />
            <TextInput
              value={form.venue}
              onChangeText={(value) => handleInputChange('venue', value)}
              placeholder="Venue"
              style={styles.inputStyle}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="file-text" size={20} color="#888" style={styles.iconStyle} />
            <TextInput
              value={form.description}
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder="Event Description"
              multiline
              style={[styles.inputStyle, { height: 70 }]}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="money" size={20} color="#888" style={styles.iconStyle} />
            <TextInput
              value={form.budget}
              onChangeText={(value) => handleInputChange('budget', value)}
              placeholder="Budget"
              keyboardType="numeric"
              style={styles.inputStyle}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="cogs" size={20} color="#888" style={styles.iconStyle} />
            <TextInput
              value={form.resources}
              onChangeText={(value) => handleInputChange('resources', value)}
              placeholder="Resources"
              multiline
              style={[styles.inputStyle, { height: 70 }]}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="sticky-note" size={20} color="#888" style={styles.iconStyle} />
            <TextInput
              value={form.notes}
              onChangeText={(value) => handleInputChange('notes', value)}
              placeholder="Additional Notes"
              multiline
              style={[styles.inputStyle, { height: 70 }]}
            />
          </View>

          {/* Dates and Times (Explicit) */}
          <View style={styles.inputContainer}>
            <Icon name="calendar" size={20} color="#888" style={styles.iconStyle} />
            <TextInput
              value={form.startDate.toISOString().split('T')[0]}
              editable={false}
              placeholder="Start Date"
              style={styles.inputStyle}
            />
            <TouchableOpacity onPress={() => showDateTimePicker('date', 'startDate')}>
              <Icon name="edit" size={20} color="green" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Icon name="calendar" size={20} color="#888" style={styles.iconStyle} />
            <TextInput
              value={form.endDate.toISOString().split('T')[0]}
              editable={false}
              placeholder="End Date"
              style={styles.inputStyle}
            />
            <TouchableOpacity onPress={() => showDateTimePicker('date', 'endDate')}>
              <Icon name="edit" size={20} color="green" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Icon name="clock-o" size={20} color="#888" style={styles.iconStyle} />
            <TextInput
              value={form.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
              editable={false}
              placeholder="Start Time"
              style={styles.inputStyle}
            />
            <TouchableOpacity onPress={() => showDateTimePicker('time', 'startTime')}>
              <Icon name="edit" size={20} color="green" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Icon name="clock-o" size={20} color="#888" style={styles.iconStyle} />
            <TextInput
              value={form.endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
              editable={false}
              placeholder="End Time"
              style={styles.inputStyle}
            />
            <TouchableOpacity onPress={() => showDateTimePicker('time', 'endTime')}>
              <Icon name="edit" size={20} color="green" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <View style={styles.submitButton}>
            <Button title="Submit Event" onPress={handleSubmit} color="green" />
          </View>

          {/* DateTime Picker Modal */}
          {showPicker && (
            <DateTimePicker
              value={form[activeField] || new Date()}
              mode={pickerMode}
              display="default"
              is24Hour={false}
              minimumDate={new Date()}
              maximumDate={new Date('2100-12-31')}
              onChange={onChangeDateTime}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChairpersonDashboard;
