// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { collection, doc, getDocs, getFirestore, deleteDoc, setDoc } from "firebase/firestore"
import { uuid } from 'uuidv4';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export function firebaseConfig() {
    const config = {
        apiKey: "AIzaSyAg5tqRiXAIRg4MXdRfRnYrL6nMjfAupWU",
        authDomain: "system-23bb4.firebaseapp.com",
        projectId: "system-23bb4",
        storageBucket: "system-23bb4.appspot.com",
        messagingSenderId: "599361287559",
        appId: "1:599361287559:web:8943b21922db447eabcf22",
        measurementId: "G-6LX0TYQWFR"
    };

    // Initialize Firebase
    const app = initializeApp(config);
    const analytics = getAnalytics(app);
}

export function firebaseRegisterUser(email, password) {
    createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credentials => {
       // credentials.user.
    })
}

export async function firebaseLogin(email, password) {
    try {
        let credentials = await signInWithEmailAndPassword(getAuth(), email, password);
        // credentials.user  
    } catch(e) {
        return false;
    }
    
    return true;
}

export async function firebaseSearch(collectionSearch) {
    let list = [];
    let consult = collection(getFirestore(), collectionSearch);
    let result = await getDocs(consult);
    result.forEach(document => {
        let object = document.data();
        object.id = document.id;
        list.push(object);
    });
    return list;
}

export function firebaseCreate(collection, object) {
    object.id = uuid();
    let reference = doc(getFirestore(), collection, object.id);
    setDoc(reference, object);
}

export async function firebaseDelete(collection, id) {
    await deleteDoc(doc(getFirestore(), collection, id));
}