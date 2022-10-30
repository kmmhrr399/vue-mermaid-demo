// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDj0iJjFlV-NbF0LZKJcEMBAKVzA-JF6ok",
    authDomain: "vuemermaidmarkdown1.firebaseapp.com",
    projectId: "vuemermaidmarkdown1",
    storageBucket: "vuemermaidmarkdown1.appspot.com",
    messagingSenderId: "843442527675",
    appId: "1:843442527675:web:6e75820d1903377939f89e",
    measurementId: "G-0QHG8DC1N2"
}

const firebase = initializeApp(firebaseConfig)
const database = getFirestore(firebase)
const analytics = getAnalytics(firebase)
//const getAuth = getAuth(firebase)
//const signInWithPopup = signInWithPopup(firebase)
//const GoogleAuthProvider = GoogleAuthProvider(firebase)

export default database