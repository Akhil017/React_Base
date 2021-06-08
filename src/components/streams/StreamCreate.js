import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

//redux form does the connection and, mapstoprops all those stuffs automatically.

class StreanCreate extends Component {
    
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    render() { 
        return ( 
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default connect(null,{ createStream })(StreanCreate);