document.addEventListener('DOMContentLoaded', function() {
    // Membuat grafik curah hujan
    const ctxRainfall = document.getElementById('rainfallChart').getContext('2d');
    fetch('http://localhost:5000/api/rainfall') // Ganti dengan URL API yang sesuai
        .then(response => response.json())
        .then(data => {
            const rainfallChart = new Chart(ctxRainfall, {
                type: 'bar', // Menggunakan grafik batang
                data: {
                    labels: data.labels, // Label untuk sumbu X
                    datasets: [{
                        label: 'Rainfall (mm)', // Label untuk dataset
                        data: data.data, // Data curah hujan
                        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Warna latar belakang
                        borderColor: 'rgba(54, 162, 235, 1)', // Warna garis
                        borderWidth: 1 // Ketebalan garis
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true // Memulai sumbu Y dari 0
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching rainfall data:', error);
        });

    // Membuat grafik kecepatan angin
    const ctxWindSpeed = document.getElementById('windspeedChart').getContext('2d');
    fetch('http://localhost:5000/api/wind-speed') // Ganti dengan URL API yang sesuai
        .then(response => response.json())
        .then(data => {
            const windspeedChart = new Chart(ctxWindSpeed, {
                type: 'line', // Menggunakan grafik garis
                data: {
                    labels: data.labels, // Label untuk sumbu X
                    datasets: [{
                        label: 'Wind Speed (km/h)', // Label untuk dataset
                        data: data.data, // Data kecepatan angin
                        borderColor: 'rgba(75, 192, 192, 1)', // Warna garis
                        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Warna latar belakang
                        fill: true // Mengisi area di bawah garis
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true // Memulai sumbu Y dari 0
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching wind speed data:', error);
        });

    // Membuat grafik suhu
    const ctxTemperature = document.getElementById('temperatureChart').getContext('2d');
    fetch('http://localhost:5000/api/temperature') // Ganti dengan URL API yang sesuai
        .then(response => response.json())
        .then(data => {
            const temperatureChart = new Chart(ctxTemperature, {
                type: 'bar', // Menggunakan grafik batang
                data: {
                    labels: data.labels, // Label untuk sumbu X
                    datasets: [{
                        label: 'Temperature (°C)', // Label untuk dataset
                        data: data.data, // Data suhu
                        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Warna latar belakang
                        borderColor: 'rgba(255, 99, 132, 1)', // Warna garis
                        borderWidth: 1 // Ketebalan garis
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true // Memulai sumbu Y dari 0
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching temperature data:', error);
        });
});

function goBack() {
    window.history.back(); // Kembali ke halaman sebelumnya
}
