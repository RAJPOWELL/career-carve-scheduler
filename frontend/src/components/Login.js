// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const handleLogin = () => {
        const loginData = { name, role };

        axios.post('http://localhost:5000/api/auth/login', loginData)
            .then(response => {
                alert('Login successful!');
                navigate('/scheduler'); // Redirect to scheduler page after successful login
            })
            .catch(err => {
                console.error(err);
                alert('Error during login. Please try again.');
            });
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="input-field"
            />
            <select onChange={e => setRole(e.target.value)} value={role} className="input-field">
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
            </select>
            <button onClick={handleLogin} className="submit-button">Login</button>
        </div>
    );
};

export default Login;