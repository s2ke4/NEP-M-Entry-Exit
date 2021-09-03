import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const CourseCard = (props) => (
  <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>props.courseName</Card.Header>
      <Card.Meta>props.courseInstructor</Card.Meta>
      <Card.Description>
        props.courseDesc
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        props.courseEnrollments
      </a>
    </Card.Content>
  </Card>
)

export default CourseCard