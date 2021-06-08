import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component{
    
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    //here we use React.Fragment because if we use div, then it will affect our styling.
    renderActions(){
        const id = this.props.match.params.id;
        //we can also do this way, destructuring id as such.
        // const {id} = this.props.match.params;
        return (
        <React.Fragment>
            {/* we cant directly call on onClick, because it will execute whenwever the page render, so we user arrow function, our life saver. */}
            <button className="ui button negative" onClick={() => this.props.deleteStream(id)}>Delete</button>
            <Link to="/" className="ui button">Cancel</Link>
            {/* here we can use an onclick event(programatic routing as well) */}
        </React.Fragment>
    )
    }

    renderContent(){
        if(!this.props.stream){
            return(
                <React.Fragment>
                    Are you sure you want to delete this Stream?
                </React.Fragment>
            )
        }
        return(
            <React.Fragment>
                Are you sure you want to delete: <b>{this.props.stream.title}</b>?
            </React.Fragment>
        )
        
    }

    render(){
        // console.log(this.props);
        if(!this.props.stream){
            return <h1>Loading...</h1>;
        }
        return (
            <Modal
            title="Delete Stream"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={() => history.push('/')}
            />
        );
    }
}
//ownProps are the props which is inside the component.
const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{ fetchStream, deleteStream })(StreamDelete);