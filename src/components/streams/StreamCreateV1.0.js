import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
//redux form does the connection and, mapstoprops all those stuffs automatically.

class StreanCreate extends Component {
    //error and touched are the only property we needed, so we destructure it as below.
    renderError({ error, touched }){
        // console.log("value of touched is: " + touched);
        if(error && touched){
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }
    //we can further reduce this by destructuring input as follows
    // renderInput(formProps){
    //     return <input {...formProps.input}/>
    // }

    //render input should be an arrow function, otherwise when we call this.renderError it will give error because of "this".
    renderInput = ({input,label,meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error':''}`;
        // return <input onChange={formProps.input.onChange} value={formProps.input.value}/>;
        // console.log(meta);
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} /> 
                {this.renderError(meta)}
            </div>
        );
    }

    //event.preventdefault is automatically called by handlesubmit method in redux-form

    // onSubmit(event){
    //     event.preventDefault();
    // }

    onSubmit = (formValues) => {
        // console.log("succesful submit:" + JSON.stringify(formValues));
        this.props.createStream(formValues);
    }

    render() { 
        // console.log(this.props);
        return ( 
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                {/* when additional props are passed like label= <Field/> doesnt know what to do, so it will send to renderInput, we can receive that in renderInput as shown above */}
                <Field name="title" component={this.renderInput} label="Enter title"/>
                <Field name="description" component={this.renderInput} label="Enter description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

//so this function is for validation purpose, this is defined outside rather than inside the class
//form is initially rendered or user interact with the form, validate method is automatically called,we just need to define that validate function as below.

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        //if ther is no title entered
        errors.title = 'You must enter a title';
    }
    if(!formValues.description){
        errors.description = "You muast enter a description";
    }
    return errors;
};

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate
})(StreanCreate);

export default connect(null,{ createStream })(formWrapped);