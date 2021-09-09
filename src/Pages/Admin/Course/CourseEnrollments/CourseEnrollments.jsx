import React from 'react'
import { Table, Header, Icon, Divider } from 'semantic-ui-react'
import '../CourseEnrollments/CourseEnrollments.css'

const CourseEnrollements = (props) => {

    const enrollments = [
        {name: 'Abhay Dwiwedi', email: '201951002@iiitvadodara.ac.in'},
        {name: 'Ayush Patel', email: '201951038@iiitvadodara.ac.in'},
        {name: 'Darshan Devendra Hande', email: '201951052@iiitvadodara.ac.in'},
        {name: 'Keshav Agarwal', email: '201951080@iiitvadodara.ac.in'},
        {name: 'Hari Om', email: '201951068@iiitvadodara.ac.in'},
        {name: 'Nitanshu Lokhande', email: '201951107@iiitvadodara.ac.in'},
        {name: 'Divyam Solanki', email: 'solankidivyam00@gmail.com'},
        {name: 'Chirag Jain', email: '201951049@iiitvadodara.ac.in'},
    ];

    const renderTableRow = (enrollment) => {
        return <Table.Row>
            <Table.Cell>{enrollment.name}</Table.Cell>
            <Table.Cell>{enrollment.email}</Table.Cell>
        </Table.Row>
    }

    return (
        <div>
            <Header as='h2' className='course-enrollments-header-div' textAlign='center'>
                <Header.Content className='course-enrollments-header'>CS303 : Software Engineering</Header.Content>
            </Header>

            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='users' />
                    Course Enrollments
                </Header>
            </Divider>
            <Table celled textAlign='center' className='course-enrollments-table'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>E-mail</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        enrollments.map((enrollment,index) => (renderTableRow(enrollment)))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

export default CourseEnrollements
