/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/auth/authstyle';
import { useAuth } from '../../context/auth/authcontext';
import { useSociety } from '../../context/society/societycontext';
import axios from 'axios';
import { ip } from '../../config';

export default function LoginScreen() {
    const navigation = useNavigation();
    const { setsociety_id } = useSociety();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [btnLogin, setBtnLogin] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Validation Error', 'Please enter both email and password.');
            return;
        }

        setLoading(true);
        setBtnLogin(true);

        try {
            const response = await axios.post(`${ip}/api/users/login`, { email, password });
            if (response.data.success) {
                const data = response.data.result[0];
                const roles = data.roles;
                setsociety_id(data.society_id);
                login(data);

                switch (roles) {
                    case 'chairperson':
                        navigation.replace('SocietyChairpersonhomescreen');
                        break;
                    case 'assistantdirector':
                        navigation.replace('assisstantdashboard');
                        break;
                    case 'accountsdepartment':
                        navigation.replace('homeaccounts');
                        break;
                    case 'staffhead':
                        navigation.replace('homestaffheadpage');
                        break;
                    case 'ithead':
                        navigation.replace('itdashboard');
                        break;
                    default:
                        Alert.alert('Error', 'Unknown user role.');
                }
            } else {
                Alert.alert('Login Failed');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
            setBtnLogin(false);
            setEmail('');
            setPassword('');
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    {/* <ImageBackground
                        source={require('../../assets/images/Imagebg.jpg')}
                        resizeMode="stretch"
                        style={{ flex: 1 }}
                    > */}
                    {/* Top Section with Logo */}
                    <View style={styles.topContainer}>
                        <Image source={require('../../assets/images/Logo.png')} style={styles.logoImage} height="150%" />
                    </View>

                    {/* Login Form Section */}
                    <View style={styles.formContainer}>
                        <Text style={styles.loginTitle}>Login</Text>
                        <Text style={styles.subText}>Sign in to continue.</Text>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            placeholder="abc123@gmail.com"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />

                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                placeholder="******"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={showPassword}
                                style={styles.passwordInput}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={18} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={btnLogin}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.loginButtonText}>Log in</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('forgotpassword')}>
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                            <Text style={styles.forgotText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    {/* </ImageBackground> */}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
