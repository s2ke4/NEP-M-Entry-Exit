import { Button, Table, Header, Icon, Divider } from 'semantic-ui-react'
import './Profile.css'

const UserProfile = ()=>{
  return(
    <div>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>Ayush Patel</Header.Content>
      </Header>
      <div className="editbutton-profile-page">
        <Button positive icon>
          <Icon name='edit' />
        </Button>
      </div>

      <Divider horizontal>
        <Header as='h4'>
          <Icon name='user circle' />
          Profile Information
        </Header>
      </Divider>

      <div className="profile-information-table">
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={2}>Name</Table.Cell>
              <Table.Cell>Ayush Patel</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Email</Table.Cell>
              <Table.Cell>201951038@iiitvadodara.ac.in</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Phone Number</Table.Cell>
              <Table.Cell>6350050079</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Date of Birth</Table.Cell>
              <Table.Cell>07/09/2000</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Insitute</Table.Cell>
              <Table.Cell>Indian Institute Of Information Technology Vadodara</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Gender</Table.Cell>
              <Table.Cell>Male</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Current Year</Table.Cell>
              <Table.Cell>2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default UserProfile;