import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff', // white background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#27ae60', // green header
        padding: 15,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        padding: 20,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        color: '#000',
    },
    multilineInput: {
        height: 60,
        textAlignVertical: 'top',
    },
    icon: {
        fontSize: 18,
        color: 'green',
        marginRight: 10,
    },

    dateTimeContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    dateTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    dateTimeButtonHalf: {
        flex: 1,
        padding: 12,
        backgroundColor: '#27ae60', // green background
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    dateTimeButtonText: {
        fontSize: 14,
        color: '#fff', // white text on green
        fontWeight: '500',
    },

    submitButtonContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#2ecc71', // lighter green for button
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Dropdown
    inputContainer: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    dropdownTouchable: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    dropdownText: {
        fontSize: 16,
        color: '#000',
    },
    selectedText: {
        color: '#27ae60',
    },
    placeholderText: {
        color: '#7f8c8d',
    },
    dropdownIcon: {
        fontSize: 16,
        color: '#7f8c8d',
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#27ae60', // green title
    },
    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#ecf0f1',
    },
    modalItemText: {
        fontSize: 16,
        color: '#34495e',
    },
    modalCancelText: {
        marginTop: 20,
        color: '#e74c3c',
        textAlign: 'center',
        fontWeight: '600',
    },
});
