/* eslint-disable quotes */
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    header: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 100,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#28a745',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    logoutText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: '500',
        fontSize: 16,
    },
     emptyText: { textAlign: 'center', marginTop: 20, color: 'black' },
});
