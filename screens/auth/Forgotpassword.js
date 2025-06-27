/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
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
      navigation.navigate('updatepassword', { user: userid });
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <View
        style={{
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: '#000',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          Forgot Password?
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#666',
            textAlign: 'center',
            marginBottom: 25,
          }}
        >
          Enter your email address to reset your password.
        </Text>

        <TextInput
          placeholder="Type email here..."
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            backgroundColor: '#F0F0F0',
            padding: 14,
            borderRadius: 10,
            fontSize: 16,
            marginBottom: 20,
            color: '#000',
          }}
        />

        <TouchableOpacity
          onPress={handleFetch}
          disabled={loading}
          style={{
            backgroundColor: 'green',
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
