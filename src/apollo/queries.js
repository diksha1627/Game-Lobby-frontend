// // MultiplayerGameApp/src/apollo/queries.js
import { gql } from '@apollo/client';

// Query to get a list of users
export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
    }
  }
`;

// Query to get a single user by ID
export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
    }
  }
`;

// Mutation to create a new user
export const CREATE_USER = gql`
  mutation CreateUser($username: String!) {
    createUser(username: $username) {
      id
      username
    }
  }
`;





export const CREATE_TOURNAMENT = gql`
  mutation CreateTournament($creatorUserId: ID!) {
    createTournament(creatorUserId: $creatorUserId) {
      id
      roomId
      creatorUserId
      creatorName
      settings
      participants {
        id
        userId
        username
        isAdmin
      }
    }
  }
`;

export const JOIN_TOURNAMENT = gql`
  mutation JoinTournament($roomId: String!, $userId: ID!, $username: String!) {
    joinTournament(roomId: $roomId, userId: $userId, username: $username) {
      id
      roomId
      creatorUserId
      creatorName
      settings
      participants {
        id
        userId
        username
        isAdmin
      }
    }
  }
`;

export const GET_TOURNAMENT = gql`
query GetTournament($roomName:String!) {
  getTournament(roomId:$roomName) {
    id
    roomId
    creatorUserId
    creatorName
    settings
    participants {
      id
      userId
      username
      isAdmin
    }
  }
}
`;

export const GET_TOURNAMENTS = gql`
  query GetTournaments {
    getTournaments {
      id
      roomId
      creatorUserId
      creatorName
      settings
      participants {
        id
        userId
        username
        isAdmin
      }
    }
  }
`;


export const UPDATE_TOURNAMENT = gql`
  mutation UpdateTournament($roomId: String!, $settings: String, $participants: [ParticipantInput]) {
    updateTournament(roomId: $roomId, settings: $settings, participants: $participants) {
      id
      roomId
      creatorUserId
      creatorName
      settings
      participants {
        id
        userId
        username
        isAdmin
      }
    }
  }
`;


export const DELETE_TOURNAMENT = gql`
  mutation DeleteTournament($roomId: String!) {
    deleteTournament(roomId: $roomId)
  }
`;

// // Add other queries and mutations as needed
