// MultiplayerGameApp/src/apollo/subscription.js
import { gql } from '@apollo/client';

export const TOURNAMENT_UPDATED = gql`
  subscription TournamentUpdated($roomId: String!) {
    tournamentUpdated(roomId: $roomId) {
      id
      roomId
      creatorUserId
    #   // Add other fields as needed
    }
  }
`;

// Add other subscriptions as needed
