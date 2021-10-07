import { Table, Header, Icon, Divider } from 'semantic-ui-react'
import { Redirect, useParams, Link } from "react-router-dom";
import { useState, useEffect, React, useContext } from "react";
import axios from "axios";

const Notification = () => {

    const [notification, setNotification] = useState([{}]);
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
    },[])

    if (redirect) {
      return <Redirect to={redirect} />;
    }


    const renderTableRow = (noti) => {
        return <Table.Row>
            <Table.Cell>{noti.courseName}</Table.Cell>
            <Table.Cell>{noti.instructor}</Table.Cell>
            <Table.Cell>{noti.message}</Table.Cell>
            <Table.Cell>{noti.status}</Table.Cell>
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
                        notification.map((noti,index) => (renderTableRow(noti)))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

export default Notification;
