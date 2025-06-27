/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */

import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    Alert,
    ScrollView,
    Modal,
    View,
    KeyboardAvoidingView
} from 'react-native';
import { styles } from '../../styles/assisstantdirector/styles_createsocieties';
import { useAuth } from '../../context/auth/authcontext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useSociety } from '../../context/society/societycontext';
import { ip } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Createsocieties = () => {
    const navigation = useNavigation();
    const { fetchData } = useSociety();
    const { user, logout } = useAuth();
    const user_id = user.user_id;

    const [formData, setFormData] = useState({
        title: '',
        name: '',
        budget: '',
        description: '',
    });

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        const { title, name, budget, description } = formData;

        if (!title || !name || !budget || !description) {
            setErrorMessage('All fields are required.');
            return false;
        }

        if (title.length > 6) {
            setErrorMessage('Title must be at most 6 characters.');
            return false;
        }

        if (name.length > 30) {
            setErrorMessage('Name must be at most 30 characters.');
            return false;
        }

        if (budget.length > 8) {
            setErrorMessage('Budget must be at most 8 characters.');
            return false;
        }

        const budgetValue = parseFloat(budget);
        if (isNaN(budgetValue) || budgetValue <= 0) {
            setErrorMessage('Budget must be a number greater than 0.');
            return false;
        }

        if (description.length > 500) {
            setErrorMessage('Description must be at most 500 characters.');
            return false;
        }

        return true;
    };
    const handleLogout = () => {
        logout();
        navigation.replace('login');
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            setErrorModalVisible(true);
            return;
        }

        try {
            const { title, name, budget, description } = formData;
            await axios.post(`${ip}/api/societies`, { title, name, budget, description, user_id });
            Alert.alert('Added Successfully');
            setFormData({ title: '', name: '', budget: '', description: '' });
            await fetchData();
            navigation.goBack();
        } catch (error) {
            setErrorMessage('An error occurred while submitting the form.');
            setErrorModalVisible(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Assisstant Director </Text>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                        <Ionicons name="log-out-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>Add Society Details</Text>
                    {/* Title */}
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Type Title here...'
                        placeholderTextColor="#999"
                        value={formData.title}
                        maxLength={6}
                        onChangeText={(text) =>
                            setFormData({ ...formData, title: text })
                        }
                    />
                    <Text style={styles.charCount}>{formData.title.length} / 6</Text>

                    {/* Name */}
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Type Name here...'
                        placeholderTextColor="#999"
                        value={formData.name}
                        maxLength={30}
                        onChangeText={(text) =>
                            setFormData({ ...formData, name: text })
                        }
                    />
                    <Text style={styles.charCount}>{formData.name.length} / 30</Text>

                    {/* Budget */}
                    <Text style={styles.label}>Budget</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Type Budget here...'
                        inputMode='numeric'
                        placeholderTextColor="#999"
                        value={formData.budget}
                        maxLength={20}
                        onChangeText={(text) =>
                            setFormData({ ...formData, budget: text })
                        }
                    />
                    <Text style={styles.charCount}>{formData.budget.length} / 8</Text>

                    {/* Description */}
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder='Type Description here...'
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={6}
                        maxLength={500}
                        value={formData.description}
                        onChangeText={(text) =>
                            setFormData({ ...formData, description: text })
                        }
                    />
                    <Text style={styles.charCount}>{formData.description.length} / 500</Text>

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Error Modal */}
            <Modal
                transparent
                animationType="fade"
                visible={errorModalVisible}
                onRequestClose={() => setErrorModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Validation Error</Text>
                        <Text style={styles.modalMessage}>{errorMessage}</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setErrorModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Createsocieties;
