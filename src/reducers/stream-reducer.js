import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_STREAM
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAMS
      return { ...state };
    case DELETE_STREAM
      return _.omit(state, action.payload); // payload is the id itself, no response
    default:
      return state;
  }
}
