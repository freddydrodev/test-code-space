// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { collection, doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSb4_wiCjjv-DoNOSqRewFV7S10xNBgvo",
  authDomain: "sia-ci-net.firebaseapp.com",
  projectId: "sia-ci-net",
  storageBucket: "sia-ci-net.appspot.com",
  messagingSenderId: "398241817601",
  appId: "1:398241817601:web:4c170c8a80d98002690c00",
};

export const FIREBASE_CLIENT =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps[0];

export const FIRESTORE = getFirestore(FIREBASE_CLIENT);

export const AUTH = getAuth(FIREBASE_CLIENT);

export const STORAGE = getStorage(FIREBASE_CLIENT);

export const DETAILS_COLLECTION = collection(
  FIRESTORE,
  process.env.NODE_ENV === "production" ? "Details" : "Details_DEV"
);

export const BANNERS_COLLECTION = collection(
  FIRESTORE,
  process.env.NODE_ENV === "production" ? "Banners" : "Banners_DEV"
);

export const SERVICES_COLLECTION = collection(
  FIRESTORE,
  process.env.NODE_ENV === "production" ? "Services" : "Services_DEV"
);

export const MISSIONS_COLLECTION = collection(
  FIRESTORE,
  process.env.NODE_ENV === "production" ? "Missions" : "Missions_DEV"
);

export const LOCATIONS_COLLECTION = collection(
  FIRESTORE,
  process.env.NODE_ENV === "production" ? "Locations" : "Locations_DEV"
);

export const TEAMS_COLLECTION = collection(
  FIRESTORE,
  process.env.NODE_ENV === "production" ? "Teams" : "Teams_DEV"
);

export const ACTIVITIES_COLLECTION = collection(
  FIRESTORE,
  process.env.NODE_ENV === "production" ? "Activities" : "Activities_DEV"
);

export const GENERAL_DOC = doc(FIRESTORE, DETAILS_COLLECTION.path + "/GENERAL");
