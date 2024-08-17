import React from 'react';
import {View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  canceltxt?: string;
  oktext?: string;
}
// This is Custom Alert component
const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  onConfirm,
  canceltxt,
  oktext,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <View style={styles.alertContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.margin}></View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onConfirm} style={styles.btn2}>
                <Text style={styles.btntxt}>
                  {oktext == undefined ? 'Ok' : oktext}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    elevation: 5,
    width: '80%',
  },
  alertContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    top: 8,
  },
  message: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    color: '#000',
    top: 10,
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
    borderTopColor: '#000000',
    borderTopWidth: 0.5,
  },

  btn2: {
    height: 40,
    width: '100%',
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntxt: {
    fontSize: 18,
    color: '#043BB1',
    fontWeight: '900',
  },
  margin: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    margin: 1,
  },
});

export default CustomAlert;
