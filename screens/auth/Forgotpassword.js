/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
//
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/auth/authstyle';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ip } from '../../config';
export default function Forgotpassword() {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${ip}/api/users/forgot-password`, { email });
      setEmail('');
      const userid = response.data.result[0].user_id;
      navigation.navigate('updatepassword', { user: userid })
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <View style={{ width: '100%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
          Forgot your Account Password?
        </Text>
        <TextInput
          placeholder="Type email here..."
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handleFetch} style={styles.button} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
