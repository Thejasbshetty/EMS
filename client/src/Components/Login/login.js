import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', {
                user_name: userName,
                password: password,
            });

            if (response.status === 200) {
                setMessage('Login successful!');
                // Update authentication state or context here
                navigate('/home'); // Redirect to homepage after successful login
            } else {
                setMessage(response.data.message); // Assuming response contains a message field
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message); // Assuming response contains a message field
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit} className="w-25 p-3 border rounded">
                <h2 className="text-center mb-4">Login</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                {message && <div className="mt-3 alert alert-info">{message}</div>}
            </form>
        </div>
    );
};

export default Login;
