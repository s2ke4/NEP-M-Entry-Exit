import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'
import './CourseCard.css'

const CourseCard = (props) => {
  return (
    <Card>
      <Image src={props.courseImg} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Link to={`/admin/courses/${props.courseId}`}>
            {props.courseName}
          </Link>
        </Card.Header>
        <Card.Description>
          Teacher : {props.courseInstructor}
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