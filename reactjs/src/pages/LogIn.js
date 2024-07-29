import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import AuthService from "./services/auth.service";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Added state for error messages

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(""); // Clear previous errors
        try {
            await AuthService.login(email, password);
            navigate("/dashboard");
        } catch (error) {
            // Display the error to the user
            setError(error.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Log In Page</h1>
                <Link to="/" className="App-link">Home</Link>
            </header>
            <section>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    {error && <p className="error-message">{error}</p>} {/* Display error messages */}
                    <button type="submit">Log In</button>
                </form>
            </section>
        </div>
    );
}

export default LogIn;
