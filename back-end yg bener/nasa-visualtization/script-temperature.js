document.addEventListener('DOMContentLoaded', function() {
    getDataTemperature();
});
function getDataTemperature() {
    const apiKey = '230ae8ead0544e1f909132218240510';
    const city = 'Jakarta';
    const url = 'http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfoDiv = documentlementById('weather-info');
            const weatherHTML=`
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>Temperature: ${data.current.temp_c} °C</p>
            `;
            weatherInfoDiv.innerHTML = weatherHTML;
            const ctx = document.getElementById('temperatureChart').getContext('2d');
            const temperatureChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['temperature (°C)'],
                    datasets: [{                        label: 'Temperature',
                        data: [data.current.temp_c],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
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
                                text: 'Temperature (°C)'
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
