import { Link } from 'react-router-dom'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router'
import { useContext } from 'react';
import { UserContext } from '../../../../Providers/UserProvider';

const AppliedCourseCard = (props) => {
  const history = useHistory();
  const {info} = useContext(UserContext);
  return (
    <Card>
      <Card.Content>
        <Card.Header>
            {props.courseName}
        </Card.Header>
        <Card.Description>
          Teacher : {props.courseInstructor}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default AppliedCourseCard