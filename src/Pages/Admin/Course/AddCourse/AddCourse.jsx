import { Button, Form, Container, Segment } from "semantic-ui-react";
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../../../Providers/UserProvider";
import Loading from '../../../Shared/Loading/Loading'
import axios from "axios";

const AddCourse = () => {
  const { info } = useContext(UserContext);
  const labelStyle = { fontSize: "15px" };
  const behost = process.env.REACT_APP_BACKEND_HOST;
  const fehost = process.env.REACT_APP_FRONTEND_HOST;
  const [data, setData] = useState({});
  const [redirect, setRedirect] = useState(null);
  const formElement = [
    {
      label: "Course Name",
      placeholder: "Write Course Name",
      name: "courseName",
      type: "text",
      isTextArea: false,
    },
    {
      label: "Course Instructor",
      placeholder: "Course Instructor Name(use comma for multiple instructors)",
      name: "instructor",
      type: "text",
      isTextArea: false,
    },
    {
      label: "Course Instructor Email",
      placeholder:
        "Course Instructor Email(use comma for multiple instructors)",
      name: "instructorEmail",
      type: "text",
      isTextArea: false,
    },
    {
      label: "Course Credit",
      placeholder:
        "How Much Credit Student Will get after successfull completion of course",
      name: "credit",
      type: "number",
      isTextArea: false,
    },
    {
      label: "Available Seats",
      placeholder: "How much seats you are offering",
      name: "totalSeat",
      type: "number",
      isTextArea: false,
    },
    {
      label: "Eligibility Criteria",
      placeholder: "Any Eligibility Criteria for student",
      name: "eligibility",
      type: "text",
      isTextArea: false,
    },
    {
      label: "Enrollment Fee (INR)",
      placeholder: "Fee for the Student to Enroll in this course",
      name: "fee",
      type: "number",
      isTextArea: false,
    },
    {
      label: "Prerequisite Course Name",
      placeholder: "Prerequisite Course Name(use comma for multiple courses)",
      name: "prerequisite",
      type: "text",
      isTextArea: false,
    },
    {
      label: "Course Description",
      name: "description",
      placeholder: "Add Course Description Here",
      type: "text",
      isTextArea: true,
    },
  ];

  const setInfo = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const addCourse = async () => {
    try {
      if (
        !data.courseName ||
        !data.instructor ||
        !data.instructorEmail ||
        !data.credit ||
        !data.totalSeat ||
        !data.eligibility ||
        !data.fee ||
        !data.prerequisite ||
        !data.description
      ) {
        return;
      }
      let result = await axios({
        method: "POST",
        url: behost + "course/add",
        data,
        withCredentials: true,
      });
      // add course in abc database
      const courseId = result.data.courseId;
      const abcCourseData = {
        instituteName: "Indian Institute of Information Technology Vadodara",
        courseName: data.courseName,
        coursePageLink: fehost + `course/${courseId}`,
        maxCredit: data.credit
      }
      result = await axios({
        method: "POST",
        url: behost + "abc/create-course",
        data: abcCourseData,
        withCredentials: true,
      });
      await axios({
        method: "PUT",
        url: behost + `course/add-abc-course-id/${courseId}`,
        data: {courseId: result.data.courseId},
        withCredentials: true,
      });
      setRedirect("/admin/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if(info.isLoading){
      return;
    }else if (!info.user || info.user.role !== "admin") {
      if (!info.user) {
        setRedirect("/");
      } else if (info.user === "instructor") {
        setRedirect("/instructor/dashboard");
      } else {
        setRedirect("/student/dashboard");
      }
    }
  }, [info]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const renderFormElements = () => {
    return formElement.map((ele, index) => (
      <Form.Field>
        <label style={labelStyle} className="label">
          {ele.label}
        </label>
        {ele.isTextArea ? (
          <textarea
            name={ele.name}
            style={{ minHeight: 150 }}
            placeholder={ele.placeholder}
            type={ele.type}
            onChange={(e) => setInfo(e)}
            required
          />
        ) : (
          <input
            type={ele.type}
            name={ele.name}
            placeholder={ele.placeholder}
            onChange={(e) => setInfo(e)}
            required
          />
        )}
      </Form.Field>
    ));
  };
  return (
    <Container>
      {info.isLoading?<Loading />:<div>
        <Segment>
          <h2>Add Course</h2>
          <Form>
            {renderFormElements()}
            <Button
              color="red"
              style={{ marginTop: "2%" }}
              type="submit"
              onClick={addCourse}
            >
              Add Course
            </Button>
          </Form>
        </Segment>
      </div>}
    </Container>
  );
};

export default AddCourse;
