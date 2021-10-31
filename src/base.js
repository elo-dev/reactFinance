import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

var firebaseConfig = {
  apiKey: 'AIzaSyDrBYfaUHGzZjG2qkC8IFm63yutSOuQVh4',
  authDomain: 'finance-47cbb.firebaseapp.com',
  databaseURL: 'https://finance-47cbb-default-rtdb.firebaseio.com',
  projectId: 'finance-47cbb',
  storageBucket: 'finance-47cbb.appspot.com',
  messagingSenderId: '902791404772',
  appId: '1:902791404772:web:b798aa57b0ad487c91a0f1',
  measurementId: 'G-01BHYVGHX3',
}

firebase.initializeApp(firebaseConfig)
const databaseRef = firebase.database().ref()

export const noteRef = databaseRef.child('notes')
export default firebase
