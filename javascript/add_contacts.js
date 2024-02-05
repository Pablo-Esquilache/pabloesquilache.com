import { db } from './firebase.js';
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

export const set_contacts = async (name, email, affair) => {
    try {
      const docRef = await addDoc(collection(db, "visitors"), {
        Nombre_Apellido: name,
        Correo_Electronico: email,
        Asunt: affair,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };