import React,
{
    useEffect,
    useRef,
}
    from 'react';
import {
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
    View,
}
    from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';


const EventCard = ({ item, index }) => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            delay: index * 100,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, index]);

    return (
        <SafeAreaView>
            <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
                <View style={styles.row}>
                    <Icon name="calendar" size={18} color="#2e7d32" style={styles.icon} />
                    <Text style={styles.title}>{item.event_name}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="map-marker" size={16} color="#666" style={styles.icon} />
                    <Text style={styles.subtitle}>{item.venue}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="clock-o" size={14} color="#555" style={styles.icon} />
                    <Text style={styles.detail}>
                        Start: {new Date(item.event_start_date).toLocaleDateString()} at{' '}
                        {new Date(item.event_start_time).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Icon name="clock-o" size={14} color="#555" style={styles.icon} />
                    <Text style={styles.detail}>
                        End: {new Date(item.event_end_date).toLocaleDateString()} at{' '}
                        {new Date(item.event_end_time).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => navigation.navigate('approvedeventdetails', { event: item })}
                >
                    <Icon name="info-circle" size={14} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.detailButtonText}>View Details</Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    detail: {
        fontSize: 13,
        color: '#555',
    },
    detailButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingVertical: 10,
        backgroundColor: '#2e7d32',
        borderRadius: 5,
    },
    buttonIcon: {
        marginRight: 6,
    },
    detailButtonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 14,
    },
});

export default EventCard;
