import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TOURNAMENT, DELETE_TOURNAMENT, UPDATE_TOURNAMENT } from '../apollo/queries';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const LobbyScreen = ({ route }) => {
  const { roomName } = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [participants, setParticipants] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [updatedSettings, setUpdatedSettings] = useState('');
  const [updatedParticipants, setUpdatedParticipants] = useState('');

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const { loading, error, data, refetch } = useQuery(GET_TOURNAMENT, {
    variables: { roomName },
  });

  const [deleteTournamentMutation] = useMutation(DELETE_TOURNAMENT);
  const [updateTournamentMutation] = useMutation(UPDATE_TOURNAMENT);

  const fetchData = useCallback(async () => {
    try {
      const { loading, data } = await refetch();

      if (!loading && data && data.getTournament) {
        setParticipants(data.getTournament.participants);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }, [refetch]);

  useEffect(() => {
    fetchData();
  }, [isFocused, fetchData]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDeleteTournament = async () => {
    try {
      await deleteTournamentMutation({
        variables: {
          roomId: roomName,
        },
      });

      // Show alert upon successful deletion
      Alert.alert('Tournament Deleted', 'The tournament has been deleted.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Error deleting tournament:', error.message);
    }
  };

  const handleUpdateTournament = async () => {
    try {
      await updateTournamentMutation({
        variables: {
          roomId: roomName,
          settings: updatedSettings,
          participants: updatedParticipants.split(','),
        },
      });

      // Refetch data after updating
      refetch();

      // Close the modal after updating
      toggleModal();
    } catch (error) {
      console.error('Error updating tournament:', error.message);
    }
  };


  const handleStartGame = (item) =>{
    if(item.isAdmin)
    console.log("Game Started");
    else console.log("Game can be started by Admin")
  }
  const renderParticipant = ({ item }) => {
    // const isAdminCreator = item.isAdmin && item.userId === data.getTournament.adminId;
  
    return (
      <View
        style={{
          ...styles.card,
          backgroundColor: item.isAdmin ? '#FF5733' : getRandomColor(),
        }}
      >
        <Text style={styles.cardText}>
          {item.isAdmin ? 'Admin: ' : 'Participant: '}
          {item.username}
        </Text>
        {item.isAdmin && (
          <TouchableOpacity style={styles.button} onPress={() => handleStartGame(item)}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lobby Screen - {roomName}</Text>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Update Tournament</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="New Settings"
            value={updatedSettings}
            onChangeText={(text) => setUpdatedSettings(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="New Participants (comma-separated)"
            value={updatedParticipants}
            onChangeText={(text) => setUpdatedParticipants(text)}
          />
          <TouchableOpacity onPress={handleUpdateTournament} style={styles.modalButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {!loading && participants.length > 0 && (
        <>
          <FlatList
            data={participants}
            keyExtractor={(item) => item.userId}
            renderItem={renderParticipant}
          />
          {/* Add buttons for update and delete */}
          <TouchableOpacity onPress={handleDeleteTournament} style={styles.button}>
            <Text style={styles.buttonText}>Delete Tournament</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal} style={styles.button}>
            <Text style={styles.buttonText}>Update Tournament</Text>
          </TouchableOpacity>
       
            <Text>hello</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
});

export default LobbyScreen;
