import React, { useState, useEffect, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Table, Header, Icon, Divider, Button } from 'semantic-ui-react'
import './CourseEnrollments.css'
import axios from "axios";
import { UserContext } from "../../../../Providers/UserProvider";

const CourseEnrollements = (props) => {


    const courseId = useParams();
    const {info} = useContext(UserContext);
    const [enrollments, setEnrollments] = useState([]);
    const [redirect, setRedirect] = useState(null);
    const behost = process.env.REACT_APP_BACKEND_HOST;
    const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const id = courseId.id;
      let res = await axios.get(`${behost}course/get/enrollments/${id}`);      
      setEnrollments(res.data.enrollment);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
      fetchData();
  }, []);

  if (redirect) {
    return <Redirect to={redirect} />;
  }


    const renderTableRow = (enrollment) => {
        return <Table.Row>
            <Table.Cell>{enrollment.name}</Table.Cell>
            <Table.Cell>{enrollment.email}</Table.Cell>
            <Table.Cell>{enrollment.institute}</Table.Cell>
            {/* <Table.Cell>{enrollment.id}</Table.Cell> */}
            {/* <Table.Cell>
              <Button onClick={() => setRedirect(`/admin/student-profile/${enrollment.id}`)}>Profile</Button>
            </Table.Cell> */}
        </Table.Row>
    }

    return (
        <div>
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
                        {/* <Table.HeaderCell>Roll No.</Table.HeaderCell> */}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        enrollments.map((enrollment,index) => (renderTableRow(enrollment)))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

export default CourseEnrollements
