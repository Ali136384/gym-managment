// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};

// const firebaseConfig = {

//   apiKey: "AIzaSyCpDMtQxGtiAelqQSCLbewImcnHKswZvyY",

//   authDomain: "ali-mohamed-gym.firebaseapp.com",

//   projectId: "ali-mohamed-gym",

//   storageBucket: "ali-mohamed-gym.appspot.com",

//   messagingSenderId: "1053790670069",

//   appId: "1:1053790670069:web:cb85a9c432971c6c3d09bc"

// };


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Initialize Firebase
export default storage;
