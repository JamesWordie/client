import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from '../actions/types';
import _ from 'lodash';

const streamReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCH_STREAMS:
      // mapKeys returns an object where the id is key and the data is each stream object,
      // ...spread is then creating a new object with the current state and the new object from mapKeys
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload); // payload is the id itself, no response
    default:
      return state;
  }
};

export default streamReducer;
