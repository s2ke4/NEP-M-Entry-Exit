import { React } from "react";
import { Table, Header, Icon, Divider } from 'semantic-ui-react'
import './demoCourse.css'

const demoCourse = ()=>{

  return(
    <div>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='user circle' />
          Course Information
        </Header>
      </Divider>

      <div className="profile-information-table">
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={2}>College</Table.Cell>
              <Table.Cell>ndian Institute Of Information Technology Allabhad</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Course</Table.Cell>
              <Table.Cell>Software Development</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Course Id</Table.Cell>
              <Table.Cell>CS-117</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Department</Table.Cell>
              <Table.Cell>Computer Science</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Course Conent</Table.Cell>
              <Table.Cell>Session 1: From Prototype to HTML
Session 2: Making HTML Manageable with CSS
Session 3: Development-Ready Design
Session 4: Debugging HTML & CSS
Session 5: Your Working Prototype
Session 6: Building Less Software & Deploying Software on Platforms
Session 7: Making Stuff Happen with Javascript
Session 8: Debugging Javascript
Session 9: Automating Your Gruntwork with Javascript
Session 10: Creating & Managing Users with Google Firebase
Session 11: Your Interactive Page
Session 12: Your Coding Project I
Session 13: Project Demos
Session 14: Portfolio Entries & Contest</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Cridit</Table.Cell>
              <Table.Cell>5</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Fees</Table.Cell>
              <Table.Cell>10000</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default demoCourse;