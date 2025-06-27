import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  societyName: {
    color: 'black',
    fontSize: 19,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutIcon: {
    color: '#fff',
    fontSize: 24,
  },

  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    paddingBottom: 180,
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  inputContainer: {
    marginBottom: 5,
  },

  label: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '900',
    color: '#444',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },

  icon: {
    fontSize: 20,
    color: 'green',
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 17,
    color: '#111827',
    paddingVertical: 0,
  },

  multilineInput: {
    height: 40,
    textAlignVertical: 'top',
  },

  dateTimeContainer: {
    marginTop: 12,
    marginBottom: 24,
  },

  dateTimeButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#1e8449',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },

  dateTimeButtonText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 17,
  },

  submitButtonContainer: {
    marginTop: 20,
    marginBottom: 50,
  },

  submitButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 10,
    shadowColor: '#1e8449',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },

  submitButtonText: {
    color: '#fff',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 18,
    letterSpacing: 0.6,
  },

  dropdownTouchable: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },

  dropdownText: {
    fontSize: 16,
    color: '#111827',
  },

  placeholderText: {
    color: '#6b7280',
    fontStyle: 'italic',
  },

  selectedText: {
    color: '#111827',
  },

  dropdownIcon: {
    fontSize: 20,
    color: '#6b7280',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 25,
    maxHeight: '65%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 6,
  }, modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#111827',
  },

  modalItem: {
    backgroundColor:'white',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  modalItemText: {
    fontSize: 17,
    color: '#374151',
  },

  modalCancelText: {
    marginTop: 20,
    color: '#27ae60',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },

  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },

  dateTimeHalfButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#1e8449',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
});

export default styles;
