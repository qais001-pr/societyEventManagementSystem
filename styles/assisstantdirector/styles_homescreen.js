import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6f8',
        paddingBottom: 20,
    },

header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2e7d32', // ✅ Rich professional green
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 5,               // Android shadow
    shadowColor: '#000',        // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
},

headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    paddingRight: 10,
},

headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
},

searchInputHeader: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333333',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
},

iconRight: {
    marginLeft: 15,
},

iconButton: {
    padding: 8,
    marginLeft: 10,
},


    // Tabs
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#e0e0e0',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cfd8dc',
    },
    tab: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#c8e6c9',
    },
    activeTab: {
        backgroundColor: '#2e7d32',
    },
    tabText: {
        color: '#2e7d32',
        fontSize: 14,
        fontWeight: '600',
    },
    activeTabText: {
        color: '#fff',
    },

    // Dropdown Button
    responsiveDropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#cfd8dc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 15,
    },
    responsiveDropdownText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },

    // Info Section
    infoContainer: {
        marginHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#e8f5e9',
        padding: 12,
        borderRadius: 8,
        elevation: 2,
    },
    infoBox: {
        marginBottom: 6,
    },
    infoText: {
        fontSize: 14,
        color: '#1b5e20',
        fontWeight: '600',
    },

    // Error & Empty
    errorText: {
        textAlign: 'center',
        color: 'red',
        marginTop: 15,
        fontSize: 16,
        fontWeight: '500',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },

    // Footer space
    footerSpace: {
        height: 100,
    },

    // Modal
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: width * 0.85,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    closeButton: {
        padding: 5,
    },
    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
    },
});

export default styles;
