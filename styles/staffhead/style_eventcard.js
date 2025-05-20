/* eslint-disable quotes */
import { StyleSheet } from "react-native";
export const localStyles = StyleSheet.create({
  itemBox: {
    flexDirection:'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 13,
    color: '#444',
  },
});
