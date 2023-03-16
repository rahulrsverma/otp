
 import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert,TouchableOpacity,Modal  } from 'react-native';

export default function App() {
  const handleEditEmail = (text) => {
  const newUserList = [...userList];
  newUserList[editingUser].email = text;
  setUserList(newUserList);
};

const handleEditPhoneNumber = (text) => {
  const newUserList = [...userList];
  newUserList[editingUser].phoneNumber = text;
  setUserList(newUserList);
};

const handleSaveUser = () => {
  setEditingUser(null);
};

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [userList, setUserList] = useState([]);
const [editingUser, setEditingUser] = useState(null);

  const handleEmailChange = (text) => setEmail(text);
  const handlePhoneNumberChange = (text) => setPhoneNumber(text);
  const handleOtpChange = (text) => setOtp(text);
const handleEditUser = (index) => {
  setEditingUser(index);
};

  const handleAddUser = () => {
    if (validateInputs()) {
      const newUser = {
        email,
        phoneNumber,
      };
      setUserList([...userList, newUser]);
      setEmail('');
      setPhoneNumber('');
      setOtp('');
    }
  };

  const validateInputs = () => {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const otpRegex = /^\d{4}$/;

    if (!emailRegex.test(email) && !phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Input', 'Please enter a valid email or mobile number');
      return false;
    }
    if (!otpRegex.test(otp)) {
      Alert.alert('Invalid OTP', 'Please enter a valid OTP');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Text style={styles.title}>Enter your email or mobile number:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleEmailChange}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
          placeholder="Mobile number"
          keyboardType="phone-pad"
        />
        <Button title="Submit" onPress={handleAddUser} />
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>Enter OTP:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleOtpChange}
          value={otp}
          placeholder="OTP"
          keyboardType="numeric"
        />
        <Text style={styles.otpText}>OTP: 9999</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>User List:</Text>
        
        {userList.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Email</Text>
              <Text style={styles.tableHeader}>Mobile Number</Text>
            </View>
            

           {userList.map((user, index) => (
  <View style={styles.tableRow} key={index}>
    <Text style={styles.tableCell}>{user.email}</Text>
    <Text style={styles.tableCell}>{user.phoneNumber}</Text>
    <TouchableOpacity onPress={() => handleEditUser(index)}>
      <Text style={styles.editButton}>Edit</Text>
    </TouchableOpacity>
  </View>
))}
          </View>
        ) : (
          <Text>No users found.</Text>
        )}
      </View>
      {editingUser !== null && (
  <Modal visible={editingUser !== null}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Edit User</Text>
      <TextInput
        style={styles.modalInput}
        onChangeText={(text) => handleEditEmail(text)}
        value={userList[editingUser].email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.modalInput}
        onChangeText={(text) => handleEditPhoneNumber(text)}
        value={userList[editingUser].phoneNumber}
        placeholder="Mobile number"
        keyboardType="phone-pad"
      />
      <Button title="Save" onPress={() => handleSaveUser()} />
      <Button title="Cancel" onPress={() => setEditingUser(null)} />
    </View>
  </Modal>
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'F0F8FF',
},
slide: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
},
title: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 10,
},
input: {
height: 40,
width: '80%',
borderColor: 'gray',
borderWidth: 1,
borderRadius: 5,
marginBottom: 10,
paddingLeft: 10,
},
otpText: {
fontSize: 16,
fontWeight: 'bold',
marginTop: 20,
},
table: {
borderWidth: 1,
borderColor: 'gray',
borderRadius: 5,
marginTop: 20,
overflow: 'hidden',
},
tableRow: {
flexDirection: 'row',
alignItems: 'center',
},
tableHeader: {
backgroundColor: '#F0F8FF',
padding: 10,
fontWeight: 'bold',
flex: 1,
textAlign: 'center',
borderRightWidth: 1,
borderColor: 'gray',
},
tableCell: {
padding: 10,
flex: 1,
textAlign: 'center',
borderRightWidth: 1,
borderColor: 'gray',
},
}); 
