import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component{

    // state = {
    //     isSignedIn:null
    // };

    componentDidMount(){
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: '907492833966-hq1qd1qfjtvjkbi0pog2nmmfchva15qf.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // console.log("inside componentDidMount:" + this.auth.isSignedIn.get());
                // this.setState({ isSignedIn: this.auth.isSignedIn.get()});
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
       
    }
    //instantly change the state based on signed in status

    //this call back function is called with a boolean argument, so we can change oauth to use that argument to get the signed in status
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }
    
    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        }
        else if(this.props.isSignedIn){
            // console.log(this.props.isSignedIn);
            return (
            <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon"/>Sign Out</button>
            );
        }
        else{
            // console.log(this.state.isSignedIn);
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>Sign in with Google</button>
            );
            
        }
    }

    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);