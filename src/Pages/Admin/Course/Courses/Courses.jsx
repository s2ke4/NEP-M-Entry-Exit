import CourseCard from "../CourseCard/CourseCard";
import "./Courses.css";
import { useState, useEffect, React, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { UserContext } from "../../../../Providers/UserProvider";
import LoadingData from "../../../Shared/Loading/Loading";

const AdminCourses = () => {
  const [courses, setCourses] = useState([{}]);
  const { info } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const behost = process.env.REACT_APP_BACKEND_HOST;
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  var courseImg = [
    "/assets/images/Courses/course1.jpg",
    "/assets/images/Courses/course2.jpg",
    "/assets/images/Courses/course3.jpg",
    "/assets/images/Courses/course4.jpg",
    "/assets/images/Courses/course5.jpg",
    "/assets/images/Courses/course6.jpg",
  ];
  useEffect(() => {
    if(info.isLoading){
      ;
    }
    else if (!info.user || info.user.role !== "admin") {
      if (!info.user) {
        setRedirect("/");
      } else if (info.user.role === "instructor") {
        setRedirect("/instructor/dashboard");
      } else {
        setRedirect("/student/dashboard");
      }
    } else {
      fetchData();
    }
  }, [info]);

  const fetchData = async () => {
    try {
      let res = await axios.get(`${behost}course/get`);
        setCourses(res.data);
        setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      {loading ? (
        <LoadingData />
      ) : (
        <div className="courses-grid-div">
          {courses.map((course, index) => (
            <div key={index}>
              <CourseCard
                courseName={course.courseName}
                courseInstructor={course.instructor}
                totalSeat={course.totalSeat}
                courseImg={courseImg[index % 6]}
                courseId={course.id}
                registeredStudent={course.registeredStudent}
                requests={course.requests}
                id={course.id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
