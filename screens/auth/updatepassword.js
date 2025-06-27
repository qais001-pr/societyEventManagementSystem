/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
//
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import { ip } from '../../config'
import { useNavigation } from '@react-navigation/native'

const Updatepassword = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const route = useRoute()
    const { user } = route.params
    const userId = user

    const handleUpdate = async () => {
        if (!password || !confirmPassword) {
            Alert.alert("Please fill in all fields")
            return
        }
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters')
            return
        }
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match')
            return
        }

        setLoading(true)
        try {
            await axios.put(`${ip}/api/users/${userId}`, { password })
            Alert.alert("Password updated successfully")
            navigation.replace('login')
        } catch (error) {
            Alert.alert('Failed to update password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
        }}>
            <View style={{ width: '100%' }}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: 30,
                    textAlign: 'center'
                }}>
                    Update Password
                </Text>

                <TextInput
                    placeholder="New Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 15,
                        marginBottom: 20,
                        fontSize: 16
                    }}
                />

                <TextInput
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 15,
                        marginBottom: 30,
                        fontSize: 16
                    }}
                />

                <TouchableOpacity
                    onPress={handleUpdate}
                    disabled={loading}
                    style={{
                        backgroundColor: loading ? '#999' : 'green',
                        paddingVertical: 15,
                        borderRadius: 8,
                        alignItems: 'center'
                    }}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                            fontWeight: '600'
                        }}>
                            Update Password
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Updatepassword;
