import React from 'react';
import { Button, DropdownItem, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const RoleCard = (props) => {

    const { id, name, email, role} = props.role;
    return(
        <div className = "item">
            <div className = "content">
                <div className = "header">{name}</div>
                <div>{email}</div>
                <div>{role}</div>
            </div>
            <i className = "trash alternate outline icon"
            style = {{color: "red", marginTop : "7px"}}></i>
        </div>
    );
};

export default RoleCard;