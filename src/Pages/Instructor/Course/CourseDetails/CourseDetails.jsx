import { Button, Container, Segment, Modal } from "semantic-ui-react";
import { useState, useEffect,useContext } from 'react';
import { Redirect,useParams } from 'react-router-dom'
import {UserContext} from '../../../../Providers/UserProvider'
import axios from 'axios';
import '../CourseDetails/CourseDetails.css'
import LoadingData from "../../../Shared/Loading/Loading";
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
          if(!info.isLoading){
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
          }
      },[info])
    
    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <Container>
            {loading?<LoadingData />:<div className="course-detail">
                <Segment>
                <h2 className="heading">
                {data.courseName}
                <Button
                    floated="right"
                    icon="users"
                    content="Enrolled Student"
                    color="blue"
                    onClick={() => setRedirect(`/instructor/courses/${id}/enrollments`)}
                />
                </h2>
                    {renderElement()}
                </Segment>
            </div>}
        </Container>
    );
}

export default InstructorCourseDetail;