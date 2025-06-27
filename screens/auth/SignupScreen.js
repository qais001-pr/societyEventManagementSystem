/* eslint-disable quotes */
import React, { useState, useMemo, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    FlatList,
    Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import RadioGroup from 'react-native-radio-buttons-group';
import { ip } from '../../config';
import { styles } from '../../styles/auth/style_signup';
import { useSociety } from '../../context/society/societycontext';

export default function SignupScreen() {
    const { items } = useSociety();
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [roleModalVisible, setRoleModalVisible] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [selectedSociety, setSelectedSociety] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);

    const [form, setForm] = useState({
        name: '',
        username: '',
        contact: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [selectedIdGender, setSelectedIdGender] = useState('1');

    const genderRadioButtons = useMemo(() => ([
        { id: '1', label: 'Male', value: 'male' },
        { id: '2', label: 'Female', value: 'female' },
        { id: '3', label: 'Other', value: 'other' }
    ]), []);

    const roleOptions = [
        { id: '1', label: 'Chairperson', value: 'chairperson' },
        { id: '2', label: 'Assistant Director', value: 'assistantdirector' },
        { id: '3', label: 'Accounts Department', value: 'accountsdepartment' },
        { id: '4', label: 'Staff Head', value: 'staffhead' },
        { id: '5', label: 'IT Head', value: 'ithead' },
    ];

    useEffect(() => {
        if (items && Array.isArray(items)) {
            const formattedItems = items.map(society => ({
                label: society.S_name,
                value: society.society_id,
            }));
            setDropdownItems(formattedItems);
        }
    }, [items]);

    const handleChange = (field, value) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: value
        }));
    };

    const handleSignup = async () => {
        const { name, username, contact, email, password, confirmPassword } = form;

        console.log('📌 Form state:', form);
        console.log('📌 Selected Role:', selectedRole);
        console.log('📌 Selected Society:', selectedSociety);

        // --- Validation ---
        if (!name || !username || !contact || !email || !password || !confirmPassword) {
            Alert.alert('Validation Error', 'Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Password Too Short', 'Password must be at least 6 characters.');
            return;
        }

        if (!selectedRole) {
            Alert.alert('Validation Error', 'Please select a role.');
            return;
        }

        if (selectedRole === 'chairperson' && !selectedSociety) {
            Alert.alert('Validation Error', 'Chairperson must select a society.');
            return;
        }

        // --- Prepare ---
        try {
            setRefresh(false);
            const selectedGender = genderRadioButtons.find(r => r.id === selectedIdGender)?.value || '';

            // --- API Call ---
            const response = await axios.post(`${ip}/api/users`, {
                name,
                username,
                gender: selectedGender,
                contact,
                email,
                role: selectedRole,
                password,
                societyid: selectedRole === 'chairperson' ? selectedSociety : 0,
            });

            console.log('API Response:', response);

            Alert.alert('Success', 'Account created successfully!');
            navigation.replace('login');

            // --- Reset form ---
            setForm({
                name: '',
                username: '',
                contact: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            setSelectedIdGender('1');
            setSelectedRole(null);
            setSelectedSociety(null);

        } catch (error) {
            let errorMessage = 'An error occurred during signup. Please try again.';
            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = error.response.data.message || errorMessage;
                } else if (error.response.status === 409) {
                    errorMessage = 'Email or username already exists.';
                }
            }
            Alert.alert('Signup Error', errorMessage);
        } finally {
            setRefresh(true);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>Sign Up</Text>

                    <Text style={styles.label}>Full Name:</Text>
                    <TextInput
                        placeholder="Enter your full name"
                        value={form.name}
                        onChangeText={value => handleChange('name', value)}
                        style={styles.input}
                        autoCapitalize="words"
                    />

                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                        placeholder="Choose a username"
                        value={form.username}
                        onChangeText={value => handleChange('username', value)}
                        style={styles.input}
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Role:</Text>
                    <TouchableOpacity style={styles.dropdownButton} onPress={() => setRoleModalVisible(true)}>
                        <Text style={styles.dropdownButtonText}>
                            {selectedRole
                                ? roleOptions.find(item => item.value === selectedRole)?.label
                                : 'Select Role'}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#333" />
                    </TouchableOpacity>

                    {selectedRole === 'chairperson' && (
                        <>
                            <Text style={styles.label}>Select Society:</Text>
                            <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
                                <Text style={styles.dropdownButtonText}>
                                    {selectedSociety
                                        ? dropdownItems.find(item => item.value === selectedSociety)?.label
                                        : 'Select Society'}
                                </Text>
                                <Ionicons name="chevron-down" size={20} color="#333" />
                            </TouchableOpacity>
                        </>
                    )}

                    <Text style={styles.label}>Gender:</Text>
                    <RadioGroup
                        radioButtons={genderRadioButtons}
                        onPress={setSelectedIdGender}
                        selectedId={selectedIdGender}
                        layout="row"
                        containerStyle={styles.radioGroup}
                    />

                    <Text style={styles.label}>Contact Number:</Text>
                    <TextInput
                        placeholder="Enter contact number"
                        value={form.contact}
                        onChangeText={value => handleChange('contact', value)}
                        style={styles.input}
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>Email Address:</Text>
                    <TextInput
                        placeholder="Enter your email"
                        value={form.email}
                        onChangeText={value => handleChange('email', value)}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Password:</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            placeholder="Password (min 6 characters)"
                            value={form.password}
                            onChangeText={value => handleChange('password', value)}
                            style={styles.passwordInput}
                            secureTextEntry={showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Icon name={showPassword ? "eye" : "eye-slash"} size={16} color="grey" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Confirm Password:</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            placeholder="Re-enter password"
                            value={form.confirmPassword}
                            onChangeText={value => handleChange('confirmPassword', value)}
                            style={styles.passwordInput}
                            secureTextEntry={showConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Icon name={showConfirmPassword ? "eye" : "eye-slash"} size={16} color="grey" />
                        </TouchableOpacity>
                    </View>

                    {refresh ? (
                        <TouchableOpacity onPress={handleSignup} style={styles.button}>
                            <Text style={styles.buttonText}>Create Account</Text>
                        </TouchableOpacity>
                    ) : (
                        <ActivityIndicator size={'large'} />
                    )}

                    <TouchableOpacity onPress={() => navigation.replace('login')} style={styles.linkContainer}>
                        <Text style={styles.linkText}>Already have an account? Log In</Text>
                    </TouchableOpacity>

                    {/* Society Modal */}
                    <Modal
                        animationType="fade"
                        transparent
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Choose a Society</Text>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(false)}
                                        style={styles.closeButton}
                                    >
                                        <Ionicons name="close" size={24} color="#000" />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={dropdownItems}
                                    keyExtractor={(item) => item.value.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.modalItem}
                                            onPress={() => {
                                                setSelectedSociety(item.value);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text style={styles.modalItemText}>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </Modal>

                    {/* Role Modal */}
                    <Modal
                        animationType="fade"
                        transparent
                        visible={roleModalVisible}
                        onRequestClose={() => setRoleModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Choose a Role</Text>
                                    <TouchableOpacity
                                        onPress={() => setRoleModalVisible(false)}
                                        style={styles.closeButton}
                                    >
                                        <Ionicons name="close" size={24} color="#000" />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={roleOptions}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.modalItem}
                                            onPress={() => {
                                                setSelectedRole(item.value);
                                                setRoleModalVisible(false);
                                            }}
                                        >
                                            <Text style={styles.modalItemText}>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </Modal>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
