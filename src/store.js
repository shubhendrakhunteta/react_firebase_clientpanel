import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-Redux-Firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//Reducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyCCt3CLM00YZJnwZUliFK-1S3cTX9I5TFE",
  authDomain: "reactclientpanel-47ec9.firebaseapp.com",
  databaseURL: "https://reactclientpanel-47ec9.firebaseio.com",
  projectId: "reactclientpanel-47ec9",
  storageBucket: "reactclientpanel-47ec9.appspot.com",
  messagingSenderId: "888646815976"
};

//react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
const firestore = firebase.firestore;

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create initial state
const initialState = {};

//Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
