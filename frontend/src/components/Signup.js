// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState(''); // New field for mentor
    const [role, setRole] = useState('student');
    const [password, setPassword] = useState(''); // Password field
    const navigate = useNavigate();

    const handleSignup = () => {
        // Prepare signup data
        const signupData = { 
            name, 
            company_name: role === 'mentor' ? companyName : null, 
            role, 
            password 
        };

        // Send signup request
        axios.post('http://localhost:5000/api/auth/signup', signupData)
            .then(response => {
                alert('Signup successful!');
                navigate('/login'); // Redirect to login page after successful signup
            })
            .catch(err => {
                console.error(err); // Log the error
                alert('Error during signup. Please try again.'); // Alert on error
            });
    };

    return (
        <div className="signup-container">
            <h1>Signup</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="input-field"
            />
            {role === 'mentor' && ( // Show company name field only for mentors
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="input-field"
                />
            )}
            <select onChange={e => setRole(e.target.value)} value={role} className="input-field">
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
            </select>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field"
            />
            <button onClick={handleSignup} className="submit-button">Signup</button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;