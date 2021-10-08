import CourseCard from '../CourseCard/CourseCard';
import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { UserContext } from '../../../../Providers/UserProvider';

const StudentCourses = () => {
    const [courses,setCourses] = useState({});
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
            let res = await axios.get(`${behost}course/get`);
            if(res){
                setCourses(res.data);
                console.log("hello");
                console.log(res.data);
                setLoading(false);
            }else{
                setRedirect("/404")
            }
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
                loading?<p>loading...</p>:
                info.user?
                <div className="courses-grid-div">
                    {/* courseType: 0, The Courses in which student hasn't applied or is not enrolled or has been rejected. */}
                    {
                        courses.remainingCourses.map((course,index) => (
                            <div key={index}>
                                <CourseCard courseName = {course.courseName} courseInstructor = {course.instructor}  totalSeat = {course.totalSeat} courseImg = {courseImg[index % 7]}  courseId = {course.id} registeredStudent = { course.registeredStudent } courseType = {0} />
                            </div>
                        ))
                    }
                    {/* courseType: 1, The Courses in which student has applied */}
                    {
                        courses.appliedCourses.map((course,index) => (
                            <div key={index}>
                                <CourseCard courseName = {course.courseName} courseInstructor = {course.instructor}  totalSeat = {course.totalSeat} courseImg = {courseImg[index % 7]}  courseId = {course.id} registeredStudent = { course.registeredStudent } courseType = {1} />
                            </div>
                        ))
                    }
                    {/* courseType: 3, The Courses in which student has been enrolled */}
                    {
                        courses.enrolledCourses.map((course,index) => (
                            <div key={index}>
                                <CourseCard courseName = {course.courseName} courseInstructor = {course.instructor}  totalSeat = {course.totalSeat} courseImg = {courseImg[index % 7]}  courseId = {course.id} registeredStudent = { course.registeredStudent } courseType = {2} />
                            </div>
                        ))
                    }
                </div>
                :
                <div className="courses-grid-div">
                    {
                        courses.map((course,index) => (
                            <div key={index}>
                                <CourseCard courseName = {course.courseName} courseInstructor = {course.instructor}  totalSeat = {course.totalSeat} courseImg = {courseImg[index % 7]}  courseId = {course.id} registeredStudent = { course.registeredStudent } courseType = {0} />
                            </div>
                        ))
                    }
                </div>
                
            }
        </div>
    )
}

export default StudentCourses
