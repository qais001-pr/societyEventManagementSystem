/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable semi */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/auth/authstyle';
import { useAuth } from '../../context/auth/authcontext';
import { ip } from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function LoginScreen() {
    const { login } = useAuth();
    const navigation = useNavigation();
    const [btnlogin, setbtnlogin] = useState(false)
    const [email, setEmail] = useState('rehan123@gmail.com');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false);
    const [showpassword, setshowpassword] = useState(true)


    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Validation Error', 'Please enter both email and password.');
            return;
        }
        setLoading(true);
        setbtnlogin(true);
        try {
            const response = await axios.post(`${ip}/api/users/login`, {
                email,
                password,
            });
            if (response.data.success) {
                var roles = response.data.result[0].roles;
                const data = response.data.result[0]
                // console.log(data)
                login(data)
                switch (roles) {
                    case 'chairperson':
                        navigation.replace('chairpersondashboard');
                        break;
                    case 'assistantdirector':
                        navigation.replace('assisstantdashboard');
                        break;
                    case 'accountsdepartment':
                        navigation.replace('homeaccounts')
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
            setEmail('');
            setPassword('');
            setLoading(false);
            setbtnlogin(false);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: 'black' }]}>Login</Text>
            <TextInput
                placeholder="Type email here...."
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                multiline={false}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <View style={styles.inputRow}>
                <TextInput
                    placeholder="Type password here..."
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={showpassword}
                    style={styles.passwordInput}
                    multiline={false}
                    keyboardType="default"
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setshowpassword(prev => !prev)}>
                    <Icon name={showpassword ? "eye" : "eye-slash"} size={16} color="grey" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={btnlogin}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Log In</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('signup')} style={styles.linkContainer}>
                <Text style={styles.linkText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('forgotpassword')} style={styles.linkContainer}>
                <Text style={styles.linkText}>Forget your password?</Text>
            </TouchableOpacity>
        </View>
    );
}
