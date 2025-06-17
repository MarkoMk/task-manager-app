const { BrowserRouter, Routes, Route, Link, useNavigate } = ReactRouterDOM;

function App() {
    const [token, setToken] = React.useState(localStorage.getItem('token'));

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <BrowserRouter>
            <header>
                <h1>Task Manager</h1>
                <nav>
                    {token ? (
                        <>
                            <Link to="/tasks">Tasks</Link>
                            <Link to="/search">Search</Link>
                            <a href="#" onClick={logout}>Logout</a>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </nav>
            </header>
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register setToken={setToken} />} />
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/tasks/:id" element={<TaskDetail />} />
                    <Route path="/tasks/add" element={<TaskForm />} />
                    <Route path="/tasks/edit/:id" element={<TaskForm />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/weather" element={<Weather />} />
                </Routes>
            </main>
            <footer>
                <p>© 2025 Task Manager</p>
            </footer>
        </BrowserRouter>
    );
}

function Home() {
    return (
        <>
            <h2>Welcome to Task Manager</h2>
            <p>Create, manage, and track your tasks efficiently.</p>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));