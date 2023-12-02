import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { GET_USERS, CREATE_USER } from '../apollo/queries';
import { useMutation } from '@apollo/client';

const CreateUserScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleCreateUser = async () => {
    try {
      const response = await createUser({ variables: { username } });
      const userId = response.data.createUser.id;
  
      // Optionally, you can navigate to another screen or perform any other action after creating the user.
      navigation.navigate('CreateJoin', { username, userId });
    } catch (error) {
      console.error(error);
    }
    
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3498db' }}>
      <Text style={{ fontSize: 20, color: '#fff', marginBottom: 20 }}>
        Create
      </Text>
      <TextInput
        style={{ width: 200, borderBottomWidth: 1, borderColor: '#fff', marginBottom: 20, color: '#fff' }}
        placeholder="Enter your username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TouchableOpacity
        style={{ backgroundColor: '#2ecc71', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginBottom: 10 }}
        onPress={handleCreateUser}
      >
        <Text style={{ color: '#fff' }}>Create User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateUserScreen;
