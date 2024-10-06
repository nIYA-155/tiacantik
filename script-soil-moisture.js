document.addEventListener('DOMContentLoaded', function() {
    const ctxSoilMoisture = document.getElementById('soilmoistureChart').getContext('2d');
    
    // Ganti URL ini dengan endpoint API yang sesuai
    fetch('http://localhost:5000/api/soil-moisture') 
        .then(response => response.json())
        .then(data => {
            // Misalkan data mengandung labels dan data untuk soil moisture
            const soilMoistureChart = new Chart(ctxSoilMoisture, {
                type: 'line', // Menggunakan grafik garis
                data: {
                    labels: data.labels, // Label untuk sumbu X (misal: waktu atau tanggal)
                    datasets: [{
                        label: 'Soil Moisture (%)', // Label untuk dataset
                        data: data.data, // Data kelembapan tanah
                        borderColor: 'rgba(75, 192, 192, 1)', // Warna garis
                        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Warna latar belakang
                        fill: true, // Mengisi area di bawah garis
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
            console.error('Error fetching soil moisture data:', error);
        });
});

function goBack() {
    window.history.back(); // Kembali ke halaman sebelumnya
}
