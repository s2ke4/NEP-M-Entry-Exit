import React from 'react'
import "./Courses.css"

const Courses = () => {

    const courses = [
        {
            courseName: "CS301",
            courseInstructor: "Dr. Sunandita Debnath",
            courseDesc: "Computer Networks blah blah blah blah.... blah blah blah blah.... blah blah blah blah.... blah blah blah blah.... blah blah blah blah....",
            courseEnrollments: 120,
        },
        {
            courseName: "CS303",
            courseInstructor: "Dr. Novarun Deb",
            courseDesc: "Software Engineering blah blah blah blah.... blah blah blah blah.... blah blah blah blah.... blah blah blah blah.... blah blah blah blah....",
            courseEnrollments: 120,
        },
        {
            courseName: "CS305",
            courseInstructor: "Dr. Manasi Kulkarni",
            courseDesc: "Automata and Theory of Computation blah blah blah blah.... blah blah blah blah.... blah blah blah blah.... blah blah blah blah.... blah blah blah blah....",
            courseEnrollments: 120,
        },
        {
            courseName: "Information Retrieval",
            courseInstructor: "Dr. Pratik Shah",
            courseDesc: "Information Retrieval blah blah blah blah.... blah blah blah blah.... blah blah blah blah.... blah blah blah blah.... blah blah blah blah....",
            courseEnrollments: 120,
        },
        {
            courseName: "Clloud Computing",
            courseInstructor: "Dr. Antriksh Goswami",
            courseDesc: "Cloud Computing blah blah blah blah.... blah blah blah blah.... blah blah blah blah.... blah blah blah blah.... blah blah blah blah....",
            courseEnrollments: 120,
        },

    ];

    const displayCourses = () => {
        courses.forEach(
            
        );
    }


    return (
        <div class="courses-grid-div">
            
        </div>
    )
}

export default Courses
