const apiKey = '8Y6DRrBYVpMULwEHNH7E5CTunqNgttfkQhiwaHgm';
const city = 'Jakarta';
async function fetchWeatherData() {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${8Y6DRrBYVpMULwEHNH7E5CTunqNgttfkQhiwaHgm}&q=${city}&aqi=yes`);
        const data = await response.json();
        
        // Ambil data yang diperlukan (misalnya suhu)
        const temperature = data.current.temp_c; // suhu dalam Celsius
        const feelsLike = data.current.feelslike_c; // suhu yang terasa

        // Buat grafik
        createChart(temperature, feelsLike);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function createChart(temperature, feelsLike) {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Suhu (°C)', 'Suhu yang Terasa (°C)'],
            datasets: [{
                label: 'Suhu Cuaca',
                data: [temperature, feelsLike],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Panggil fungsi untuk mengambil data cuaca
fetchWeatherData();
