const { useState, useEffect } = React;

function Weather() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get('/api/tasks/123', { // Mock task ID for weather
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setWeather(response.data.weather);
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to fetch weather');
            }
        };
        fetchWeather();
    }, []);

    if (!weather) return <p>Loading...</p>;

    return (
        <>
            <h2>Weather for Task Location</h2>
            <p><strong>Location:</strong> Skopje</p>
            <p><strong>Weather:</strong> {weather.weather[0].description}, {weather.main.temp}°C</p>
            <p><strong>Source:</strong> OpenWeatherMap API</p>
        </>
    );
}