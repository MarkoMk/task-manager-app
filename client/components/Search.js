const { useState } = React;
const { Link } = ReactRouterDOM;

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/api/tasks', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const filtered = response.data.filter(task =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setResults(filtered);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to search tasks');
        }
    };

    return (
        <>
            <h2>Search Tasks</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Search Term</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter task title or description"
                    />
                </div>
                <button type="submit">Search</button>
            </form>
            <ul>
                {results.map(task => (
                    <li key={task._id}>
                        <Link to={`/tasks/${task._id}`}>{task.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}