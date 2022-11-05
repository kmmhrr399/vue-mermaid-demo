import firebase from 'firebase';

if (!firebase.apps.length) {
    firebase.initializeApp({
    apiKey: "AIzaSyDj0iJjFlV-NbF0LZKJcEMBAKVzA-JF6ok",
    authDomain: "vuemermaidmarkdown1.firebaseapp.com",
    databaseURL: "https://vuemermaidmarkdown1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vuemermaidmarkdown1",
    storageBucket: "vuemermaidmarkdown1.appspot.com",
    messagingSenderId: "843442527675",
    appId: "1:843442527675:web:6e75820d1903377939f89e",
    measurementId: "G-0QHG8DC1N2"
})
}

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const database = firebase.database();
