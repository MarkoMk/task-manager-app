const { useState, useEffect } = React;
const { useParams, Link } = ReactRouterDOM;

function TaskDetail() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`/api/tasks/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setTask(response.data.task);
                setWeather(response.data.weather);
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to fetch task');
            }
        };
        fetchTask();
    }, [id]);

    if (!task) return <p>Loading...</p>;

    return (
        <>
            <h2>Task: {task.title}</h2>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
            {weather && (
                <p><strong>Weather:</strong> {weather.weather[0].description}, {weather.main.temp}°C</p>
            )}
            <Link to="/tasks">Back to List</Link>
            <Link to={`/tasks/edit/${id}`}>Edit</Link>
        </>
    );
}