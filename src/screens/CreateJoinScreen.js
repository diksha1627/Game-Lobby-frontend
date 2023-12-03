// CreateJoinScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CREATE_TOURNAMENT, JOIN_TOURNAMENT, GET_TOURNAMENTS } from '../apollo/queries';
import { useQuery, useMutation } from '@apollo/client';

const CreateJoinScreen = ({ navigation, route }) => {
  const { username, userId } = route.params || {};
  const [roomId, setRoomId] = useState('');
  const [roomName, setRoomName] = useState('');

  const { loading: tournamentsLoading, data: tournamentsData } = useQuery(GET_TOURNAMENTS);

  const [createTournament] = useMutation(CREATE_TOURNAMENT, {
    onCompleted: (data) => {
      console.log('Tournament created:', data);
      setRoomId(data.createTournament.roomId);
    },
    onError: (error) => {
      console.error('Error creating tournament:', error);
    },
  });

  const handleCreateTournament = async () => {
    try {
      const response = await createTournament({
        variables: { creatorUserId: userId },
      });
      setRoomId(response.data.createTournament.roomId);
    } catch (error) {
      console.error('Error creating tournament:', error);
    }
  };

  const [joinTournament] = useMutation(JOIN_TOURNAMENT, {
    onCompleted: (data) => {
      console.log('Joined tournament:', data);
      setRoomId(data.joinTournament.roomId);
      navigation.navigate('Lobby', { roomName });
    },
    onError: (error) => {
      console.error('Error joining tournament:', error);
    },
  });

  const handleJoinTournament = async () => {
    try {
      if (tournamentsData && tournamentsData.getTournaments) {
        // Assuming you want to join the first available tournament
        await joinTournament({
          variables: {
            roomId: roomName,
            userId: userId,
            username: username,
          },
        });
      }
    } catch (error) {
      console.error('Error joining tournament:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3498db' }}>
      <Text style={{ fontSize: 20, color: '#fff', marginBottom: 20 }}>
        Create Tournament Room / Join Tournament Room
      </Text>

      <TouchableOpacity
        style={{ backgroundColor: '#9b59b6', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginBottom: 10 }}
        onPress={handleCreateTournament}
      >
        <Text style={{ color: '#fff' }}>Create Tournament</Text>
      </TouchableOpacity>

      <TextInput
        style={{ width: 200, borderBottomWidth: 1, borderColor: '#fff', marginBottom: 20, color: '#fff' }}
        placeholder="Enter Room Name To Join"
        value={roomName}
        onChangeText={(text) => setRoomName(text)}
      />

      <TouchableOpacity
        style={{ backgroundColor: '#2ecc71', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}
        onPress={handleJoinTournament}
      >
        <Text style={{ color: '#fff' }}>Join Tournament</Text>
      </TouchableOpacity>

      {roomId ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: '#fff' }}>Room ID: {roomId}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default CreateJoinScreen;
