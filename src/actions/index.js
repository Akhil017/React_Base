import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';
import streams from '../apis/streams';
import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

//we need to attach the user is too so that we can implement delete and edit stream option if the stream is created by the user. so we can access to get state
export const createStream = (formValues) => async (dispatch,getState) => {
    const {userId} = getState().auth;
    const response = await streams.post('/streams',{...formValues,userId});//spread makes my life easier
    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');
};

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get('/streams');
    // console.log("inside fetchStreams reducers: " + JSON.stringify(response.data));
    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data});
}

export const editStream = (id, formValues) => async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data});
    history.push('/');
}

export const deleteStream = (id) => async (dispatch) => {
    await streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id});
    history.push('/');
}