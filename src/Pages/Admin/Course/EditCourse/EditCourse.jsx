import { Button, Form, Container, Segment } from "semantic-ui-react";
import { useState, useEffect, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import { UserContext } from "../../../../Providers/UserProvider";
import axios from "axios";

const EditCourse = () => {
  const { id } = useParams();
  const labelStyle = { fontSize: "15px" };
  const behost = process.env.REACT_APP_BACKEND_HOST;
  const [data, setData] = useState({});
  const [redirect, setRedirect] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { info } = useContext(UserContext);
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

  const editCourse = async () => {
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
      setLoadingBtn(true);
      await axios({
        method: "PUT",
        url: behost + "course/edit/" + id,
        data,
        withCredentials: true,
      });
      setLoadingBtn(false);
      setRedirect("/admin/dashboard");
    } catch (error) {
      console.log(error.message);
    }
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

  useEffect(() => {
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
            value={data[ele.name]}
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
            value={data[ele.name]}
            required
          />
        )}
      </Form.Field>
    ));
  };
  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Segment>
            <h2>Update Course</h2>
            <Form>
              {renderFormElements()}
              <Button
                color="red"
                style={{ marginTop: "2%" }}
                type="submit"
                onClick={editCourse}
              >
                {loadingBtn ? "Updating..." : "Update Course"}
              </Button>
            </Form>
          </Segment>
        </div>
      )}
    </Container>
  );
};

export default EditCourse;
