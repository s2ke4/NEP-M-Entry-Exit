import './Dashboard.css';
import React from 'react';
import StudentCourses from '../Course/Courses/Courses';

const Dashboard = ()=>{
    return (
        <div>
           <StudentCourses></StudentCourses>
        </div>
    );
}

export default Dashboard;