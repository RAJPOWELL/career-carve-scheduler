// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const handleSignup = () => {
        const signupData = { name, area_of_interest: areaOfInterest, role };

        axios.post('http://localhost:5000/api/auth/signup', signupData)
            .then(response => {
                alert('Signup successful!');
                navigate('/login'); // Redirect to login page after successful signup
            })
            .catch(err => {
                console.error(err);
                alert('Error during signup. Please try again.');
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
            <select onChange={e => setAreaOfInterest(e.target.value)} value={areaOfInterest} className="input-field">
                <option value="">Select Area of Interest</option>
                <option value="FMCG Sales">FMCG Sales</option>
                <option value="Equity Research">Equity Research</option>
                <option value="Digital Marketing">Digital Marketing</option>
            </select>
            <select onChange={e => setRole(e.target.value)} value={role} className="input-field">
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
            </select>
            <button onClick={handleSignup} className="submit-button">Signup</button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;