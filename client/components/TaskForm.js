const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouterDOM;

function TaskForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                try {
                    const response = await axios.get(`/api/tasks/${id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                    const task = response.data.task;
                    setTitle(task.title);
                    setDescription(task.description);
                    setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
                } catch (err) {
                    alert(err.response?.data?.message || 'Failed to fetch task');
                }
            };
            fetchTask();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const taskData = { title, description, dueDate };
            if (id) {
                await axios.put(`/api/tasks/${id}`, taskData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            } else {
                await axios.post('/api/tasks', taskData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            }
            navigate('/tasks');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to save task');
        }
    };

    return (
        <>
            <h2>{id ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <button type="submit">{id ? 'Save Changes' : 'Add Task'}</button>
            </form>
        </>
    );
}