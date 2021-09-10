import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'

const CourseCard = (props) => (
  <Card>
    {console.log(props.courseImg)}
    <Image src={props.courseImg} wrapped ui={false} />
    <Card.Content>
      <Card.Header>
        <Link to={`/admin/courses/${props.courseId}`}>
          {props.courseName}
        </Link>
      </Card.Header>
      {/* <Card.Meta>{props.courseCode}</Card.Meta> */}
      <Card.Description>
        Teacher : {props.courseInstructor}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Link to={{pathname: `/admin/courses/1/enrollments`, obj: {
        courseCode: props.courseName,
        courseEnrollments: props.courseEnrollments,
      }}}>
        <Icon name='user' />
        {props.courseEnrollments}
      </Link>
    </Card.Content>
  </Card>
)

export default CourseCard