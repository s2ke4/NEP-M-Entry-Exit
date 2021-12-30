import {
    Table,
    Header,
    Icon,
    Divider,
  } from "semantic-ui-react";
  import { Redirect, useParams, Link } from "react-router-dom";
  import { useEffect, useState, useContext } from "react";
  import axios from "axios";
  import { UserContext } from "../../../Providers/UserProvider";

  
  const StudentVerify = () => {

    const { studentId } = useParams();
    const [enrollments, setData] = useState([]);
    const behost = process.env.REACT_APP_BACKEND_HOST;
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(null);
    const { info } = useContext(UserContext);
    
    const fetchData = async () => {
        try {
          let res = await axios.get(`${behost}student/verify/${studentId}`);
          if (res.data) {
            setData(res.data);;  
            setLoading(false);
          } else {
            setRedirect("/404");
          }
        } catch (error) {
          console.log(error.message);
        }
    };

    useEffect(() => {
      if (!info.isLoading) {
        if (!info.user || info.user.role !== "admin") {
          if (!info.user) {
            setRedirect("/");
          } else if (info.user === "instructor") {
            setRedirect("/instructor/dashboard");
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

  const renderTableRow = (enrollment) => {
    return <Table.Row>
        <Table.Cell><a href = "http://localhost:3000/college/demo" target = '_blank'>{enrollment.courseName}</a></Table.Cell>
        {/* <Table.Cell><Link to = {enrollment.courseLink}>{enrollment.courseLink}</Link></Table.Cell> */}
        <Table.Cell>{enrollment.instituteName}</Table.Cell>
        <Table.Cell>{enrollment.creditEarned}</Table.Cell>
        <Table.Cell>{enrollment.expiry}</Table.Cell>
        <Table.Cell>{enrollment.enrollmentDate}</Table.Cell>
        <Table.Cell>{enrollment.completionDate}</Table.Cell>
        {/* <Table.Cell>
          <Button onClick={() => setRedirect(`/admin/student-profile/${enrollment.id}`)}>Profile</Button>
        </Table.Cell> */}
    </Table.Row>
  }

  return (
    <div>
        <Header as='h2' className='course-enrollments-header-div' textAlign='center'>
            <Header.Content className='course-enrollments-header'>Student's course enrollments</Header.Content>
        </Header>

        <Divider horizontal>
            <Header as='h7'>
                <Icon name='users' />
                Course Enrollments
            </Header>
        </Divider>
        <Table celled textAlign='center' className='course-enrollments-table'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Course Name</Table.HeaderCell>
                    {/* <Table.HeaderCell>Course Link</Table.HeaderCell> */}
                    <Table.HeaderCell>Institute</Table.HeaderCell>
                    <Table.HeaderCell>Credits Earned</Table.HeaderCell>
                    <Table.HeaderCell>Expiry</Table.HeaderCell>
                    <Table.HeaderCell>Enrollment Date</Table.HeaderCell>
                    <Table.HeaderCell>Completion Date</Table.HeaderCell>
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

  export default StudentVerify
 