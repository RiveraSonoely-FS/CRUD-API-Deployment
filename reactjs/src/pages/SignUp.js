import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import AuthService from "./services/auth.service";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignin = async (event) => {
        event.preventDefault();
        setError(""); 
        try {
            await AuthService.signup(email, password);
            navigate("/dashboard");
        } catch (error) {
            
            setError(error.message || 'Sign Up failed. Please try again.');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Sign Up Page</h1>
                <Link to="/dashboard" className="App-link">Dashboard</Link>
            </header>
            <section>
                <form onSubmit={handleSignin}>
                    <div>
                        <label htmlFor="email"></label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password"></label>
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
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="App-btn">Sign Up</button>
                </form>
            </section>
        </div>
    );
}

export default SignUp;
