import * as firebase from 'firebase';

const FB_API_KEY = process.env.REACT_APP_FB_APIKEY;
const FB_AUTHDOMAIN = process.env.REACT_APP_FB_AUTHDOMAIN;
const FB_DATABASEURL = process.env.REACT_APP_FB_DATABASEURL;
const FB_PROJECTID = process.env.REACT_APP_FB_PROJECTID;
const FB_STORAGEBUCKET = process.env.REACT_APP_FB_STORAGEBUCKET;
const FB_MESSAGINGSENDERID = process.env.REACT_APP_FB_MESSAGINGSENDERID;
const FB_APPID = process.env.REACT_APP_FB_APPID;

const config = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTHDOMAIN,
  databaseURL: FB_DATABASEURL,
  projectId: FB_PROJECTID,
  storageBucket: FB_STORAGEBUCKET,
  messagingSenderId: FB_MESSAGINGSENDERID, 
  appId: FB_APPID
};

firebase.initializeApp(config);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };