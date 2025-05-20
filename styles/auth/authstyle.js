/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        color:'black',
    },
    button: {
        backgroundColor: '#28A745',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center'
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
        color:'black',
        flex: 1,
        height: 48,
        paddingRight: 10,
    },

});
