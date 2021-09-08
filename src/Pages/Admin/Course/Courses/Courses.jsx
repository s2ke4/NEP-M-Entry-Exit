import React from 'react'
import CourseCard from '../CourseCard/CourseCard';
import "./Courses.css"

const AdminCourses = () => {

    const courses = [
        {
            courseCode: "CS301",
            courseInstructor: "Dr. Sunandita Debnath",
            courseName: "Computer Networks",
            courseEnrollments: 120,
            courseImg: "assets/images/Courses/course1.jpg"
        },
        {
            courseCode: "CS303",
            courseInstructor: "Dr. Novarun Deb",
            courseName: "Software Engineering",
            courseEnrollments: 120,
            courseImg: "assets/images/Courses/course2.jpg"
        },
        {
            courseCode: "CS305",
            courseInstructor: "Dr. Manasi Kulkarni",
            courseName: "Automata and Theory of Computation",
            courseEnrollments: 120,
            courseImg: "assets/images/Courses/course3.jpg"
        },
        {
            courseCode: "CS331",
            courseInstructor: "Dr. Pratik Shah",
            courseName: "Information Retrieval",
            courseEnrollments: 120,
            courseImg: "assets/images/Courses/course4.jpg"
        },
        {
            courseCode: "CS421",
            courseInstructor: "Dr. Antriksh Goswami",
            courseName: "Cloud Computing",
            courseEnrollments: 120,
            courseImg: "assets/images/Courses/course5.jpg"
        },
    ];

    const renderCourse = (course) => {
        return CourseCard({courseName: course.courseName, courseInstructor: course.courseInstructor, courseCode: course.courseCode, courseEnrollments: course.courseEnrollments, courseImg: course.courseImg});
    }


    return (
        <div class="courses-grid-div">
            {
                courses.map((course, index) => (
                    <div key={index}>{renderCourse(course)}</div>
                ))
            }
        </div>
    )
}

export default AdminCourses
