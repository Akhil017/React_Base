import _ from 'lodash';
import { 
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

const streamReducers = (state = {}, action) => {
    switch(action.type){
        case FETCH_STREAMS:
            // console.log("inside FETCH_STREAMSSS" + action.payload);
            //.mapkeys convert array to object, mapKeys return big object, we need to take all key value pair from that object and add them to new object, that is why we are using spread operator
            return {...state, ..._.mapKeys(action.payload,'id')};
        case FETCH_STREAM:
            return { ...state, [action.payload.id]:action.payload};
        case CREATE_STREAM:
            return {...state, [action.payload.id]:action.payload};
        case EDIT_STREAM:
            return {...state, [action.payload.id]:action.payload};
        case DELETE_STREAM:
            return _.omit(state,action.payload);
        default:
            // console.log("inside default");
            return state;
    }
};

export default streamReducers;