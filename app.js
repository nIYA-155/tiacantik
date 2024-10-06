import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAneWJTtY-yLI-qIwlyoi62AiVjuE5d3zE",
  authDomain: "tani-gather-website.firebaseapp.com",
  databaseURL: "https://tani-gather-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tani-gather-website",
  storageBucket: "tani-gather-website.appspot.com",
  messagingSenderId: "646447694693",
  appId: "1:646447694693:web:59aafdff60f2560dd9978c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

async function fetchWeatherData() {
  const apiKey = "8Y6DRrBYVpMULwEHNH7E5CTunqNgttfkQhiwaHgm"; 
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`; 

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayWeatherData(data);
    saveWeatherDataToFirebase(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeatherData(data) {
  const weatherContainer = document.getElementById('weatherData');
  weatherContainer.innerHTML += `
    <h3>${data.title}</h3>
    <p>${data.explanation}</p>
    <img src="${data.url}" alt="${data.title}" />
    <button onclick="deleteWeatherData('${data.date}')">Delete</button>
    <button onclick="updateWeatherData('${data.date}', '${data.title}', '${data.explanation}', '${data.url}')">Update</button>
  `;
}

function saveWeatherDataToFirebase(data) {
  const weatherRef = ref(database, 'weatherData/' + data.date); // Use data.date as the key
  set(weatherRef, data)
      .then(() => {
          console.log("Weather data saved successfully");
      })
      .catch((error) => {
          console.error("Error saving weather data:", error);
      });
}

function deleteWeatherData(date) {
  const weatherRef = ref(database, 'weatherData/' + date);
  remove(weatherRef)
      .then(() => {
          console.log("Weather data deleted successfully");
          fetchWeatherDataFromFirebase(); 
      })
      .catch((error) => {
          console.error("Error deleting weather data:", error);
      });
}

// Function to update weather data
function updateWeatherData(date, title, explanation, url) {
  const newTitle = prompt("Update Title:", title);
  const newExplanation = prompt("Update Explanation:", explanation);
  const newUrl = prompt("Update Image URL:", url);

  const weatherRef = ref(database, 'weatherData/' + date);
  set(weatherRef, {
      date: date,
      title: newTitle || title,
      explanation: newExplanation || explanation,
      url: newUrl || url
  })
  .then(() => {
      console.log("Weather data updated successfully");
      fetchWeatherDataFromFirebase(); 
  })
  .catch((error) => {
      console.error("Error updating weather data:", error);
  });
}

// Event listener untuk form login
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault(); 
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user);
      writeUserData(user.uid, user.displayName || "User", user.email); 
      readUserData(user.uid); 
    })
    .catch((error) => {
      console.error('Error signing in:', error);
    });
});

// Google Sign-In
document.getElementById('googleLogin').addEventListener('click', () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('Google user signed in:', user);
      writeUserData(user.uid, user.displayName || "User", user.email);
      readUserData(user.uid); 
    })
    .catch((error) => {
      console.error('Error with Google sign-in:', error);
    });
});

document.getElementById('fetchNewWeather').addEventListener('click', fetchWeatherData);

async function fetchWeatherDataFromFirebase() {
  const weatherRef = ref(database, 'weatherData/');
  get(weatherRef).then((snapshot) => {
      const weatherContainer = document.getElementById('weatherData');
      weatherContainer.innerHTML = ""; // Clear current display
      if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
              const data = childSnapshot.val();
              displayWeatherData(data); 
          });
      } else {
          console.log("No weather data available");
      }
  }).catch((error) => {
      console.error("Error reading weather data:", error);
  });
}

// Call fetchWeatherData when the page loads or at a specific event
window.onload = () => {
  fetchWeatherDataFromFirebase(); 
};

function writeUserData(userId, name, email) {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email
  }).then(() => {
    console.log("User data written successfully");
  }).catch((error) => {
    console.error("Error writing user data:", error);
  });
}

function readUserData(userId) {
  const userRef = ref(database, 'users/' + userId);
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("User data:", snapshot.val());
    } else {
      console.log("No user data available");
    }
  }).catch((error) => {
    console.error("Error reading user data:", error);
  });
}

function updateUserData(userId, name, email) {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email
  }).then(() => {
    console.log("User data updated successfully");
  }).catch((error) => {
    console.error("Error updating user data:", error);
  });
}

function deleteUser(userId) {
  const userRef = ref(database, 'users/' + userId);
  remove(userRef).then(() => {
    console.log("User data deleted successfully");
  }).catch((error) => {
    console.error("Error deleting user data:", error);
  });
}
