import React,{ Component } from 'react';
import {connect} from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        // console.log(formValues);
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render(){
        // console.log(this.props);
        if(!this.props.stream){
            return <h1>Loading...</h1>;
        }
    return ( 
        <div>
            <h3>Edit a Stream</h3>
            {/* if we pass initalvalues={this.props.stream} then it eill send id and userid as well. inorder to avoid that we can only send the needed data, so we use lodash for make our life easier*/}
            <StreamForm 
            initialValues={_.pick(this.props.stream,'title','description')}
            onSubmit={this.onSubmit}/>
        </div>
     );
    }
};

//so inorder to acces the props which is inside the StreamEdit component, mapStateToProps is actually called with state , as well as ownProps which will give access to the props inside the StreamEdit component

const mapStateToProps = (state, ownProps) => {
    // console.log("  inside mapStatToProps: "+ ownProps.match.params.id);
    return { stream: state.streams[ownProps.match.params.id] };
}
 
export default connect(mapStateToProps,{ fetchStream, editStream })(StreamEdit);