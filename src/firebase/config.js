import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAU7xxM71ZAPh2QB4-sZDc9XnUVjnjKGWg",
  authDomain: "miniblog-29457.firebaseapp.com",
  projectId: "miniblog-29457",
  storageBucket: "miniblog-29457.firebasestorage.app",
  messagingSenderId: "20180896524",
  appId: "1:20180896524:web:9eba9c12d9831599495729",
  measurementId: "G-T6J2B7NHPN",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };
