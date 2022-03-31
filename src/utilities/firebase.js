import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB9SLPggynvPZHM7lToY3pmBgtMGaZ63z4",
  authDomain: "scheduler-56832.firebaseapp.com",
  databaseURL: "https://scheduler-56832-default-rtdb.firebaseio.com",
  projectId: "scheduler-56832",
  storageBucket: "scheduler-56832.appspot.com",
  messagingSenderId: "35620246912",
  appId: "1:35620246912:web:50e924a744aa9d407b5d65",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    if (devMode) console.log(`loading ${path}`);

    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        if (devMode) console.log(val);
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};

export const setData = (path, value) => set(ref(database, path), value);
