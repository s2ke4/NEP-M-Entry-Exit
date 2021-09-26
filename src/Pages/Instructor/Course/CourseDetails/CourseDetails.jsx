import { Button, Container, Segment, Modal } from "semantic-ui-react";
import { useState, useEffect,useContext } from 'react';
import { Redirect,useParams } from 'react-router-dom'
import {UserContext} from '../../../../Providers/UserProvider'
import axios from 'axios';
import '../CourseDetails/CourseDetails.css'
const InstructorCourseDetail = () => {
    const { id } = useParams();
    const [data,setData] = useState();
    const {info} = useContext(UserContext)
    const detailElement = [
        { label: "Course Instructor Name", name: "instructor" },
        { label: "Course Instructor Email", name: "instructorEmail" },
        { label: "Course Credit", name: "credit" },
        { label: "Total Seats", name: "totalSeat" },
        { label: "Registered Student", name: "registeredStudent" },
        { label: "Enrollment Fee", name: "fee" },
        { label: "Eligibility", name: "eligibility" },
        { label: "Course Prerequisite", name: "prerequisite" },
        { label: "Course Description", name: "description" },
    ]
    const [redirect, setRedirect] = useState(null);
    const behost = process.env.REACT_APP_BACKEND_HOST;
    const [loading,setLoading] = useState(true);
    const renderElement = () => {
        return detailElement.map((ele, index) => (
            <div>
                <h3>{ele.label}</h3>
                <div>{data[ele.name]}</div>
            </div>
        ))
    }

    const fetchData = async()=>{
        try {
            let res = await axios.get(`${behost}course/get/${id}`);
            if(res.data.length>0){
                setData(res.data[0]);
            }else{
                setRedirect("/404")
            }
            setLoading(false);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
          if (!info.user || info.user.role!=="instructor") {
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
    
    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <Container>
            {loading?<p>Loading...</p>:<div className="course-detail">
                <Segment>
                    {renderElement()}
                </Segment>
            </div>}
        </Container>
    );
}

export default InstructorCourseDetail;