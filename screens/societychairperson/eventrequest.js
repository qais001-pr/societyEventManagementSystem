/* eslint-disable react-native/no-inline-styles */
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
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../context/auth/authcontext';
import { useNavigation } from '@react-navigation/native';
import { useSociety } from '../../context/society/societycontext';
import { ip } from '../../config';
import axios from 'axios';
import styles from '../../styles/societychairperson/style_chairperson';

const ChairpersonDashboard = () => {
  const { items, society_id } = useSociety();
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const [modalVisibleLogistics, setModalVisibleLogistics] = useState(false);
  const [modalVisibleTech, setModalVisibleTech] = useState(false);
  const [selectedLogistics, setSelectedLogistics] = useState('Logistics');
  const [selectedTechnical, setSelectedTechnical] = useState('Technical');

  const [dataLogistics, setDataLogistics] = useState([]);
  const [dataTechnical, setDataTechnical] = useState([]);
  const [societiesData, setSocietiesData] = useState({});
  const [refresh, setRefresh] = useState(false);

  const user_id = user?.user_id;

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

  const fetchLogistics = async () => {
    try {
      const res = await axios.get(`${ip}/api/logistics/req`);
      if (res.data.success) {
        setDataLogistics(res.data.data);
      }
    } catch (error) {
      console.error('Logistics fetch error:', error);
    }
  };

  const fetchTechnical = async () => {
    try {
      const res = await axios.get(`${ip}/api/staffhead/events/details`);
      if (res.data.success) {
        setDataTechnical(res.data.data);
      }
    } catch (error) {
      console.error('Technical fetch error:', error);
    }
  };

  const getSociety = () => {
    const society = items.filter(s => s.society_id === society_id);
    setSocietiesData(society);
  };

  useEffect(() => {
    fetchLogistics();
    fetchTechnical();
    getSociety();
  }, []);

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const onChangeDateTime = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setForm(prev => ({ ...prev, [activeField]: selectedDate }));
    }
  };

  const showDateTimePicker = (mode, field) => {
    setPickerMode(mode);
    setActiveField(field);
    setShowPicker(true);
  };

  const formatDate = (date) => date.toISOString().split('T')[0];
  const formatTime = (time) =>
    time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

  const handleSubmit = async () => {
    if (!society_id) {
      Alert.alert('Validation Error', 'Please select a society.');
      return;
    }

    try {
      setRefresh(true);

      const payload = {
        ...form,
        startDate: formatDate(form.startDate),
        endDate: formatDate(form.endDate),
        startTime: formatTime(form.startTime),
        endTime: formatTime(form.endTime),
        submissiondate: new Date().toISOString(),
        society_id,
        user_id,
      };

      await axios.post(`${ip}/api/events`, payload);
      Alert.alert('Success', 'Data Inserted Successfully');

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
    } catch (error) {
      Alert.alert('Error', 'Event already exists or server error.');
    } finally {
      setRefresh(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigation.replace('login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Society Chairperson</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="sign-out" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>

      {/* Dropdown for Logistics */}
      <View style={styles.dropdownWrapper}>
        <Text style={styles.dropdownLabel}>Logistics Requirement</Text>
        <TouchableOpacity style={styles.dropdownTouchable} onPress={() => setModalVisibleLogistics(true)}>
          <Text style={styles.dropdownText}>{selectedLogistics}</Text>
        </TouchableOpacity>
        <Modal visible={modalVisibleLogistics} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalInner}>
              <FlatList
                data={dataLogistics}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedLogistics(item.logisticsdetails);
                      setModalVisibleLogistics(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item.logisticsdetails}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisibleLogistics(false)}>
                <Text style={[styles.cancelText, { backgroundColor: 'red', padding: 10 }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* Dropdown for Technical */}
      <View style={styles.dropdownWrapper}>
        <Text style={styles.dropdownLabel}>Technical Requirement</Text>
        <TouchableOpacity style={styles.dropdownTouchable} onPress={() => setModalVisibleTech(true)}>
          <Text style={styles.dropdownText}>{selectedTechnical}</Text>
        </TouchableOpacity>
        <Modal visible={modalVisibleTech} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalInner}>
              <FlatList
                data={dataTechnical}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedTechnical(item.technicaldetails);
                      setModalVisibleTech(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item.technicaldetails}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisibleTech(false)}>
                <Text style={[styles.cancelText, { backgroundColor: 'red', padding: 10 }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* Loading Modal */}
      <Modal visible={refresh} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      </Modal>

      {/* Society Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Society</Text>
        <View style={styles.dropdownTouchable}>
          <Text style={styles.societyName}>{societiesData[0]?.S_name || 'Select Society'}</Text>
        </View>
      </View>

      {/* Event Submission Form */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Event Name to Notes fields */}
          {[
            { label: 'Event Name', icon: 'calendar', field: 'eventName' },
            { label: 'Venue', icon: 'map-marker', field: 'venue' },
            { label: 'Event Description', icon: 'file-text', field: 'description', multiline: true },
            { label: 'Budget', icon: 'money', field: 'budget', numeric: true },
            { label: 'Resources', icon: 'cogs', field: 'resources', multiline: true },
            { label: 'Notes', icon: 'sticky-note', field: 'notes', multiline: true },
          ].map(({ label, icon, field, multiline, numeric }) => (
            <View key={field} style={styles.inputContainer}>
              <Text style={styles.label}>{label}</Text>
              <View style={styles.inputWrapper}>
                <Icon name={icon} style={styles.icon} />
                <TextInput
                  value={form[field]}
                  onChangeText={(val) =>
                    handleInputChange(field, numeric ? val.replace(/[^0-9]/g, '') : val)
                  }
                  placeholder={label}
                  multiline={multiline}
                  keyboardType={numeric ? 'numeric' : 'default'}
                  style={[styles.input, multiline && styles.multilineInput]}
                />
              </View>
            </View>
          ))}

          {/* Start & End DateTime Pickers */}
          <View style={styles.dateTimeContainer}>
            {[
              { label: 'Start', dateField: 'startDate', timeField: 'startTime' },
              { label: 'End', dateField: 'endDate', timeField: 'endTime' },
            ].map(({ label, dateField, timeField }) => (
              <View key={label} style={styles.dateTimeRow}>
                <TouchableOpacity style={styles.dateTimeHalfButton} onPress={() => showDateTimePicker('date', dateField)}>
                  <Text style={styles.dateTimeButtonText}>{label} Date: {formatDate(form[dateField])}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateTimeHalfButton} onPress={() => showDateTimePicker('time', timeField)}>
                  <Text style={styles.dateTimeButtonText}>
                    {label} Time: {form[timeField].toLocaleTimeString([], {
                      hour: '2-digit', minute: '2-digit', hour12: true
                    })}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {showPicker && (
            <DateTimePicker
              value={form[activeField]}
              mode={pickerMode}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDateTime}
              is24Hour={false}
              minimumDate={activeField === 'endDate' ? form.startDate : new Date()}
            />
          )}

          <View style={styles.submitButtonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Event</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChairpersonDashboard;
