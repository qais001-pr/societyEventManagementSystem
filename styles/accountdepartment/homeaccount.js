import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    welcomeText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'darkgreen',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        marginLeft: 6,
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
    listContainer: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 12,
    },
    cardList: {
        paddingBottom: 100,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 16,
        color: '#888',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 10, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});

export const localStyles = StyleSheet.create({
    dropdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: 12,
        gap: 10,
    },
    dropdownButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 10,
    },
    dropdownButtonText: {
        fontSize: 14,
        color: '#333',
    },
    budgetBox: {
        flexShrink: 0,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: '#f0f9f2',
        borderRadius: 10,
        borderColor: '#cce5cc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    budgetText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2E8B57',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
    },
    closeModalButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeModalText: {
        fontSize: 14,
        color: '#000',
    },
});
