import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    topContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 100,
    },
    logoImage: {
        width: 170,
        height: 170,
        resizeMode: 'contain',
        marginTop: 50,
    },
    formContainer: {
        height: '70%',
        marginTop: 70,
        backgroundColor: '#CAD1CA',
        paddingHorizontal: 25,
        paddingTop: 60,
        borderTopLeftRadius: 40,
        // marginTop: -50,
    },
    loginTitle: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#111',
        textAlign: 'center',
    },
    subText: {
        textAlign: 'center',
        color: '#111',
        fontSize: 19,
        marginBottom: 30,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#777',
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        backgroundColor: '#E9E9E9',
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
    },
    loginButton: {
        backgroundColor: 'green',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    forgotText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#111',
        marginBottom: 5,
    },
    signupText: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
    },
});
