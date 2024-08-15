// src/components/Scheduler.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scheduler = () => {
    const [mentors, setMentors] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [duration, setDuration] = useState(30);
    const [sessionTime, setSessionTime] = useState('');
    const [selectedMentor, setSelectedMentor] = useState('');

    const fetchMentors = () => {
        axios.get('http://localhost:5000/api/mentors')
            .then(response => setMentors(response.data))
            .catch(error => console.error('Error fetching mentors:', error));
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    const handleSchedule = () => {
        const studentData = { name: studentName, area_of_interest: areaOfInterest };

        axios.post('http://localhost:5000/api/students', studentData)
            .then(response => {
                const sessionData = {
                    student_id: response.data.id,
                    mentor_id: selectedMentor,
                    duration,
                    session_time: sessionTime
                };

                return axios.post('http://localhost:5000/api/sessions', sessionData);
            })
            .then(() => {
                alert('Session scheduled successfully!');
                // Optionally reset form fields here
                setStudentName('');
                setAreaOfInterest('');
                setDuration(30);
                setSessionTime('');
                setSelectedMentor('');
                fetchMentors(); // Refresh mentor list after scheduling
            })
            .catch(err => {
                console.error(err);
                alert('Error scheduling session. Please check your input and try again.');
            });
    };

    return (
        <div>
            <h1>Schedule a Session</h1>
            <input
                type="text"
                placeholder="Student Name"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
            />
            <select onChange={e => setAreaOfInterest(e.target.value)} value={areaOfInterest}>
                <option value="">Select Area of Interest</option>
                <option value="FMCG Sales">FMCG Sales</option>
                <option value="Equity Research">Equity Research</option>
                <option value="Digital Marketing">Digital Marketing</option>
            </select>
            <select onChange={e => setSelectedMentor(e.target.value)} value={selectedMentor}>
                <option value="">Select a Mentor</option>
                {mentors.map(mentor => (
                    <option key={mentor.id} value={mentor.id}>
                        {mentor.name} - {mentor.area_of_interest}
                    </option>
                ))}
            </select>
            <select onChange={e => setDuration(e.target.value)} value={duration}>
                <option value="30">30 mins</option>
                <option value="45">45 mins</option>
                <option value="60">60 mins</option>
            </select>
            <input
                type="datetime-local"
                value={sessionTime}
                onChange={e => setSessionTime(e.target.value)}
            />
            <button onClick={handleSchedule}>Schedule Session</button>
        </div>
    );
};

export default Scheduler;