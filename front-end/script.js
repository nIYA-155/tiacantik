
const API_KEY = '8Y6DRrBYVpMULwEHNH7E5CTunqNgttfkQhiwaHgm'; // Replace with your actual API key

// Data dummy untuk cuaca dan kelembapan tanah
let weatherData = ""; // Data cuaca
async function getDataFromEONET() {
    const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events');
    const data = await response.json();
    return data.events; // retrieve the list of events
    let soilMoistureData = ""; // Data kelembapan tanah

    // Array untuk menyimpan postingan komunitas
    let communityPosts = [];

    // Function to fetch Global Precipitation Measurement (GPM) data
    async function fetchGPMData() {
        const apiKey = '8Y6DRrBYVpMULwEHNH7E5CTunqNgttfkQhiwaHgm'; // Correct API key
        const gpmUrl = `https://api.nasa.gov/GPM/gpm?api_key=$8Y6DRrBYVpMULwEHNH7E5CTunqNgttfkQhiwaHgm
        `; // Use template literals with backticks
        try {
            const response = await fetch(gpmUrl);
            const data = await response.json();

            // Assuming the structure of the data includes weather and moisture fields
            const weatherData = data.weather || 'Data not available'; // Accessing weather data directly
            const soilMoistureData = data.moisture || 'Data not available'; // Accessing moisture data directly

            // You can now use weatherData and soilMoistureData in your dashboard
            updateDashboard(weatherData, soilMoistureData);
        } catch (error) {
            console.error("Error fetching GPM data:", error);
        }
    }

    // Update dashboard with weather and soil moisture data
    function updateDashboard() {
        document.getElementById("weather").innerText = weatherData;
        document.getElementById("soil-moisture").innerText = soilMoistureData;

        // Display community posts
        const communityPostsContainer = document.getElementById("community-posts");
        communityPostsContainer.innerHTML = ""; // Clear previous content

        if (communityPosts.length > 0) {
            communityPosts.forEach((post, index) => {
                if (index < 3) { // Only display 3 posts
                    const postElement = document.createElement("div");
                    postElement.classList.add("post");
                    postElement.innerHTML = `<div class="post-user">${post.user}</div>
                                                 <div class="post-content">${post.content}</div>`;
                    communityPostsContainer.appendChild(postElement);
                }
            });
        } else {
            communityPostsContainer.innerHTML = "<p>No community posts available.</p>";
        }
    }

    // Fetch all data when the window loads
    window.onload = () => {
        fetchGPMData();
    };

    // Handle community post submission
    document.getElementById("post-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const postContent = document.getElementById("post-content").value; // Get content from input
        const userName = "Farmer John"; // Example username

        // Add post to array
        communityPosts.push({ user: userName, content: postContent });
        document.getElementById("post-content").value = ""; // Clear input

        // Update dashboard
        updateDashboard();
        displayPosts();
    });

    // Function to display community posts
    function displayPosts() {
        const postsContainer = document.getElementById("posts");
        postsContainer.innerHTML = ""; // Clear previous content

        if (communityPosts.length > 0) {
            communityPosts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.classList.add("post");
                postElement.innerHTML = `<div class="post-user">${post.user}</div>
                                             <div class="post-content">${post.content}</div>`;
                postsContainer.appendChild(postElement);
            });
        } else {
            postsContainer.innerHTML = "<p>No posts yet.</p>"; // Message if no posts
        }
    }
}