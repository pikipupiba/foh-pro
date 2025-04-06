module.exports = {
  // Configure Firebase Frameworks
  hosting: {
    // Configure hosting options
    source: '.',
    ignore: [
      'firebase.json',
      '**/.*',
      '**/node_modules/**',
      '**/.next/**',
      '**/src/**',
      '**/functions/**'
    ],
    frameworksBackend: {
      region: 'us-central1',
      memory: '1GiB',
      timeoutSeconds: 60,
      invoker: 'public', // Explicitly set the invoker to public
    }
  },
  // Configure emulators
  emulators: {
    hosting: {
      port: 5000
    },
    auth: {
      port: 9099
    },
    functions: {
      port: 5001
    },
    firestore: {
      port: 8080
    },
    storage: {
      port: 9199
    },
    ui: {
      enabled: true
    },
    singleProjectMode: true
  }
};
