import { Button, Form, Container,Message,Header,Segment,Icon} from "semantic-ui-react";
import './CourseDetail.css'
const CourseDetail = ()=>{
    const data = {
        courseName:"Data Structure And Algorithm",
        instructor:"instructor name",
        credit:"10",
        fee:"15000",
        eligibility:"Only for 3rd year student",
        prerequisite:"C Programming",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    const detailElement =[
        {label:"Course Name",name:"courseName"},
        {label:"Course Instructor",name:"instructor"},
        {label:"Course Credit",name:"credit"},
        {label:"Enrollment Fee",name:"fee"},
        {label:"Eligibility",name:"eligibility"},
        {label:"Course Prerequisite",name:"prerequisite"},
        {label:"Course Description",name:"description"},
    ]
    const renderElement = ()=>{
        return detailElement.map((ele,index)=>(
            <div>
                <h3>{ele.label}</h3>
                <div>{data[ele.name]}</div>
            </div>
        ))
    }
    return (
        <Container>
            <div className="course-detail">
                <Segment>
                    {renderElement()}
                </Segment>
            </div>
        </Container>
    );
}

export default CourseDetail;