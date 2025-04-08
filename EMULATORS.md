# Firebase Emulators Guide

This document explains how to use Firebase emulators for local development and testing.

## What are Firebase Emulators?

Firebase emulators are local versions of Firebase services that run on your development machine. They allow you to:

- Develop and test without connecting to production Firebase services
- Work offline
- Test authentication, database operations, and cloud functions locally
- Reset data easily for testing different scenarios

## Available Emulators

The following Firebase emulators are configured for this project:

- **Authentication** (port 9099): For user authentication
- **Firestore** (port 8080): For database operations
- **Functions** (port 5001): For Cloud Functions
- **Hosting** (port 5000): For hosting preview
- **Storage** (port 9199): For file storage

## Starting Emulators

### Basic Start (Data Lost on Restart)

To start the emulators with a clean slate (data will be lost when emulators are stopped):

```bash
npm run emulators
# or
firebase emulators:start
```

### Persistent Data (Recommended for Development)

To start emulators with data persistence (data will be saved when emulators are stopped and loaded when restarted):

```bash
npm run emulators:persist
# or
firebase emulators:start --import=./firebase-emulator-data --export-on-exit=./firebase-emulator-data
```

You can also use the provided batch file:

```bash
./start-emulators.bat
```

## Emulator UI

The Emulator UI is available at [http://localhost:4000](http://localhost:4000) when the emulators are running. This provides a visual interface to:

- View and manage Firestore data
- Monitor authentication state and users
- Test Cloud Functions
- View Storage files
- Monitor logs and requests

## Test Accounts

The following test accounts are automatically created in the Auth emulator:

- **Manager**: manager@google.com / password123
- **Employee**: employee@google.com / password123
- **Customer**: customer@google.com / password123

These accounts are created with the appropriate roles in Firestore when you first attempt to log in with them.

## Manually Exporting/Importing Data

You can manually export the current state of your emulators:

```bash
firebase emulators:export ./firebase-emulator-data
```

And import previously exported data:

```bash
firebase emulators:start --import=./firebase-emulator-data
```

## Troubleshooting

### Network Request Failed

If you see "Firebase: Error (auth/network-request-failed)" when trying to authenticate:
- Make sure the emulators are running
- Check that the application is properly configured to use the emulators

### User Not Found

If you see "Firebase: Error (auth/user-not-found)" when trying to log in with a test account:
- The test account doesn't exist in the Auth emulator
- Try clicking the login button again - the application will attempt to create the test accounts automatically
- If that doesn't work, restart the emulators with persistence and try again

### Port Already in Use

If you see an error about ports already being in use:
- Another instance of the emulators might be running
- Use `netstat -ano | findstr "9099 8080 5001"` to check for running processes
- Kill the processes using those ports and try again
