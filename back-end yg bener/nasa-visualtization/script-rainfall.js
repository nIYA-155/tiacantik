document.addEventListener('DOMContentLoaded', function() {
    getDataRainfall();
});

function getDataRainfall() {
    const apiKey = '230ae8ead0544e1f909132218240510';
    const city = 'Jakarta';
    const url = 'http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfoDiv = document.getElementById('weather-info');
            const weatherHTML = `
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>rainfall: ${data.current.precip_mm} mm</p>
            `;
            weatherInfoDiv.innerHTML = weatherHTML;


            const ctx = document.getElementById('rainfallChart').getContext('2d');
            const rainfallChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Rainfall (mm)'],
                    datasets: [{
                        label: 'Rainfall',
                        data: [data.current.precip_mm],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        fill: true
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Rainfall (mm)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Parameter'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}