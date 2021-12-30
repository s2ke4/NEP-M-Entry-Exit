import { Container, Segment, Checkbox, Button } from "semantic-ui-react";
import { useState, useEffect, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import { UserContext } from "../../../../Providers/UserProvider";
import axios from "axios";
import "../CourseDetails/CourseDetails.css";
import LoadingData from "../../../Shared/Loading/Loading";
const StudentCourseDetail = () => {
  const { id } = useParams();
  const { info } = useContext(UserContext);
  const [data, setData] = useState();
  const [shouldApply, setShouldApply] = useState();
  const [checkBox, setCheckBox] = useState(false);
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
  const applyToCourse = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "POST",
        url: behost + `student/courses/${id}`,
        data: { userId: info.user.id, courseId: id },
        withCredentials: true,
      });
      setRedirect("/student/applied-courses");
      console.log(info.user.id + "hello");
    } catch (error) {
      console.log(error.message);
    }
  };
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
      if (res.data) {
        if(info.user && info.user.role === "student") {
          setData(res.data.courseDetails[0]);
          setShouldApply(res.data.shouldApply);
          setLoading(false);
        } else {
          setData(res.data[0]);
          setLoading(false);
        }
      } else {
        setRedirect("/404");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!info.user) {
      fetchData();
    } else if (info.user.role !== "student") {
      if (info.user === "admin") {
        setRedirect("/admin/dashboard");
      } else {
        setRedirect("/instructor/dashboard");
      }
    } else {
      fetchData();
    }
  }, [info]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <Container>
      {loading ? (
        <LoadingData />
      ) : (
        <div className="course-detail">
          <Segment>
            <h2 className="heading" style={{ marginBottom: '8.5vh' }}>
                {data.courseName}
            </h2>
            {renderElement()}
          </Segment>
          {info.user && shouldApply && (data['registeredStudent'] < data['totalSeat']) && data['isActive'] ? (
            <div>
              <div className="student-course-details-checkbox-div">
                <Checkbox
                  onClick={() => {
                    setCheckBox(!checkBox);
                  }}
                  label="I have read all the details of this Course. I hereby declare that the details furnished by me at the time of registration are true and correct to the best of my knowledge and belief."
                />
              </div>
              <div className="student-course-details-apply-div">
                <Button
                  disabled={!checkBox}
                  floated="left"
                  content="Apply"
                  color="green"
                  size="medium"
                  onClick={applyToCourse}
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </Container>
  );
};

export default StudentCourseDetail;
