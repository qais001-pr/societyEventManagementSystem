/* eslint-disable quotes */
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'green',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headertext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    logout: {
        padding: 5,
    },
    btnlogout: {
        color: 'white',
    },
    modalBackground: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional dim background
},
activityIndicatorWrapper: {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  elevation: 10,
  alignItems: 'center',
  justifyContent: 'center',
},

});
