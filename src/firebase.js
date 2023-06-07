import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

let db = false;
let app = null;
let auth = null;

const getDb = () => {
    if (!db) {
        const firebaseConfig = {
            apiKey: "AIzaSyD6EBBInHBoQzwx5dlfDa2eRwSkkyUnYiA",
            authDomain: "minmart-bd277.firebaseapp.com",
            projectId: "minmart-bd277",
            storageBucket: "minmart-bd277.appspot.com",
            messagingSenderId: "315386150973",
            appId: "1:315386150973:web:f8e4a135a258d5ade96a54",
            measurementId: "G-79NNRW1N1Y"
        };

        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
    }

    return { db, auth, app };
};

getDb();

export { auth, app, db };