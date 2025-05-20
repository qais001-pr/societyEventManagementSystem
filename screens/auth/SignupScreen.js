/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React, { useState, useMemo } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { ip } from '../../config';
import { styles } from '../../styles/auth/style_signup';
export default function SignupScreen() {
    const navigation = useNavigation();
    const [refresh, setrefresh] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [showpassword, setshowpassword] = useState(true);
    const [form, setForm] = useState({
        name: '',
        username: '',
        contact: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [selectedIdgender, setSelectedIdgender] = useState('1');
    const [selectedIdrole, setSelectedIdrole] = useState('1');

    const genderRadioButtons = useMemo(() => ([
        { id: '1', label: 'Male', value: 'male' },
        { id: '2', label: 'Female', value: 'female' },
        { id: '3', label: 'Other', value: 'other' }
    ]), []);

    const roleRadioButtons = useMemo(() => ([
        { id: '1', label: 'Chairperson', value: 'chairperson' },
        { id: '2', label: 'Assistant Director', value: 'assistantdirector' },
        { id: '3', label: 'Accounts Department', value: 'accountsdepartment' },
        { id: '4', label: 'Staff Head', value: 'staffhead' },
        { id: '5', label: 'IT Head', value: 'ithead' },
    ]), []);

    const handleChange = (field, value) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: value
        }));
    };

    const handleSignup = async () => {
        const { name, username, contact, email, password, confirmPassword } = form;

        if (!name || !username || !contact || !email || !password || !confirmPassword) {
            Alert.alert('Validation Error', 'Please fill all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Password Too Short', 'Password must be at least 6 characters');
            return;
        }

        try {
            setrefresh(false);
            const selectedGender = genderRadioButtons.find(r => r.id === selectedIdgender)?.value || '';
            const selectedRole = roleRadioButtons.find(r => r.id === selectedIdrole)?.value || '';

            if (!selectedGender || !selectedRole) {
                Alert.alert('Selection Error', 'Please select gender and role');
                return;
            }

            await axios.post(`${ip}/api/users`, {
                name,
                username,
                gender: selectedGender,
                contact,
                email,
                role: selectedRole,
                password,
            });

            Alert.alert('Success', 'Account created successfully!');
            navigation.replace('login');

            setForm({
                name: '',
                username: '',
                contact: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            setSelectedIdgender('1');
            setSelectedIdrole('1');

        } catch (error) {
            let errorMessage = 'An error occurred during signup. Please try again.';
            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = error.response.data.message || errorMessage;
                } else if (error.response.status === 409) {
                    errorMessage = 'Email already exists';
                }
            }
            Alert.alert('Signup Error', errorMessage);
        }
        finally {
            setrefresh(true);
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

                    <TextInput
                        placeholder="Full Name"
                        value={form.name}
                        onChangeText={value => handleChange('name', value)}
                        style={styles.input}
                        autoCapitalize="words"
                    />

                    <TextInput
                        placeholder="Username"
                        value={form.username}
                        onChangeText={value => handleChange('username', value)}
                        style={styles.input}
                        autoCapitalize="none"
                    />

                    <Text style={[styles.radioGroupLabel, { color: 'black' }]}>Gender:</Text>
                    <RadioGroup
                        radioButtons={genderRadioButtons}
                        onPress={setSelectedIdgender}
                        selectedId={selectedIdgender}
                        layout="row"
                        containerStyle={styles.radioGroup}
                    />

                    <Text style={styles.radioGroupLabel}>Role:</Text>
                    <RadioGroup
                        radioButtons={roleRadioButtons}
                        onPress={setSelectedIdrole}
                        selectedId={selectedIdrole}
                        containerStyle={styles.radioGroup}
                    />

                    <TextInput
                        placeholder="Contact Number"
                        value={form.contact}
                        onChangeText={value => handleChange('contact', value)}
                        style={styles.input}
                        keyboardType="phone-pad"
                    />

                    <TextInput
                        placeholder="Email Address"
                        value={form.email}
                        onChangeText={value => handleChange('email', value)}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <View style={styles.inputRow}>
                        <TextInput
                            placeholder="Password (min 6 characters)"
                            value={form.password}
                            onChangeText={value => handleChange('password', value)}
                            style={styles.passwordInput}
                            secureTextEntry={showpassword}
                        />
                        <TouchableOpacity onPress={() => setshowpassword(!showpassword)}>
                            <Icon name={showpassword ? "eye" : "eye-slash"} size={16} color="grey" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputRow}>
                        <TextInput
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChangeText={value => handleChange('confirmPassword', value)}
                            style={styles.passwordInput}
                            secureTextEntry={showConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Icon name={showConfirmPassword ? "eye" : "eye-slash"} size={16} color="grey" />
                        </TouchableOpacity>
                    </View>

                    {refresh ?
                        <TouchableOpacity onPress={handleSignup} style={styles.button}>
                            <Text style={styles.buttonText}>Create Account</Text>
                        </TouchableOpacity>
                        :
                        <ActivityIndicator size={'large'} />
                    }
                    <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.linkContainer}>
                        <Text style={styles.linkText}>Already have an account? Log In</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}
