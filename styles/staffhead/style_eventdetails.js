import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { backgroundColor: '#f0f0f0' },
    header: { padding: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
    title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
    subtitle: { fontSize: 16, color: '#e0e0e0' },
    card: { backgroundColor: '#fff', borderRadius: 16, margin: 20, padding: 20, elevation: 5 },
    statusBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
    statusText: { fontSize: 14, fontWeight: 'bold', color: '#333', textTransform: 'capitalize' },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 6, color: '#333' },
    description: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 10 },
    detailRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
    detailText: { marginLeft: 10, color: '#555', fontSize: 15, flex: 1 },
    inputContainer: { marginTop: 15 },
    inputLabel: { fontSize: 14, marginBottom: 6, color: '#666' },
    input: { backgroundColor: '#f9f9f9', borderColor: '#ddd', borderWidth: 1, borderRadius: 10, padding: 10, minHeight: 80, textAlignVertical: 'top', fontSize: 14, color: '#333' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    buttonWrapper: { flex: 1, marginHorizontal: 5, borderRadius: 12, overflow: 'hidden' },
    button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15, marginLeft: 8 },
});
