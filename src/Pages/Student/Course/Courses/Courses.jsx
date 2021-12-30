import CourseCard from '../CourseCard/CourseCard';
import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { UserContext } from '../../../../Providers/UserProvider';
import LoadingData from '../../../Shared/Loading/Loading';

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
    ];
    
    useEffect(()=>{
        if(info.isLoading){
            ;
        }else if(!info.user) {
            fetchData();
        }
        else if (info.user.role!=="student") {
            if(info.user.role==="instructor"){
                setRedirect("/instructor/dashboard")
            } else {
                setRedirect("/admin/dashboard")
            }
        }
        else{
            fetchData();
        }
    },[info])

    const fetchData = async()=>{
        try {
            setLoading(true);
            let res = await axios.get(`${behost}course/get`);
            if(res){
                setCourses(res.data);
            }else{
                setRedirect("/404")
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
                info.user?
                <div className="courses-grid-div">
                    {
                        courses && courses.remainingCourses && courses.remainingCourses.map((course,index) => (
                            <div key={index}>
                                <CourseCard courseName = {course.courseName} courseInstructor = {course.instructor}  totalSeat = {course.totalSeat} courseImg = {courseImg[index % 6]}  courseId = {course.id} registeredStudent = { course.registeredStudent } courseType = {0} isActive={course.isActive} />
                            </div>
                        ))
                    }
                    {/* courseType: 1, The Courses in which student has applied */}
                    {
                        courses && courses.appliedCourses && courses.appliedCourses.map((course,index) => (
                            <div key={index}>
                                <CourseCard courseName = {course.courseName} courseInstructor = {course.instructor}  totalSeat = {course.totalSeat} courseImg = {courseImg[index % 6]}  courseId = {course.id} registeredStudent = { course.registeredStudent } courseType = {1} isActive={course.isActive} />
                            </div>
                        ))
                    }
                    {/* courseType: 3, The Courses in which student has been enrolled */}
                    {
                        courses && courses.enrolledCourses && courses.enrolledCourses.map((course,index) => (
                            <div key={index}>
                                <CourseCard courseName = {course.courseName} courseInstructor = {course.instructor}  totalSeat = {course.totalSeat} courseImg = {courseImg[index % 6]}  courseId = {course.id} registeredStudent = { course.registeredStudent } courseType = {2} isActive={course.isActive} showEnrollments={true} />
                            </div>
                        ))
                    }
                </div>
                :
                <div className="courses-grid-div">
                    {
                        courses && courses.map((course,index) => (
                            <div key={index}>
                                <CourseCard courseName = {course.courseName} courseInstructor = {course.instructor}  totalSeat = {course.totalSeat} courseImg = {courseImg[index % 6]}  courseId = {course.id} registeredStudent = { course.registeredStudent } courseType = {0} isActive={course.isActive} />
                            </div>
                        ))
                    }
                </div>
                
            }
        </div>
    )
}

export default StudentCourses
