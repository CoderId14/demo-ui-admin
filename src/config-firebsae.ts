import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBvYrfNqXFteBh99vAelz4EZzZ7nwXf6vg',
  authDomain: 'spring-boot-demo-357108.firebaseapp.com',
  projectId: 'spring-boot-demo-357108',
  storageBucket: 'spring-boot-demo-357108.appspot.com',
  messagingSenderId: '526186141332',
  appId: '1:526186141332:web:2dec63148cefb30e080681',
  measurementId: 'G-MFZ47XDXRC'
}

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)