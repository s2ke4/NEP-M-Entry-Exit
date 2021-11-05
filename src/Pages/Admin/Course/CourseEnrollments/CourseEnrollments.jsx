import React, { useState, useEffect, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Table, Header, Icon, Divider, Button, Modal,Form } from "semantic-ui-react";
import '../CourseEnrollments/CourseEnrollments.css'
import axios from "axios";
import Loading from '../../../Shared/Loading/Loading'
import { UserContext } from "../../../../Providers/UserProvider";

const CourseEnrollements = (props) => {

    const [open,setOpen] = useState(false);
    const courseId = useParams();
    const {info} = useContext(UserContext);
    const [enrollments, setEnrollments] = useState([]);
    const [redirect, setRedirect] = useState(null);
    const behost = process.env.REACT_APP_BACKEND_HOST;
    const [loading, setLoading] = useState(true);
    const [userGrade,setUserGrade] = useState({});
    const [formGrade,setFormGrade] = useState({});

  const fetchData = async () => {
    try {
      const id = courseId.id;
      let res = await axios.get(`${behost}course/get/enrollments/${id}`);
      setEnrollments(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    if(!info.isLoading){
      if (!info.user || info.user.role === "student") {
        if (!info.user) {
          setRedirect("/");
        } else {
          setRedirect("/student/dashboard");
        }
      } else {
        fetchData();
      }
    }
  }, [info]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  const showGradeForm = (enrollment)=>{
    setUserGrade({
      id: enrollment.id
    })
    setFormGrade({
      grade: enrollment.grade,
      completion: new Date(enrollment.completion),
      expiry: enrollment.expiry
    })
    setOpen(true);
  }

  const renderTableRow = (enrollment,key) => {
      return <Table.Row key={key}>
          <Table.Cell>{enrollment.name}</Table.Cell>
          <Table.Cell>{enrollment.email}</Table.Cell>
          <Table.Cell>{enrollment.institute}</Table.Cell>
          <Table.Cell>{enrollment.id}</Table.Cell>
          {info.user.role==="instructor" && <Table.Cell>{enrollment.grade?enrollment.grade:"Not Graded"}</Table.Cell>}
          <Table.Cell>
            <Button onClick={() => setRedirect(`/admin/student-profile/${enrollment.id}`)}>Profile</Button>
          </Table.Cell>
          {info.user.role==="instructor" && <Table.Cell>
            <Button onClick={()=>showGradeForm(enrollment)}>{enrollment.grade?"Edit Grade":"Submit Grade"}</Button>
          </Table.Cell>}
      </Table.Row>
  }

  const submitUserGrade = async(e)=>{
    await axios({ 
      method: "PUT",
      url: behost + "student/grade/" + courseId.id + "/" +userGrade.id ,
      data:formGrade,
      withCredentials: true
    })
    setOpen(false);
    let newEnrollment = enrollments.map((enrollment)=>{
      if(enrollment.id!==userGrade.id) return enrollment
      else{
        enrollment.grade=formGrade.grade;
        enrollment.completion=formGrade.completion;
        enrollment.expiry = formGrade.expiry;
        return enrollment;
      }
    })
    setEnrollments(newEnrollment)
  }

  const handleGradeForm = (e)=>{
    setFormGrade({
      ...formGrade,
      [e.target.name]:e.target.value
    })
  }

    return (
        <div>
          <Modal size="small" as={Form} onSubmit={submitUserGrade} open={open} onClose={() => setOpen(false)}>
            <Modal.Header>
              Edit User Grade
            </Modal.Header>
            <Modal.Content>
              <label>Grade</label>
              <input type="number" onChange={handleGradeForm} placeholder="Add User Grade" name="grade" value={formGrade.grade} required/>
              <label>Course Completion Date</label>
              <input type="date" onChange={handleGradeForm} placeholder="Enter course completion date" name="completion" value={formGrade.completion} required/>
              <label>Credit Expiry Date</label>
              <input type="date" onChange={handleGradeForm} placeholder="Enter Expiry Date of Grade" name="expiry" value={formGrade.expiry} required/>
            </Modal.Content>
            <Modal.Actions>
              <Button positive type="submit">Save</Button>
              <Button negative onClick={()=>setOpen(false)}>Cancel</Button>
            </Modal.Actions>
          </Modal>
          {loading? <Loading />:<div>
            <Header as='h2' className='course-enrollments-header-div' textAlign='center'>
                <Header.Content className='course-enrollments-header'>CS303 : Software Engineering</Header.Content>
            </Header>

            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='users' />
                    Course Enrollments
                </Header>
            </Divider>
            <Table celled textAlign='center' className='course-enrollments-table'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>E-mail</Table.HeaderCell>
                        <Table.HeaderCell>Institute</Table.HeaderCell>
                        <Table.HeaderCell>Roll No.</Table.HeaderCell>
                        {info.user.role==="instructor" && <Table.HeaderCell>Grade</Table.HeaderCell>}
                        <Table.HeaderCell>View Profile</Table.HeaderCell>
                        {info.user.role==="instructor" && <Table.HeaderCell>Submit/Edit</Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        enrollments.map((enrollment,index) => (renderTableRow(enrollment,index)))
                    }
                </Table.Body>
            </Table>
          </div>}
        </div>
    )
}

export default CourseEnrollements
