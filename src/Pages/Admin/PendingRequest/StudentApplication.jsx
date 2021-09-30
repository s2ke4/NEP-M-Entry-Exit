import {
  Checkbox,
  Button,
  Table,
  Header,
  Icon,
  Divider,
  Modal,
  Form,
  Input
} from "semantic-ui-react";
import { Redirect, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../Providers/UserProvider";
import "./studentApplication.css";

const UserProfile = () => {
  const { courseId, studentId } = useParams();
  const [open,setOpen] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [loadBtn, setLoadBtn] = useState(false);
  const [loadRejectBtn, setRejectLoadBtn] = useState(false);
  const { info } = useContext(UserContext);
  const [msg,setMsg] = useState("");
  const [data, setData] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const behost = process.env.REACT_APP_BACKEND_HOST;
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let res = await axios.get(`${behost}student/profile/${studentId}`);
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

  const acceptUserEnrollment = async () => {
    try {
      setLoadBtn(true);
      await axios({
        method: "POST",
        url: behost + "enrollment/accept",
        data: { courseId, studentId },
        withCredentials: true,
      });
      setRedirect(`/admin/course/request/${courseId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const rejectUserEnrollment = async () => {
    try {
      setRejectLoadBtn(true);
      await axios({
        method: "POST",
        url: behost + "enrollment/reject",
        data: { courseId, studentId,message:msg },
        withCredentials: true,
      });
      setRedirect(`/admin/course/request/${courseId}`);
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
    <div>
      <Modal size="small" open={open} onClose={() => setOpen(false)}>
        <Modal.Header negative>Reject Student Enrollment</Modal.Header>
        <Modal.Content>
          <Form size="large">
            <Form.Field
              control={Input}
              onChange ={ (e) => setMsg(e.target.value)}
              label='Message'
              placeholder='Any Message for Student'
            /> 
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={rejectUserEnrollment}>
            {loadRejectBtn?"Loading...":"Reject"}
          </Button>
        </Modal.Actions>
      </Modal>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="user circle" />
          Profile Information
        </Header>
      </Divider>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="profile-information-table">
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={2}>Name</Table.Cell>
                <Table.Cell>{data.firstname + " " + data.lastname}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Email</Table.Cell>
                <Table.Cell>{data.email}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Phone Number</Table.Cell>
                <Table.Cell>{data.phone}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Date of Birth</Table.Cell>
                <Table.Cell>{data.birthday}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Insitute</Table.Cell>
                <Table.Cell>{data.institute}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Gender</Table.Cell>
                <Table.Cell>{data.gender}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Current Year</Table.Cell>
                <Table.Cell>{data.currentyear}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <div>
            <div className="student-course-details-checkbox-div">
              <Checkbox
                onClick={() => {
                  setCheckBox(!checkBox);
                }}
                label="I have read the student detail carefully."
              />
            </div>
            <div className="student-course-details-apply-div">
              <Button
                disabled={!checkBox}
                floated="left"
                content={loadBtn ? "Loading..." : "Accept"}
                color="green"
                size="medium"
                onClick={acceptUserEnrollment}
              />
              <Button
                floated="left"
                content="Verify"
                color="blue"
                size="medium"
              />
              <Button
                disabled={!checkBox}
                floated="right"
                content={"Reject"}
                color="red"
                onClick={()=>setOpen(true)}
                size="medium"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;