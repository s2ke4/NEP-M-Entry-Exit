import { useState, useEffect, React, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import { UserContext } from "../../../Providers/UserProvider";
import './studentApplication.css'

const RoleList = () => {
  const { info } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const behost = process.env.REACT_APP_BACKEND_HOST;
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const fetchData = async () => {
    try {
      let res = await axios.get(`${behost}enrollment/pending-list/${id}`);
      if (res.data) {
        setData(res.data);
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
        } else if (info.user === "istructor") {
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

  return (
    <div className="ui container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Pending Reuest for {data.courseName} </h3>
          <div className="ui celled list">
            {data.students.length === 0 ? (
              <p className="empty-msg">There is no request pending for this course</p>
            ) : (
              <Table celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Sr. No</Table.HeaderCell>
                    <Table.HeaderCell>Student Name</Table.HeaderCell>
                    <Table.HeaderCell>Student Institute</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data.students.map((val, index) => (
                    <Table.Row>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{val.name}</Table.Cell>
                      <Table.Cell>{val.institute}</Table.Cell>
                      <Table.Cell>
                        <Button
                          onClick={() =>
                            setRedirect(
                              `/admin/course/${id}/student-profile/${val.id}`
                            )
                          }
                        >
                          View Application
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleList;
