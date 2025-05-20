/* eslint-disable jsx-quotes */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
//
import React, { useState } from 'react';
import { styles } from '../../styles/assisstantdirector/styles_createsocieties';
import {
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    Alert,
    ScrollView
} from 'react-native';
import { useAuth } from '../../context/auth/authcontext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useSociety } from '../../context/society/societycontext';
import { ip } from '../../config';
const Createsocieties = () => {
    const navigation = useNavigation()
    const { fetchData } = useSociety()
    const { user } = useAuth()
    const user_id = user.user_id
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        budget: "",
        description: '',
    });

    const handleSubmit = async () => {
        const { title, name, budget, description } = formData;
        try {
            await axios.post(`${ip}/api/societies`, { title, name, budget, description, user_id });
            Alert.alert('Added Successfully');
            setFormData({
                title: '',
                name: '',
                budget: '',
                description: '',
            });
            await fetchData();
            navigation.goBack();
        } finally {
        }
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.innerContainer}
                >
                    <Text style={styles.title}>Add Society Details</Text>

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
                    <Text style={styles.charCount}>{formData.budget.length} / 20</Text>

                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder='Type Description here...'
                        placeholderTextColor="#999"
                        multiline
                        maxLength={500}
                        numberOfLines={6}
                        value={formData.description}
                        onChangeText={(text) =>
                            setFormData({ ...formData, description: text })
                        }
                    />
                    <Text style={styles.charCount}>{formData.description.length} / 500</Text>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScrollView >
    );
};

export default Createsocieties;
