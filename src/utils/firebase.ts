import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { network } from './config';

// Initialize Firebase
export let firebaseApp: any;
try {
  firebaseApp = initializeApp(network.fastAuth.firebase);
} catch (e) {
  console.log(e);
}

export const firebaseAuth = getAuth(firebaseApp);
