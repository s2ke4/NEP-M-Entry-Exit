import { Link } from 'react-router-dom'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router'
import { useContext } from 'react';
import { UserContext } from '../../../../Providers/UserProvider';

const CourseEnrollmentCard = (props) => {
  const history = useHistory();
  const {info} = useContext(UserContext);
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
        <div className="student-course-card-footer">
          <Icon name='users' />
          { props.registeredStudent } / {props.totalSeat}
        </div>
      </Card.Content>
    </Card>
  );
}

export default CourseEnrollmentCard