import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
//fill in the client config
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
