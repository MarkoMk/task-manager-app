const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/tasks', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setTasks(response.data);
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to fetch tasks');
            }
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`/api/tasks/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setTasks(tasks.filter(task => task._id !== id));
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to delete task');
            }
        }
    };

    return (
        <>
            <h2>Task List</h2>
            <Link to="/tasks/add">Add Task</Link>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <Link to={`/tasks/${task._id}`}>{task.title}</Link>
                        <button className="delete" onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
}