document.addEventListener('DOMContentLoaded', function() {
    getDataWindSpeed();
});

function getDataWindSpeed() {
    const apiKey = '230ae8ead0544e1f909132218240510';
    const city = 'Jakarta';
    const url = 'http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfoDiv = document.getElementById('weather-info');
            const weatherHTML = `
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>Windspeed: ${data.current.wind_kph} kph</p>
            `;
            weatherInfoDiv.innerHTML = weatherHTML;

        
            const ctx = document.getElementById('windspeedChart').getContext('2d');
            const kecepatanAnginChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Wind speed (kph)'],
                    datasets: [{
                        label: 'Wind speed',
                        data: [data.current.wind_kph],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
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
                                text: 'wind speed (kph)'
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