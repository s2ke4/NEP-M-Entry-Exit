import CourseCard from '../CourseCard/CourseCard';
import { useState, useEffect,useContext } from 'react';
import {UserContext} from '../../../../Providers/UserProvider'
import axios from 'axios';
import { Redirect } from 'react-router';
import LoadingData from '../../../Shared/Loading/Loading';

const InstructorCourses = () => {
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
    ];
    useEffect(()=>{
        if(info.isLoading){
            ;
        }else if (!info.user || info.user.role!=="instructor") {
             if(!info.user){
               setRedirect("/");
             }else if(info.user==="admin"){
               setRedirect("/admin/dashboard")
             }else{
               setRedirect("/student/dashboard")
             }
          }else{
              fetchData();
          }
    },[info])

    const fetchData = async()=>{
        try {
            let res = await axios.get(`${behost}course/get`);
            if(res.data.length>0){
                setCourses(res.data);
            }
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
                loading?<LoadingData />:
                <div className="courses-grid-div">
                    {
                        courses.map((course,index) => (
                            <div key={index}>
                                <CourseCard courseName = {course.courseName} courseInstructor = {course.instructor}  totalSeat = {course.totalSeat} courseImg = {courseImg[index % 6]}  courseId = {course.id} registeredStudent = { course.registeredStudent } />
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default InstructorCourses
