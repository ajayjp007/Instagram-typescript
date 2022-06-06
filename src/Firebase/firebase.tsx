import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD8SQqWKEcETw4CM12NPiZX4ao1catwLf0',
  authDomain: 'social-media-11f08.firebaseapp.com',
  projectId: 'social-media-11f08',
  storageBucket: 'social-media-11f08.appspot.com',
  messagingSenderId: '171883526837',
  appId: '1:171883526837:web:3fa67c16e5fabac8425cfc',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
