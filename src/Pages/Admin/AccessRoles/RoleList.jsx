import React from 'react';
import RoleCard from '../AccessRoles/RoleCard';
import { Link } from "react-router-dom";
import { Table,Button,Message } from 'semantic-ui-react'

const RoleList = () => {
    let data = [
        {
            name: "Keshav Agarwal",
            email: "keshavagarwal@gmail.com",
            role: "admin"
        },
        {
            name: "Abhay",
            email: "abhay@gmail.com",
            role: "admin"
        },
        {
            name: "Ayush",
            email: "ayush@gmail.com",
            role: "instructor"
        },
        {
            name: "Darshan",
            email: "darshan@gmail.com",
            role: "instructor"
        }
    ]
    
    return (
        <div className="ui container">
            <h2> Role List </h2>
            <div className="ui celled list">
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Sr. No</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map((val, index) => (
                            <Table.Row>
                                <Table.Cell>{index+1}</Table.Cell>
                                <Table.Cell>{val.name}</Table.Cell>
                                <Table.Cell>{val.email}</Table.Cell>
                                <Table.Cell>{val.role}</Table.Cell>
                                <Table.Cell><Button>Edit</Button></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <Message>
                <strong>Add <Link to="/admin/addrole">New Roles</Link></strong>
            </Message>
        </div>
    );
};

export default RoleList;