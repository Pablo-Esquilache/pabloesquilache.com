  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB6597cYjE9ASC4XggqMtL2ZFzLKq_vvZg",
    authDomain: "visitas-web-b4d7d.firebaseapp.com",
    projectId: "visitas-web-b4d7d",
    storageBucket: "visitas-web-b4d7d.appspot.com",
    messagingSenderId: "784220024732",
    appId: "1:784220024732:web:0c1b8a95dfd5eaa0386259"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);