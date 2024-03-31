// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeR92HV0BaqhIVWIHPvfyXk9BiFV4oxzk",
  authDomain: "user-engagement-platform.firebaseapp.com",
  projectId: "user-engagement-platform",
  storageBucket: "user-engagement-platform.appspot.com",
  messagingSenderId: "390431864592",
  appId: "1:390431864592:web:e056734530007afe7a5795"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app