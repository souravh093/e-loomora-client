import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAv9ofsNZkBkdqCynHmQh9LYHJaIzS9i4w",
  authDomain: "bike-booker-f4a7f.firebaseapp.com",
  projectId: "bike-booker-f4a7f",
  storageBucket: "bike-booker-f4a7f.appspot.com",
  messagingSenderId: "981981223939",
  appId: "1:981981223939:web:70e48fd987f1cdf1930236"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

export default app; 