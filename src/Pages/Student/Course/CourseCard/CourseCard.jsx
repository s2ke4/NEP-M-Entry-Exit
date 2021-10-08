import { Link } from 'react-router-dom'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router'
import { useContext } from 'react';
import { UserContext } from '../../../../Providers/UserProvider';

const CourseCard = (props) => {
  const history = useHistory();
  const {info} = useContext(UserContext);
  let reducedCourseName = (props.courseName.length > 27) ? props.courseName.substring(0,27) + "..." : props.courseName;
  let reducedInstructorName = (props.courseInstructor.length > 30) ? props.courseInstructor.substring(0,30) + "..." : props.courseInstructor;
  console.log(typeof props.courseName);
  return (
    <Card>
      <Image src={props.courseImg} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Link to={`/student/courses/${props.courseId}`}>
          {reducedCourseName}
          </Link>
        </Card.Header>
        <Card.Description>
          Teacher : {reducedInstructorName}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="student-course-card-footer">
          <Icon name='users' />
          { props.registeredStudent } / {props.totalSeat}
          {
            (props.courseType === 0)?
              <Button
              disabled={(info.user && props.registeredStudent < props.totalSeat && props.isActive)?false:true}
              floated="right"
              content="Apply"
              color="green"
              size="mini"
              onClick={() => {history.push(`/student/courses/${props.courseId}`)}}
            />
            :
            null
          }
          {
            (props.courseType === 1)?
              <div style={{float: 'right'}}>
                <Icon name="clock" color="red" />
                Applied
              </div>
            :
              null
          }
          {
            (props.courseType === 2)?
              <div style={{float: 'right'}}>
                <Icon name="check circle" color="green"/>
                Enrolled
              </div>
              :
              null
          }
        </div>
      </Card.Content>
    </Card>
  );
}

export default CourseCard