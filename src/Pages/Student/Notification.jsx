import { Table, Header, Icon, Divider } from 'semantic-ui-react'
import { Redirect, useParams, Link } from "react-router-dom";
import { useState, useEffect, React, useContext } from "react";
import axios from "axios";

const Notification = () => {

    const [notification, setNotification] = useState({});
    const behost = process.env.REACT_APP_BACKEND_HOST;
    const [loading,setLoading] = useState(true);
    const [redirect, setRedirect] = useState(null);

    const fetchData = async () => {
      try {
        let res = await axios.get(`${behost}student/notifications`);
        console.log(res.data);
        if (res.data.length > 0) {
          setNotification(res.data);
          setLoading(false);
        } else {
          setRedirect("/404");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    useEffect(() => {
        fetchData();
    },)

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    const enrollments = [
        {name: 'Abhay Dwiwedi', email: '201951002@iiitvadodara.ac.in'},
        {name: 'Ayush Patel', email: '201951038@iiitvadodara.ac.in'},
        {name: 'Darshan Devendra Hande', email: '201951052@iiitvadodara.ac.in'},
        {name: 'Keshav Agarwal', email: '201951080@iiitvadodara.ac.in'},
        {name: 'Hari Om', email: '201951068@iiitvadodara.ac.in'},
        {name: 'Nitanshu Lokhande', email: '201951107@iiitvadodara.ac.in'},
        {name: 'Divyam Solanki', email: 'solankidivyam00@gmail.com'},
        {name: 'Chirag Jain', email: '201951049@iiitvadodara.ac.in'},
    ];

    const renderTableRow = (notification) => {
        return <Table.Row>
            <Table.Cell>{notification.CourseId}</Table.Cell>
            <Table.Cell>{notification.StudnetId}</Table.Cell>
        </Table.Row>
    }

    return (
        <div>
            <Table celled textAlign='center' className='course-enrollments-table'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Course Name</Table.HeaderCell>
                        <Table.HeaderCell>Instructor</Table.HeaderCell>
                        <Table.HeaderCell>Message</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
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

export default Notification;
