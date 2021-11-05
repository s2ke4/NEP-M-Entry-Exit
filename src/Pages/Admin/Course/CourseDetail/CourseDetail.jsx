import { Button, Container, Segment, Modal, Radio } from "semantic-ui-react";
import { useState, useEffect, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import Loader from '../../../Shared/Loading/Loading'
import axios from "axios";
import { UserContext } from "../../../../Providers/UserProvider";
import "./CourseDetail.css";

const AdminCourseDetail = () => {
  const { id } = useParams();
  const { info } = useContext(UserContext);
  const [data, setData] = useState();
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
  ];
  const [redirect, setRedirect] = useState(null);
  const behost = process.env.REACT_APP_BACKEND_HOST;
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const renderElement = () => {
    return detailElement.map((ele, index) => (
      <div>
        <h3>{ele.label}</h3>
        <div>{data[ele.name]}</div>
      </div>
    ));
  };

  const fetchData = async () => {
    try {
      let res = await axios.get(`${behost}course/get/${id}`);
      if (res.data.length > 0) {
        setData(res.data[0]);
        setLoading(false);
      } else {
        setRedirect("/404");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleActiveCourse = async () => {
    try {
      setOpen(false);
      setData({ ...data, isActive: !data.isActive });
      await axios.put(`${behost}course/toggle/${id}`);
    } catch (error) {
      setData({ ...data, isActive: !data.isActive });
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
    <Container>
      {loading || info.isLoading ? (
        <Loader />
      ) : (
        <div className="course-detail">
          <Modal size="small" open={open} onClose={() => setOpen(false)}>
            <Modal.Header>
              {data.isActive
                ? "Deactivate This Course"
                : "Activate This Course"}
            </Modal.Header>
            <Modal.Content>
              <p>
                {data.isActive
                  ? "Are you sure you want to deactivate this course.After deactivation of the course student can't send the request for enrolling in this course"
                  : "Are you sure you want to activate this course.After activation of the course student can send the request for enrolling in this course"}
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={toggleActiveCourse}>
                Yes
              </Button>
              <Button onClick={() => setOpen(false)}>No</Button>
            </Modal.Actions>
          </Modal>
          <Segment>
            <h2 className="heading">
              {data.courseName}
              <Button
                floated="right"
                icon="users"
                content="Enrolled Student"
                color="blue"
                onClick={() => setRedirect(`/admin/courses/${id}/enrollments`)}
              />
              <Button
                floated="right"
                icon="users"
                content="Pending Request"
                onClick={() => setRedirect(`/admin/course/request/${id}`)}
              />
              <Button
                floated="right"
                icon="edit"
                content="Edit"
                color="green"
                onClick={() => setRedirect(`/admin/edit-course/${id}`)}
              />
            </h2>
            <div className="toggle-active-course">
              <p>Active</p>
              <Radio
                checked={data.isActive}
                onClick={()=>setOpen(true)}
                toggle
              />
            </div>
            {renderElement()}
          </Segment>
        </div>
      )}
    </Container>
  );
};

export default AdminCourseDetail;
