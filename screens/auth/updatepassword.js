/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
//
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { styles } from '../../styles/auth/authstyle'
import axios from 'axios'
import { ip } from '../../config'
const Updatepassword = () => {
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setLoading] = useState(false)
    const route = useRoute()
    const { user } = route.params
    const userid = user
    const handleUpdate = async () => {
        setLoading(true)
        try {
            if (password.length < 6) {
                Alert.alert('minimum 6 character')
                return
            }
            if (!password && !confirmpassword) {
                Alert.alert("Fill the fields properly")
                return
            }
            if (password !== confirmpassword) {
                Alert.alert('password not match properly')
                return
            }
            await axios.put(`${ip}/api/users/${userid}'`, { password })
            Alert.alert("Password Update Successfully")
        } catch {
            Alert.alert('Not Update Password')
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <View style={{ width: '98%' }}>
                <Text style={styles.title}>Update Password</Text>
                <TextInput
                    placeholder="New Password"
                    value={password}
                    onChangeText={setpassword}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Confirm New Password"
                    value={confirmpassword}
                    onChangeText={setconfirmpassword}
                    style={styles.input}
                    keyboardType="default"
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={handleUpdate} style={styles.button} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Update Password</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Updatepassword;
