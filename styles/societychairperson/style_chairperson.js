/* eslint-disable quotes */
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#2E8B57',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
    },
    logoutButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#3A5F0B',
    },
    logoutIcon: {
        fontSize: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#FAFAFA',
    },
    iconStyle: {
        marginRight: 12,
        color: '#757575',
    },
    inputStyle: {
        flex: 1,
        height: 48,
        fontSize: 15,
        color: '#424242',
        paddingVertical: 0,
    },
    submitButton: {
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 8,
        overflow: 'hidden',
    },
    dropdownContainer: {
        marginHorizontal: 16,
        marginTop: 3,
        width: '92%',
    },
    dropdown: {
        height: 50,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: '#FAFAFA',
    },
    dropdownIcon: {
        marginRight: 10,
    },
    placeholderStyle: {
        fontSize: 15,
        color: '#888',
    },
    selectedTextStyle: {
        fontSize: 15,
        color: '#424242',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 15,
        color: '#424242',
    },
});

export default styles;
