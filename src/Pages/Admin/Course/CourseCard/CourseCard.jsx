import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'
import './CourseCard.css'

const CourseCard = (props) => {
  let reducedCourseName = (props.courseName.length > 27) ? props.courseName.substring(0,27) + "..." : props.courseName;
  let reducedInstructorName = (props.courseInstructor.length > 30) ? props.courseInstructor.substring(0,30) + "..." : props.courseInstructor;
  return (
    <Card>
      <Image src={props.courseImg} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Link to={`/admin/courses/${props.courseId}`}>
            {reducedCourseName}
          </Link>
        </Card.Header>
        <Card.Description>
          Teacher : {reducedInstructorName}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Link to={{pathname: `/admin/courses/${props.courseId}/enrollments`, obj: props.courseId}}>
            <Icon name='users' />
            { props.registeredStudent } / {props.totalSeat}
          </Link>
          <Link className="pending-request" to={{pathname: `/admin/course/request/${props.id}`}}>
            Pending Request : {props.requests}
          </Link>
      </Card.Content>
    </Card>
  );
}

export default CourseCard