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
    const [course,setCourse] = useState({});
    const [redirect, setRedirect] = useState(null);
    const behost = process.env.REACT_APP_BACKEND_HOST;
    const [loading, setLoading] = useState(true);
    const [userGrade,setUserGrade] = useState({});
    const [formGrade,setFormGrade] = useState({});

  const fetchData = async () => {
    try {
      const id = courseId.id;
      let res = await axios.get(`${behost}course/get/enrollments/${id}`);
      setEnrollments(res.data.enrollment);
      setCourse(res.data.course);
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

  const getFormattedDate = (date)=>{
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  const showGradeForm = (enrollment)=>{
    setUserGrade({
      id: enrollment.id
    })
    setFormGrade({
      grade: enrollment.grade,
      completion: enrollment.grade?getFormattedDate(new Date(enrollment.completion)):null,
      expiry: enrollment.grade?getFormattedDate(new Date(enrollment.expiry)):null
    })
    setOpen(true);
  }

  const renderTableRow = (enrollment,key) => {
      return <Table.Row key={key}>
          <Table.Cell>{enrollment.name}</Table.Cell>
          <Table.Cell>{enrollment.email}</Table.Cell>
          <Table.Cell>{enrollment.institute}</Table.Cell>
          <Table.Cell>{enrollment.id}</Table.Cell>
          {info.user.role==="instructor" && <Table.Cell>{enrollment.grade?enrollment.grade:"Not Credited"}</Table.Cell>}
          <Table.Cell>
            <Button onClick={() => setRedirect(`/admin/student-profile/${enrollment.id}`)}>Profile</Button>
          </Table.Cell>
          {info.user.role==="instructor" && <Table.Cell>
            <Button disabled={!course[0].isActive} onClick={()=>showGradeForm(enrollment)}>{enrollment.grade?"Edit Credit":"Submit Credit"}</Button>
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
    let tem = await axios.get(`${behost}course/getAbcId/${courseId.id}`);
    await axios({ 
      method: "PUT",
      url: behost + "abc/grade/" + tem.data.abcCourseId + "/" +userGrade.id ,
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
              {formGrade.grade?"Edit":"Submit"} User Credit
            </Modal.Header>
            <Modal.Content>
              <label>Credit</label>
              <input type="number" step="1" onChange={handleGradeForm} placeholder="Add User Credit" name="grade" value={formGrade.grade} required onkeydown={(e) => {if(e.key==='.'){e.preventDefault();}console.log(e)}} />
              <label>Course Completion Date</label>
              <input type="date" onChange={handleGradeForm} placeholder="Enter course completion date" name="completion" value={formGrade.completion} required/>
              <label>Credit Expiry Date</label>
              <input type="date" onChange={handleGradeForm} placeholder="Enter Expiry Date of Credit" name="expiry" value={formGrade.expiry} required/>
            </Modal.Content>
            <Modal.Actions>
              <Button positive type="submit">Save</Button>
              <Button negative onClick={()=>setOpen(false)}>Cancel</Button>
            </Modal.Actions>
          </Modal>
          {loading? <Loading />:<div>
            <Header as='h2' className='course-enrollments-header-div' textAlign='center'>
                <Header.Content className='course-enrollments-header'>{course[0].courseName}</Header.Content>
            </Header>
            {!course[0].isActive && <Header as='h5' textAlign='center'>
                <Header.Content>
                  This course is not active so you cannot able to submit/edit student Credit.
                </Header.Content>
            </Header>}
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
                        {info.user.role==="instructor" && <Table.HeaderCell>Credit</Table.HeaderCell>}
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
