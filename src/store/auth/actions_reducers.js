import { firebase, googleAuthProvider } from '../../firebase/firebase';
import { createActions, handleActions } from 'redux-actions';

// -- AUTH Action Types
// Sets uid called from firebase.auth().on in Login Component
export const AUTH_LOGIN = 'AUTH_LOGIN'; 
// Clears uid called from firebase.auth().on in Login Component
export const AUTH_LOGOUT = 'AUTH_LOGOUT'; 
export const AUTH_SET_STATUS = 'AUTH_SET_STATUS'

//Status Constants
export const AUTH_WORKING = 'WORKING';
export const AUTH_SUCCESS= 'SUCCESS';
export const AUTH_ERROR = 'ERROR';


// ************************************************
// - CREATE ACTION CREATORS
// ************************************************
export const {
	authLogout,
	authLogin,
	authSetStatus
} = createActions({},
	AUTH_LOGOUT,
	AUTH_LOGIN,
	AUTH_SET_STATUS);

// ************************************************
// - THUNKS
// ************************************************
//------------------------------------------
//-- LOGOUT
export const startLogout = () => {
	return (dispatch, getState) => {
    //set auth:status to working
		dispatch(authSetStatus(AUTH_WORKING));
		return firebase.auth().signOut().then(() => {
			dispatch(authLogout()); // No need to dispatch from here
		});
	};
};


//-------------------------------------------
//-- LOGIN
export const startLogin = (loginType, email='', password='') => {
	return (dispatch, getState) => {
		//set auth:status to working
		dispatch(authSetStatus(AUTH_WORKING));
		//now start the process of logging in
		let provider;
		switch (loginType) {
			case 'GOOGLE':
				provider = googleAuthProvider;
				break;
			case 'EMAIL':
				return firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
					dispatch(authLogin(error));
				});
			default:
				console.log('Error in startLogin-default case executed');
				return null;
		}

		return firebase.auth().signInWithPopup(provider).catch((error) => {
          dispatch(authLogin(error));
				});

	};
};


/************************************************
-- REDUCERS
**************************************************/
const authDefault = {
	uid: undefined,
	status: undefined, // AUTH_WORKING or undefined at the moment
	message: undefined
};

const authReducer = handleActions({
	AUTH_LOGOUT: (state, action) => {
		return { uid: '', status: 'SUCCESS', message: '' };
	},
	AUTH_SET_STATUS: (state, action) => {
			return { ...state, status: action.payload, message: '' };
	},
	AUTH_LOGIN: {
		next: (state, action) => {
			return { uid: action.payload, status: AUTH_SUCCESS, message: '' };
		},
		throw: (state, action) => {
				return { uid: '', status: AUTH_ERROR, message: action.payload}
		}
	}
}, authDefault)

export default authReducer;