import { Button, Form, Container,Message,Header,Segment,Icon} from "semantic-ui-react";
const AddCourse = ()=>{
    const labelStyle = { fontSize: "15px" };
    const formElement = [
        {label:"Course Name",placeholder:"Write Course Name",name:"courseName",type:"text",isTextArea:false},
        {label:"Course Instructor",placeholder:"Course Instructor Name(use comma for multiple instructors)",name:"instructor",type:"text",isTextArea:false},
        {label:"Course Credit",placeholder:"How Much Credit Student Will get after successfull completion of course",name:"credit",type:"number",isTextArea:false},
        {label:"Eligibility Criteria",placeholder:"Any Eligibility Criteria for student",name:"eligibility",type:"text",isTextArea:false},
        {label:"Enrollment Fee (INR)",placeholder:"Fee for the Student to Enroll in this course",name:"fee",type:"number",isTextArea:false},
        {label:"Prerequisite Course Name",placeholder:"Prerequisite Course Name(use comma for multiple courses)",name:"prerequisite",type:"text",isTextArea:false},
        {label:"Course Description",name:"description",placeholder:"Add Course Description Here",type:"text",isTextArea:true}
    ]

    const setInfo = (e)=>{
        console.log(e.target.name,e.target.value)
    }

    const renderFormElements = () => {
        return formElement.map((ele, index) => (
          <Form.Field>
            <label style={labelStyle} className="label">
              {ele.label}
            </label>
            {ele.isTextArea ? (
              <textarea name={ele.name} style={{ minHeight: 150 }} placeholder={ele.placeholder} type={ele.type} onChange={(e) => setInfo(e)} />
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
            <div>
                <Segment>
                    <h2>Add Course</h2>
                    <Form>
                        {renderFormElements()}
                        <Button
                            color="red" 
                            style={{ marginTop:"2%" }}
                            type="submit" 
                        >
                            Add Course
                        </Button>
                    </Form>
                </Segment>
            </div>
        </Container>
    );
}

export default AddCourse;