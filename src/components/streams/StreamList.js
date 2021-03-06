import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';


const StreamList = ({fetchStreams,streams,currentUserId,isSignedIn}) => {

    useEffect(() => {
        function callFetchStreams(){
            fetchStreams();
        }
        callFetchStreams();
    },[fetchStreams]);


    const renderAdmin = (stream) => {
        if(stream.userId === currentUserId){
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            );
        }
    }
    
    const renderCreateButton = () => {
        if(isSignedIn){
            return(
                <div style={{textAlign:'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    const renderList = () =>{
        return streams.map(stream => {
            return(
                <div className="item" key={stream.id}>
                    {/* need to call the renderAdmin, because of the semantic ui to work properly */}
                    {renderAdmin(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">
                            {stream.description}
                        </div>
                        {/* {renderAdmin(stream)} */}
                    </div>
                </div>
            )
        })
    }
    
        

    return ( 
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">
                {renderList()}
            </div>
            {renderCreateButton()}
        </div>
     );
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);