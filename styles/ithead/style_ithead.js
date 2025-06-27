import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f1f5f9',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#2e7d32',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
    },
    logoutButton: {
        backgroundColor: '#1b5e20',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    logoutText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f9f9f9',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
    activeTab: {
        backgroundColor: '#4caf50',
    },
    tabText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#fff',
        fontWeight: '700',
    },
    dropdownTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#388e3c',
        elevation: 4,
    },
    dropdownTriggerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    dropdownIcon: {
        marginLeft: 8,
    },
    eventList: {
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    emptyEventsText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
        fontSize: 18,
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '85%',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
        color: '#2e7d32',
    },
    modalItem: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
    },
    modalCloseButton: {
        marginTop: 15,
        alignSelf: 'center',
        backgroundColor: '#2e7d32',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
    },
    modalCloseButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});
