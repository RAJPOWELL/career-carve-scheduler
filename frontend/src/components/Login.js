// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
    const [name, setName] = useState(''); // State for storing the user's name
    const [role, setRole] = useState('student'); // State for storing the user's role (student or mentor)
    const [password, setPassword] = useState(''); // State for storing the user's password
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Function to handle login
    const handleLogin = () => {
        const loginData = { name, role, password }; // Prepare the login data

        axios.post('http://localhost:5000/api/auth/login', loginData) // Send login request to the backend
            .then(response => {
                alert('Login successful!'); // Alert on successful login
                navigate('/scheduler'); // Redirect to the scheduler page
            })
            .catch(err => {
                console.error(err); // Log the error
                alert('Error during login. Please try again.'); // Alert on error
            });
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)} // Update name state
                className="input-field"
            />
            <select onChange={e => setRole(e.target.value)} value={role} className="input-field">
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
            </select>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)} // Update password state
                className="input-field"
            />
            <button onClick={handleLogin} className="submit-button">Login</button>
        </div>
    );
};

export default Login;