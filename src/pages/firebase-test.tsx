import React, { useState, useEffect, useRef } from 'react';
import {
  db,
  auth,
  storage
} from '../lib/firebase/firebaseConfig'; // Import Firestore, Auth, Storage instances
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  Timestamp,
  Unsubscribe, // Import Unsubscribe type
} from 'firebase/firestore';
import {
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User, // Import User type
} from 'firebase/auth';
import {
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot, // Import UploadTaskSnapshot type
  getDownloadURL, // Optional: to get URL after upload
} from 'firebase/storage';

// Basic Button Component (replace with actual src/components/ui/Button when available)
// Using CSS variable defined in globals.css and v4 opacity syntax
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={`bg-[var(--color-brand-lime)] hover:bg-lime-600 text-[var(--color-brand-black)] font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-lime)]/75 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Basic Input Component (replace with actual src/components/ui/Input when available)
// Using v4 opacity syntax
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-lime)]/75 focus:border-transparent disabled:bg-gray-100 ${className}`}
    {...props}
  />
);

const FirebaseTestPage: React.FC = () => {
  // --- Auth State ---
  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<string>('Initializing...');

  // --- Firestore State ---
  const [writeData, setWriteData] = useState<string>('Test message');
  const [writeStatus, setWriteStatus] = useState<string>('');
  const [readStatus, setReadStatus] = useState<string>('');
  const [readData, setReadData] = useState<any[]>([]);
  const [docIdToModify, setDocIdToModify] = useState<string>('');
  const [updateDataInput, setUpdateDataInput] = useState<string>('Updated message');
  const [updateStatus, setUpdateStatus] = useState<string>('');
  const [deleteStatus, setDeleteStatus] = useState<string>('');
  const [realtimeData, setRealtimeData] = useState<any[]>([]);
  const [realtimeStatus, setRealtimeStatus] = useState<string>('Not subscribed');
  const unsubscribeRef = useRef<Unsubscribe | null>(null); // Ref to hold the unsubscribe function

  // --- Storage State ---
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // --- Effects ---
  // Listen for Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthStatus(currentUser ? `Signed in as UID: ${currentUser.uid}` : 'Signed out');
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Cleanup Firestore subscription on unmount
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        console.log('Unsubscribed from Firestore real-time updates.');
      }
    };
  }, []);

  // --- Auth Handlers ---
  const handleSignInAnon = async () => {
    setAuthStatus('Signing in anonymously...');
    try {
      await signInAnonymously(auth);
      // Status will be updated by onAuthStateChanged listener
    } catch (error: any) {
      console.error("Error signing in anonymously: ", error);
      setAuthStatus(`Error signing in: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    setAuthStatus('Signing out...');
    try {
      await signOut(auth);
      // Status will be updated by onAuthStateChanged listener
    } catch (error: any) {
      console.error("Error signing out: ", error);
      setAuthStatus(`Error signing out: ${error.message}`);
    }
  };

  // --- Firestore Handlers ---
  const handleWriteTest = async () => {
    if (!writeData) {
      setWriteStatus('Please enter data to write.');
      return;
    }
    setWriteStatus('Writing...');
    try {
      const docRef = await addDoc(collection(db, 'testCollection'), {
        message: writeData,
        timestamp: Timestamp.now(),
        userId: user?.uid || 'anonymous', // Add user ID if available
      });
      setWriteStatus(`Successfully wrote document with ID: ${docRef.id}`);
      setWriteData(''); // Clear input after write
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

  const handleUpdateTest = async () => {
    if (!docIdToModify) {
      setUpdateStatus('Please enter a Document ID to update.');
      return;
    }
    if (!updateDataInput) {
        setUpdateStatus('Please enter data to update.');
        return;
    }
    setUpdateStatus(`Updating doc ${docIdToModify}...`);
    try {
      const docRef = doc(db, 'testCollection', docIdToModify);
      await updateDoc(docRef, {
        message: updateDataInput,
        updatedAt: Timestamp.now(),
      });
      setUpdateStatus(`Successfully updated document: ${docIdToModify}`);
      setDocIdToModify(''); // Clear ID input
      setUpdateDataInput(''); // Clear data input
    } catch (error: any) {
      console.error("Error updating document: ", error);
      setUpdateStatus(`Error updating document ${docIdToModify}: ${error.message}`);
    }
  };

  const handleDeleteTest = async () => {
    if (!docIdToModify) {
      setDeleteStatus('Please enter a Document ID to delete.');
      return;
    }
    setDeleteStatus(`Deleting doc ${docIdToModify}...`);
    try {
      await deleteDoc(doc(db, 'testCollection', docIdToModify));
      setDeleteStatus(`Successfully deleted document: ${docIdToModify}`);
      setDocIdToModify(''); // Clear ID input
    } catch (error: any) {
      console.error("Error deleting document: ", error);
      setDeleteStatus(`Error deleting document ${docIdToModify}: ${error.message}`);
    }
  };

  const handleSubscribeRealtime = () => {
    if (unsubscribeRef.current) {
      setRealtimeStatus('Already subscribed. Unsubscribe first.');
      return;
    }
    setRealtimeStatus('Subscribing...');
    try {
      const q = collection(db, 'testCollection');
      unsubscribeRef.current = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRealtimeData(data);
        setRealtimeStatus(`Subscription active. Received ${data.length} documents.`);
        if (querySnapshot.empty) {
          setRealtimeStatus('Subscription active, but the collection is empty.');
        }
        console.log('Real-time update received:', data);
      }, (error) => { // Add error handling for the listener itself
        console.error("Error in real-time subscription: ", error);
        setRealtimeStatus(`Subscription error: ${error.message}`);
        unsubscribeRef.current = null; // Clear ref on error
      });
      console.log('Subscribed to Firestore real-time updates.');
    } catch (error: any) {
      console.error("Error setting up subscription: ", error);
      setRealtimeStatus(`Error subscribing: ${error.message}`);
    }
  };

  const handleUnsubscribeRealtime = () => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
      setRealtimeStatus('Unsubscribed.');
      setRealtimeData([]); // Clear data on unsubscribe
      console.log('Unsubscribed from Firestore real-time updates.');
    } else {
      setRealtimeStatus('Not currently subscribed.');
    }
  };

  // --- Storage Handlers ---
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus('File selected.');
      setUploadProgress(0);
    } else {
      setSelectedFile(null);
      setUploadStatus('');
    }
  };

  const handleUploadTest = () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    setUploadStatus('Uploading...');
    setUploadProgress(0);

    // Create a storage reference (use user ID or timestamp for uniqueness)
    const filePath = `testUploads/${user?.uid || 'anonymous'}/${Date.now()}-${selectedFile.name}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot: UploadTaskSnapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        setUploadStatus(`Upload is ${progress.toFixed(2)}% done`);
        switch (snapshot.state) {
          case 'paused':
            setUploadStatus('Upload is paused');
            break;
          case 'running':
            // Status updated above with progress
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.error("Upload Error: ", error);
        setUploadStatus(`Upload failed: ${error.code} - ${error.message}`);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setUploadStatus(`Upload successful! File path: ${filePath}`);
          // Optionally: save downloadURL to Firestore or display it
        });
        setSelectedFile(null); // Clear file input visually if needed (doesn't clear the actual input element state)
      }
    );
  };


  // --- Render ---
  return (
    // Using Tailwind classes for styling
    // Assuming font-inter and font-owners are configured via @theme or a plugin
    <div className="container mx-auto p-4 md:p-8 font-inter text-gray-800 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold font-owners text-center mb-8 text-[var(--color-brand-black)]">
        Firebase Integration Test Page
      </h1>

      {/* Authentication Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold font-owners mb-4 border-b pb-2">Authentication</h2>
        <p className="text-sm text-gray-600 mb-3 break-words">Status: {authStatus}</p>
        <div className="flex space-x-4">
            {!user && <Button onClick={handleSignInAnon}>Sign In Anonymously</Button>}
            {user && <Button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 text-white">Sign Out</Button>}
        </div>
      </section>

      {/* Firestore Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold font-owners mb-4 border-b pb-2">Firestore (Collection: testCollection)</h2>

        {/* Write */}
        <div className="mb-6 border-b pb-6">
          <h3 className="text-xl font-bold font-owners mb-3">Write Document</h3>
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <Input
              type="text"
              value={writeData}
              onChange={(e) => setWriteData(e.target.value)}
              placeholder="Message to write"
              className="grow" // Use grow instead of flex-grow
            />
            <Button onClick={handleWriteTest} disabled={!user && false /* Allow anonymous writes for test */}>
              Write Document
            </Button>
          </div>
          <p className="text-sm text-gray-600">Status: {writeStatus}</p>
        </div>

        {/* Read */}
        <div className="mb-6 border-b pb-6">
          <h3 className="text-xl font-bold font-owners mb-3">Read Collection</h3>
          <Button onClick={handleReadTest} className="mb-2">Read Collection</Button>
          <p className="text-sm text-gray-600 mb-2">Status: {readStatus}</p>
          {readData.length > 0 && (
            <div>
              <h4 className="font-semibold mb-1">Data:</h4>
              <pre className="bg-gray-100 p-3 rounded border border-gray-200 text-xs max-h-48 overflow-y-auto">
                {JSON.stringify(readData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Update / Delete */}
        <div className="mb-6 border-b pb-6">
          <h3 className="text-xl font-bold font-owners mb-3">Update / Delete Document</h3>
           <div className="flex flex-wrap items-center gap-4 mb-2">
             <Input
                type="text"
                value={docIdToModify}
                onChange={(e) => setDocIdToModify(e.target.value)}
                placeholder="Document ID to Update/Delete"
                className="grow sm:grow-0" // Use grow
             />
             <Input
                type="text"
                value={updateDataInput}
                onChange={(e) => setUpdateDataInput(e.target.value)}
                placeholder="New message for update"
                className="grow" // Use grow
             />
           </div>
           <div className="flex flex-wrap gap-4 mb-2">
             <Button onClick={handleUpdateTest} disabled={!docIdToModify || !user}>Update Document</Button>
             <Button onClick={handleDeleteTest} disabled={!docIdToModify || !user} className="bg-red-500 hover:bg-red-600 text-white">Delete Document</Button>
           </div>
          <p className="text-sm text-gray-600">Update Status: {updateStatus}</p>
          <p className="text-sm text-gray-600">Delete Status: {deleteStatus}</p>
        </div>

        {/* Real-time */}
        <div>
          <h3 className="text-xl font-bold font-owners mb-3">Real-time Subscription</h3>
          <div className="flex flex-wrap gap-4 mb-2">
            <Button onClick={handleSubscribeRealtime} disabled={!!unsubscribeRef.current}>Subscribe</Button>
            <Button onClick={handleUnsubscribeRealtime} disabled={!unsubscribeRef.current} className="bg-gray-500 hover:bg-gray-600 text-white">Unsubscribe</Button>
          </div>
          <p className="text-sm text-gray-600 mb-2">Status: {realtimeStatus}</p>
          {realtimeData.length > 0 && (
            <div>
              <h4 className="font-semibold mb-1">Live Data:</h4>
              <pre className="bg-gray-100 p-3 rounded border border-gray-200 text-xs max-h-48 overflow-y-auto">
                {JSON.stringify(realtimeData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* Storage Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold font-owners mb-4 border-b pb-2">Cloud Storage (Path: testUploads/)</h2>
        <div className="mb-3">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                Select file to upload:
            </label>
            {/* Style file input using file: variant */}
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-lime-100 file:text-lime-700 hover:file:bg-lime-200"
            />
        </div>
        <Button onClick={handleUploadTest} disabled={!selectedFile || !user} className="mb-2">Upload File</Button>
        <p className="text-sm text-gray-600 mb-2">Status: {uploadStatus}</p>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
             {/* Use CSS variable for progress bar color */}
            <div className="bg-[var(--color-brand-lime)] h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
      </section>
    </div>
  );
};

export default FirebaseTestPage;
