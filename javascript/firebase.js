 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
 import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyD9ewro6LKocsJlAsgpZ1sP_ojPWW5INu8",
   authDomain: "contacto-web-abb87.firebaseapp.com",
   projectId: "contacto-web-abb87",
   storageBucket: "contacto-web-abb87.appspot.com",
   messagingSenderId: "367128406964",
   appId: "1:367128406964:web:6a1600e3d6f84dbaa8a0e1"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Add a second document with a generated ID.

// export const set_contacts = async (name, email, affair) => {
//   try {
//     const docRef = await addDoc(collection(db, "visitors"), {
//       Nombre_Apellido: name,
//       Correo_Electronico: email,
//       Asunt: affair,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// };