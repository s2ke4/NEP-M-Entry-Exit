import React from 'react';
import RoleCard from '../AccessRoles/RoleCard';
import { Message } from 'semantic-ui-react';
import { Link } from "react-router-dom";

const RoleList = () => {
    let data =[
        {
            name:"Keshav Agarwal",
            email:"keshavagarwal@gmail.com",
            role:"admin"
        },
        {
            name:"Abhay",
            email:"abhay@gmail.com",
            role:"admin"
        },
        {
            name:"Ayush",
            email:"ayush@gmail.com",
            role:"instructor"
        },
        {
            name:"Darshan",
            email:"darshan@gmail.com",
            role:"instructor"
        }
    ]
    const renderRoleList = data.map((role) => {
        return(
            <RoleCard role = {role}></RoleCard>
        );
    });
    return(
        <div className = "ui container">
            <h2> Role List </h2>
        <div className = "ui celled list">
            {renderRoleList}
        </div>
        <Message>
            <strong>Add <Link to="/addrole">New Roles</Link></strong>
        </Message>
        </div>
    );
};

export default RoleList; 