import { initializeApp } from "firebase/app";
import { getFunctions } from 'firebase/functions';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1NhakolQdQSyGyT1EfHOjtU0jco-4Ma4",
  authDomain: "emason-c2ba1.firebaseapp.com",
  projectId: "emason-c2ba1",
  storageBucket: "emason-c2ba1.appspot.com",
  messagingSenderId: "949703525469",
  appId: "1:949703525469:web:c6c2a2a8010ce483abb9b4"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, "asia-southeast1");

export const storage = getStorage(app);

export default functions;