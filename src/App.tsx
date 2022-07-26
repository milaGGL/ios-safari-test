import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase.config";
import { doc, DocumentData, FirestoreError, getDoc } from "firebase/firestore";
import { DebugComponent } from "./DebugComponent";
const docRef = doc(db, "author", "REGP4H5psZ3gh8ORyTAr");

function App() {
  const [author, setAuthor] = useState<DocumentData | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | undefined>();
  useEffect(() => {
    async function getAuthor() {
      try {
        const doc = await getDoc(docRef);
        const author = doc.data();
        setAuthor(author);
      } catch (e) {
        setError(e as FirestoreError);
      }
    }

    getAuthor().then(() => {
      setLoading(false);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>Testing iOS safari crash</p>
      </header>
      <div>
        {loading ? (
          <p>Connecting to Firestore</p>
        ) : (
          <div>
            <p>Firestore: {error ? "Failed" : "Connected"}</p>
            {error && <p> Error: {error?.message} </p>}
          </div>
        )}
      </div>
      <div>
        <DebugComponent />
      </div>
    </div>
  );
}

export default App;
