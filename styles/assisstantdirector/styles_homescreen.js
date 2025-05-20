/* eslint-disable quotes */
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 15,
    },
    headerText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    logoutButton: { padding: 5 },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
    },
    tab: { paddingVertical: 10 },
    tabText: { color: '#555' },
    activeTab: { borderBottomWidth: 2, borderBottomColor: 'green' },
    activeTabText: { color: 'green', fontWeight: 'bold' },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    searchButton: {
        marginLeft: 8,
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownWrapper: {
        marginLeft: 8,
        flex: 1,
        zIndex: 1000,
    },
    dropdown: {
        borderColor: '#ccc',
    },
    dropdownContainer: {
        borderColor: '#ccc',
    },
    dropdownText: {
        fontSize: 14,
    },
    infoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    infoBox: {
        flexBasis: '30%',
        minWidth: 110,
        paddingVertical: 4,
    },
    infoText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    cardList: {
        padding: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'black',
    },
    footerSpace: {
        marginBottom: '15%',
    },
});

export default styles;
