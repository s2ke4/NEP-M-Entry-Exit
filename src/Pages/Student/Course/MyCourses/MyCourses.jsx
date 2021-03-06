import React from 'react'
import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { UserContext } from '../../../../Providers/UserProvider';
import CourseEnrollmentCard from '../MyCoursesCard/MyCoursesCard';
import LoadingData from '../../../Shared/Loading/Loading';

const MyCourses = () => {
    const [courses,setCourses] = useState([{}]);
    const [redirect, setRedirect] = useState(null);
    const behost = process.env.REACT_APP_BACKEND_HOST;
    const [loading,setLoading] = useState(true);
    const {info} = useContext(UserContext)
    
    var courseImg = [
        "/assets/images/Courses/course1.jpg",
        "/assets/images/Courses/course2.jpg",
        "/assets/images/Courses/course3.jpg",
        "/assets/images/Courses/course4.jpg",
        "/assets/images/Courses/course5.jpg",
        "/assets/images/Courses/course6.jpg",
        "/assets/images/Courses/course7.jpg",
        "/assets/images/Courses/course8.jpg",
    ];
    useEffect(()=>{
        if(!info.user) {
            fetchData();
        }
        else if (info.user.role!=="student") {
            if(info.user==="instructor"){
                setRedirect("/instructor/dashboard")
            } else {
                setRedirect("/admin/dashboard")
            }
        }else{
            fetchData();
        }
    },[info])

    const fetchData = async()=>{
        try {
            let res = await axios.get(`${behost}course/get/my-courses`);
            setCourses(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error.message)
        }
    }

    if(redirect){
        return <Redirect to={redirect} />;
    }

    return (
        <div>
            {
                loading?<p><LoadingData /></p>:
                <div className="courses-grid-div">
                    {
                        courses.length !== 0 ?
                        courses.map((course,index) => (
                            <div key={index}>
                                <CourseEnrollmentCard courseName = {course.courseName} courseInstructor = {course.instructor}  totalSeat = {course.totalSeat} courseImg = {courseImg[index % 6]}  courseId = {course.id} registeredStudent = { course.registeredStudent } />
                            </div>
                        ))
                        :
                        <div style={{ width: '100%' }}>
                            <h3>You are not enrolled in any course!</h3>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default MyCourses
