import { Button, Container, Segment, Modal } from "semantic-ui-react";
import { useState, useEffect } from 'react';
import { Redirect,useParams } from 'react-router-dom'
import axios from 'axios';
import './CourseDetail.css'
const CourseDetail = () => {
    const { id } = useParams();
    const [data,setData] = useState();
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
    const [open, setOpen] = useState(false);
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
                setLoading(false);
            }else{
                setRedirect("/404")
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDelete = async()=>{
       try {
        await axios.delete(`${behost}course/delete/${id}`)
        setOpen(false);
        setRedirect("/admin/dashboard")
       } catch (error) {
           console.log(error.message);
       }
    }

    useEffect(()=>{
        axios.get(`${behost}auth/status`).then((res) => {
          if (!res.data.user || res.data.user.role!=="admin") {
             if(!res.data.user){
               setRedirect("/");
             }else if(res.data.user==="instructor"){
               setRedirect("/instructor/dashboard")
             }else{
               setRedirect("/student/dashboard")
             }
          }else{
              fetchData();
          }
        })
      },[])
    
    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <Container>
            {loading?<p>Loading...</p>:<div className="course-detail">
                <Modal
                    size="small"
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Modal.Header>Delete This Course</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete this course. This action can't be undo.</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={handleDelete}>
                            Yes
                        </Button>
                        <Button onClick={() => setOpen(false)}>
                            No
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Segment>
                    <h2 className="heading">
                        {data.courseName}
                        <Button
                            floated="right"
                            icon="edit"
                            content="Edit"
                            color="green"
                            onClick={()=>setRedirect(`/admin/edit-course/${id}`)}
                        />
                        <Button
                            floated="right"
                            icon="trash"
                            color="red"
                            onClick={() => setOpen(true)}
                            content="Delete"
                        />
                    </h2>
                    {renderElement()}
                </Segment>
            </div>}
        </Container>
    );
}

export default CourseDetail;