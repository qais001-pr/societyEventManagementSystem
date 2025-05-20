/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 15
    },
    headerText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    tab: { paddingVertical: 10 },
    tabText: { color: '#555' },
    activeTab: { borderBottomWidth: 2, borderBottomColor: 'green' },
    activeTabText: { color: 'green', fontWeight: 'bold' },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    dropDown: {
        marginLeft: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    dropDownText: { fontSize: 12 },
    calendarIcon: { marginLeft: 8 },
    cardList: { padding: 10 },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4afcb4',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10
    },
    cardLeft: {},
    cardTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
    venueText: { alignSelf: 'center', fontWeight: '600' }
});
