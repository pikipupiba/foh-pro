import React, { useState } from 'react';
import { db } from '../lib/firebase/firebaseConfig'; // Import Firestore instance
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

const FirebaseTestPage: React.FC = () => {
  const [writeStatus, setWriteStatus] = useState<string>('');
  const [readStatus, setReadStatus] = useState<string>('');
  const [readData, setReadData] = useState<any[]>([]);

  const handleWriteTest = async () => {
    setWriteStatus('Writing...');
    try {
      const docRef = await addDoc(collection(db, 'testCollection'), {
        message: 'Hello from foh-pro test page!',
        timestamp: Timestamp.now(),
      });
      setWriteStatus(`Successfully wrote document with ID: ${docRef.id}`);
    } catch (error: any) {
      console.error("Error writing document: ", error);
      setWriteStatus(`Error writing document: ${error.message}`);
    }
  };

  const handleReadTest = async () => {
    setReadStatus('Reading...');
    setReadData([]); // Clear previous data
    try {
      const querySnapshot = await getDocs(collection(db, 'testCollection'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReadData(data);
      setReadStatus(`Successfully read ${querySnapshot.size} documents.`);
      if (querySnapshot.empty) {
        setReadStatus('Successfully connected, but the test collection is empty.');
      }
    } catch (error: any) {
      console.error("Error reading documents: ", error);
      setReadStatus(`Error reading documents: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Firebase Integration Test</h1>

      <section style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h2>Write Test</h2>
        <button onClick={handleWriteTest}>Write Test Document</button>
        <p>Status: {writeStatus}</p>
      </section>

      <section style={{ border: '1px solid #ccc', padding: '10px' }}>
        <h2>Read Test</h2>
        <button onClick={handleReadTest}>Read Test Collection</button>
        <p>Status: {readStatus}</p>
        {readData.length > 0 && (
          <div>
            <h3>Data:</h3>
            <pre style={{ background: '#f4f4f4', padding: '10px', maxHeight: '300px', overflowY: 'auto' }}>
              {JSON.stringify(readData, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
};

export default FirebaseTestPage;
