import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'

const CourseCard = (props) => {
  return (
    <Card>
      <Image src={props.courseImg} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Link to={`/student/courses/${props.courseId}`}>
            {props.courseName}
          </Link>
        </Card.Header>
        <Card.Description>
          Teacher : {props.courseInstructor}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
            <Icon name='users' />
            { props.registeredStudent } / {props.totalSeat}
      </Card.Content>
    </Card>
  );
}

export default CourseCard