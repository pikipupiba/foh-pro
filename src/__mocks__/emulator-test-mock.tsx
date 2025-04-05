import React from 'react';

// Mock version of the EmulatorTestPage component
const MockEmulatorTestPage: React.FC = () => {
  return (
    <div>
      <h1>Firebase Emulator Test</h1>
      
      <div>
        <h2>Auth Emulator Test</h2>
        <p>Status: Not signed in</p>
        <div>
          <label>Email:</label>
          <input type="email" value="test@example.com" readOnly />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value="password123" readOnly />
        </div>
        <div>
          <button>Create User</button>
          <button>Sign In</button>
          <button>Sign Out</button>
        </div>
      </div>

      <div>
        <h2>Firestore Emulator Test</h2>
        <p>Status: Ready</p>
        <div>
          <button>Add Document</button>
          <button>Get Documents</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Message</th>
                <th>Test Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>doc1</td>
                <td>Hello from emulator!</td>
                <td>42</td>
                <td><button>Delete</button></td>
              </tr>
              <tr>
                <td>doc2</td>
                <td>Another test document</td>
                <td>99</td>
                <td><button>Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MockEmulatorTestPage;
