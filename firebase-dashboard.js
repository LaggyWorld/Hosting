// firebase-dashboard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA7TO4TA7fe6lPmcVkKpsnmCjMC93kyD0w",
    authDomain: "laggyworld-be6e4.firebaseapp.com",
    projectId: "laggyworld-be6e4",
    storageBucket: "laggyworld-be6e4.firebasestorage.app",
    messagingSenderId: "198058418554",
    appId: "1:198058418554:web:ac721922e3f1724243f6c3"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return;

  const data = userSnap.data();
  document.getElementById("username").textContent = data.username || "Unnamed";
  document.getElementById("email").textContent = user.email;
  document.getElementById("pfp").src = data.pfpUrl || "https://via.placeholder.com/80";

  if (data.bgUrl) {
    document.body.style.backgroundImage = `url('${data.bgUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  if (data.plan === "premium") {
    document.getElementById("planStatus").textContent = "Premium Plan Active";
    document.getElementById("goToPanel").style.display = "inline-block";
  } else {
    document.getElementById("planStatus").textContent = "Free Plan";
  }
});

document.getElementById("settingsForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const newUsername = document.getElementById("newUsername").value.trim();
  const newEmail = document.getElementById("newEmail").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const bgUrl = document.getElementById("bgUrl").value.trim();

  const updates = {};
  if (newUsername) updates.username = newUsername;
  if (bgUrl) updates.bgUrl = bgUrl;

  try {
    if (newEmail) await updateEmail(user, newEmail);
    if (newPassword) await updatePassword(user, newPassword);
    if (Object.keys(updates).length > 0) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, updates);
    }
    alert("Settings updated!");
    location.reload();
  } catch (err) {
    console.error("Error updating settings:", err.message);
    alert("Failed to update: " + err.message);
  }
});

// === Logout ===
function logout() {
  signOut(auth).then(() => window.location.href = "login.html");
}
window.logout = logout;
