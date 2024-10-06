<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NASA API and Community Dashboard</title>
    <style>
        /* Basic styles for better presentation */
        .post { margin: 10px 0; padding: 10px; border: 1px solid #ccc; }
        .post-user { font-weight: bold; }
        #dashboard { margin: 20px 0; }
    </style>
    <script>
        const API_KEY = '8Y6DRrBYVpMULwEHNH7E5CTunqNgttfkQhiwaHgm'; // Replace with your actual API key

        // Data dummy untuk cuaca dan kelembapan tanah
        let weatherData = ""; // Data cuaca
        let soilMoistureData = ""; // Data kelembapan tanah

        // Array untuk menyimpan postingan komunitas
        let communityPosts = [];

        // Function to fetch Global Precipitation Measurement (GPM) data
        async function fetchGPMData() {
            const gpmUrl = https://api.nasa.gov/GPM/gpm?api_key=${8Y6DRrBYVpMULwEHNH7E5CTunqNgttfkQhiwaHgm};
            try {
                const response = await fetch(gpmUrl);
                const data = await response.json();
                weatherData = Weather: ${data.weather || 'Data not available'}; // Adjust based on actual data structure
                soilMoistureData = Moisture: ${data.moisture || 'Data not available'}; // Adjust based on actual data structure
                updateDashboard();
            } catch (error) {
                console.error("Error fetching GPM data:", error);
            }
        }

        // Update dashboard with weather and soil moisture data
        function updateDashboard() {
            document.getElementById("weather").innerText = weatherData;
            document.getElementById("soil-moisture").innerText = soilMoistureData;
            async function getDataFromEONET() {
                const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events');
                const data = await response.json();
                return data.events; // Mengambil daftar events
            }
            async function prepareData() {
                const events = await getDataFromEONET();
                const labels = events.map(event => new Date(event.geometry[0].date).toLocaleDateString());
                const dataPoints = events.map(event => event.geometry.length); // Jumlah lokasi terkait event
            
                return { labels, dataPoints };
            }
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
    </script>
</head>
<body>
    <h1>NASA API and Community Dashboard</h1>
    
    <div id="dashboard">
        <h2>Weather</h2>
        <p id="weather">Loading...</p>
        <h2>Soil Moisture</h2>
        <p id="soil-moisture">Loading...</p>
    </div>

    <h2>Community Posts</h2>
    <form id="post-form">
        <input type="text" id="post-content" placeholder="Write a post..." required>
        <button type="submit">Post</button>
    </form>

    <div id="community-posts"></div>
    <h3>All Posts</h3>
    <div id="posts"></div>
    
    <button class="signup-btn">Sign Up</button>
</body>
</html>