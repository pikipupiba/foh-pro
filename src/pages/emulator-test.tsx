import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { db, auth } from '@/lib/firebase/firebaseConfig';

const EmulatorTestPage: React.FC = () => {
  // Firestore test states
  const [firestoreStatus, setFirestoreStatus] = useState<string>('');
  const [firestoreData, setFirestoreData] = useState<any[]>([]);
  
  // Auth test states
  const [authStatus, setAuthStatus] = useState<string>('');
  const [email, setEmail] = useState<string>('test@example.com');
  const [password, setPassword] = useState<string>('password123');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Check if we're connected to emulators
  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth?.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  // Firestore Test Functions
  const handleAddDocument = async () => {
    if (!db) {
      setFirestoreStatus('Firestore not initialized');
      return;
    }

    setFirestoreStatus('Adding document...');
    try {
      const docRef = await addDoc(collection(db, 'emulator-test'), {
        message: 'Hello from emulator!',
        timestamp: serverTimestamp(),
        testValue: Math.floor(Math.random() * 100)
      });
      setFirestoreStatus(`Document added with ID: ${docRef.id}`);
      await handleGetDocuments(); // Refresh the list
    } catch (error: any) {
      console.error('Error adding document:', error);
      setFirestoreStatus(`Error adding document: ${error.message}`);
    }
  };

  const handleGetDocuments = async () => {
    if (!db) {
      setFirestoreStatus('Firestore not initialized');
      return;
    }

    setFirestoreStatus('Getting documents...');
    try {
      const querySnapshot = await getDocs(collection(db, 'emulator-test'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFirestoreData(data);
      setFirestoreStatus(`Retrieved ${data.length} documents`);
    } catch (error: any) {
      console.error('Error getting documents:', error);
      setFirestoreStatus(`Error getting documents: ${error.message}`);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!db) {
      setFirestoreStatus('Firestore not initialized');
      return;
    }

    setFirestoreStatus(`Deleting document ${id}...`);
    try {
      await deleteDoc(doc(db, 'emulator-test', id));
      setFirestoreStatus(`Document ${id} deleted`);
      await handleGetDocuments(); // Refresh the list
    } catch (error: any) {
      console.error('Error deleting document:', error);
      setFirestoreStatus(`Error deleting document: ${error.message}`);
    }
  };

  // Auth Test Functions
  const handleCreateUser = async () => {
    if (!auth) {
      setAuthStatus('Auth not initialized');
      return;
    }

    setAuthStatus('Creating user...');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setAuthStatus(`User created: ${userCredential.user.uid}`);
    } catch (error: any) {
      console.error('Error creating user:', error);
      setAuthStatus(`Error creating user: ${error.message}`);
    }
  };

  const handleSignIn = async () => {
    if (!auth) {
      setAuthStatus('Auth not initialized');
      return;
    }

    setAuthStatus('Signing in...');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAuthStatus(`Signed in: ${userCredential.user.uid}`);
    } catch (error: any) {
      console.error('Error signing in:', error);
      setAuthStatus(`Error signing in: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    if (!auth) {
      setAuthStatus('Auth not initialized');
      return;
    }

    setAuthStatus('Signing out...');
    try {
      await signOut(auth);
      setAuthStatus('Signed out');
    } catch (error: any) {
      console.error('Error signing out:', error);
      setAuthStatus(`Error signing out: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Firebase Emulator Test</h1>
      
      {/* Emulator Status */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Emulator Status</h2>
        <p>
          {process.env.NODE_ENV === 'production' 
            ? '⚠️ Running in production mode - not using emulators' 
            : '✅ Running in development mode - should be using emulators'}
        </p>
        <p>
          Emulators enabled: {process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true' ? 'Yes' : 'No'}
        </p>
      </div>

      {/* Auth Test Section */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Auth Emulator Test</h2>
        
        <div className="mb-4">
          <p className="mb-2"><strong>Status:</strong> {authStatus}</p>
          <p className="mb-2">
            <strong>Current User:</strong> {currentUser ? `${currentUser.email} (${currentUser.uid})` : 'None'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-2">Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded text-black"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleCreateUser}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create User
          </button>
          <button 
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign In
          </button>
          <button 
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Firestore Test Section */}
      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Firestore Emulator Test</h2>
        
        <div className="mb-4">
          <p className="mb-2"><strong>Status:</strong> {firestoreStatus}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <button 
            onClick={handleAddDocument}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Document
          </button>
          <button 
            onClick={handleGetDocuments}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Get Documents
          </button>
        </div>
        
        {firestoreData.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Documents:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Message</th>
                    <th className="py-2 px-4 border-b">Test Value</th>
                    <th className="py-2 px-4 border-b">Timestamp</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {firestoreData.map((doc) => (
                    <tr key={doc.id}>
                      <td className="py-2 px-4 border-b">{doc.id}</td>
                      <td className="py-2 px-4 border-b">{doc.message}</td>
                      <td className="py-2 px-4 border-b">{doc.testValue}</td>
                      <td className="py-2 px-4 border-b">
                        {doc.timestamp ? new Date(doc.timestamp.seconds * 1000).toLocaleString() : 'Pending...'}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button 
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmulatorTestPage;
