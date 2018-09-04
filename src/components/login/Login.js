import React from 'react';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/firebase';
import { State } from 'react-powerplug'
import { Button } from 'antd';

import * as myStyle from './Style';
// Get Redux stuff
import { authLogin, authLogout, startLogin, startEmailRegistration, AUTH_WORKING } from '../../store/auth';
import { startInitializeData } from '../../store/tvShows';

// Import Components
import LoginForm from './LoginForm';
import LoadingPage from '../common/LoadingPage';

class Login extends React.Component {
  state = {
    isRegistering: false
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //Store the uid (user id) in our store
          this.props.authLogin({uid: user.uid, email: user.email});
          // Initialize the TV Node of the store with data from firebase
          this.props.startInitializeData(user.uid);
          this.props.history.push('/');
        } else {
          this.props.authLogout();
          this.props.history.push('/login');
        }
      });
  }
  render() {
    let jsx;
      {this.props.isWorking ? 
        jsx = <LoadingPage />  
      :
        jsx = (
          <myStyle.LoginWrapper>
          {this.props.isError ? <div style={{color: "red"}}>Error: {this.props.error.code}</div> : null}
          <State initial={{ email: '', password: '', confirmPassword: '' }}>
            {({ state, setState }) => {
              const onEmailUpdate = data => setState({ email: data.target.value })
              const onPasswordUpdate = data => setState({ password: data })
              const onConfirmPasswordUpdate = data => setState({ confirmPassword: data })
            
              return (
                <LoginForm data={state} 
                  onEmailUpdate={onEmailUpdate} 
                  onPasswordUpdate={onPasswordUpdate} 
                  onConfirmPasswordUpdate={onConfirmPasswordUpdate} 
                  isRegistering={this.state.isRegistering}
                  startLogin={this.props.startLogin}
                  startEmailRegistration={this.props.startEmailRegistration}
                />
              )
            }}
          </State>
          <div className={myStyle.registerLink}>
            <a onClick={() => this.setState((prevState) => ({ isRegistering: !prevState.isRegistering }))} >
              { this.state.isRegistering ? 'Back to Login' : 'Register' }
            </a>
          </div>
          </myStyle.LoginWrapper>
        )    
      }
      return jsx;
  }
}

const mapStateToProps = (state) => {
  return (
    { 
      isWorking: state.auth.status === AUTH_WORKING ? true : false,
      isError: state.auth.status === "ERROR" ? true : false,
      error: state.auth.message
    }
  );
};

export default connect(mapStateToProps, 
  { authLogin, 
    authLogout, 
    startLogin,
    startEmailRegistration,
    startInitializeData})(Login);

    