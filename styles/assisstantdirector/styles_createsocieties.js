/* eslint-disable quotes */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // Root container
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 15,
    },
    headerText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    logoutButton: { padding: 5 },
    // Form wrapper
    innerContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },

    // Title at top
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        color: '#228B22', // forest green tone for polish
    },

    // Labels for fields
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        marginTop: 16,
        color: '#333',
    },

    // Common input style
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 6,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 60,
        flexGrow: 1,
        justifyContent: 'center',
    },

    // Multiline input
    multilineInput: {
        height: 110,
        textAlignVertical: 'top',
    },

    // Character counter
    charCount: {
        alignSelf: 'flex-end',
        marginBottom: 10,
        fontSize: 12,
        color: '#888',
    },

    // Submit button
    button: {
        backgroundColor: '#228B22',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },

    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    },

    // Modal background layer
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    // Modal container box
    modalContainer: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 22,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        elevation: 6,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#222',
    },

    modalMessage: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        marginBottom: 20,
    },

    modalButton: {
        backgroundColor: '#007BFF',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },

    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
