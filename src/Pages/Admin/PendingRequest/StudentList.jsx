import { useState, useEffect, React, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import { UserContext } from "../../../Providers/UserProvider";
import './studentApplication.css'
import LoadingData from "../../Shared/Loading/Loading";

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

  return (
    <div className="ui container">
      {loading ? (
        <LoadingData />
      ) : (
        <div>
          <h3>Pending Request for {data.courseName} </h3>
          <div className="ui celled list">
            {data.students.length === 0 ? (
              <p className="empty-msg">There is no request pending for this course</p>
            ) : (
              <Table celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Sr. No</Table.HeaderCell>
                    <Table.HeaderCell>Student ABC account</Table.HeaderCell>
                    {/* <Table.HeaderCell>Student email</Table.HeaderCell> */}
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data.students.map((val, index) => (
                    <Table.Row>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{val.id}</Table.Cell>
                      {/* <Table.Cell>{val.info.user.email}</Table.Cell> */}
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
