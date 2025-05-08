const firebaseConfig = {
    apiKey: "AIzaSyA7TO4TA7fe6lPmcVkKpsnmCjMC93kyD0w",
    authDomain: "laggyworld-be6e4.firebaseapp.com",
    projectId: "laggyworld-be6e4",
    storageBucket: "laggyworld-be6e4.firebasestorage.app",
    messagingSenderId: "198058418554",
    appId: "1:198058418554:web:ac721922e3f1724243f6c3"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  