import './Dashboard.css';
import React from 'react';
import InstructorCourses from '../Course/Courses/Courses';

const Dashboard = ()=>{
    return (
        <div>
            <InstructorCourses></InstructorCourses>
        </div>
    );
}

export default Dashboard;