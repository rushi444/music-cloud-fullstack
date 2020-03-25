import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from '@emotion/styled';

import { UserContext } from '../../App';
import { GET_TRACKS_QUERY } from '../Pages/Dashboard';

export const DeleteTrack = ({ track }) => {
  const [deleteTrack] = useMutation(DELETE_TRACK_MUTATION, {
    variables: { trackId: track.id },
    refetchQueries: [{ query: GET_TRACKS_QUERY }],
  });

  const currentUser = useContext(UserContext);
  const isCurrentUser = (currentUser && currentUser.id) === track.postedBy.id;

  return isCurrentUser && <DeleteButton onClick={deleteTrack}>delete</DeleteButton>;
};

const DELETE_TRACK_MUTATION = gql`
  mutation($trackId: Int!) {
    deleteTrack(trackId: $trackId) {
      trackId
    }
  }
`;

const DeleteButton = styled.button`
cursor: pointer;
  border: none; 
  color: white;
  background-color: #45a29e;
  font-size: 22px; 
  padding: 1%;
  border-radius: 5px; 
`;
