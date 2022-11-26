import firebase from 'firebase';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyAyrY2hF5HzW4BuUeXv7vtKHVycCqHlxfs",
        authDomain: "nuxtmermaidmarkdown.firebaseapp.com",
        databaseURL: "https://nuxtmermaidmarkdown-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "nuxtmermaidmarkdown",
        storageBucket: "nuxtmermaidmarkdown.appspot.com",
        messagingSenderId: "639760450256",
        appId: "1:639760450256:web:c1ddf3f9b61636f8b894d5",
        measurementId: "G-SQQWMJ6TP2"
})
}

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const database = firebase.database();
