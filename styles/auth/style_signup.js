/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 20,
        justifyContent: 'center',
        flexGrow: 1
    },
    title: {
        color:'black',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center'
    },
    input: {
        color: 'black',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16
    },
    radioGroup: {
        color:'black',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    radioGroupLabel: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    button: {
        backgroundColor: '#28A745',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    linkContainer: {
        marginTop: 16,
        alignItems: 'center'
    },
    linkText: {
        color: '#28A745',
        fontSize: 14
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },

    passwordInput: {
        flex: 1,
        height: 48,
        paddingRight: 10,
    },

});
