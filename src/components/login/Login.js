import React from 'react';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/firebase';
import { State } from 'react-powerplug'

// Get Redux stuff
import { authLogin, authLogout, startLogin, AUTH_WORKING } from '../../store/auth';
import { startInitializeData } from '../../store/tvShows';

// Import Components
import LoginForm from './LoginForm';
import LoadingPage from '../common/LoadingPage';

class Login extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //Store the uid (user id) in our store
          this.props.authLogin(user.uid);
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
          <React.Fragment>
          {this.props.isError ? <div style={{color: "red"}}>Error: {this.props.error.code}</div> : null}
          <State initial={{ email: '', password: '' }}>
            {({ state, setState }) => {
              const onEmailUpdate = data => setState({ email: data.target.value })
              const onPasswordUpdate = data => setState({ password: data.target.value })
            
              return (
                <LoginForm data={state} 
                  onEmailUpdate={onEmailUpdate} 
                  onPasswordUpdate={onPasswordUpdate} 
                  startLogin={this.props.startLogin}
                />
              )
            }}
          </State>
          </React.Fragment>
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
    startInitializeData})(Login);

    