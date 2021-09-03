import React from 'react';
import {  Message } from 'semantic-ui-react';
import { Link } from "react-router-dom";


const AddRole = ()=>{

    const state = {
        name : "",
        email : "",
        role : "",
    };

    return(
        <div className = "ui container">
        <div className = "ui main">
            <h2> Add Role </h2>
            <form className = "ui form" >
                <div className = "field">
                    <label> Name </label>
                    <input type = "text" name = "name" placeholder = "Name"/>
                </div>
                <div className = "field">
                    <label> Email</label>
                    <input type = "text" name = "email" placeholder = "E-mail"/>
                </div>
                <div className = "field">
                    <label>Role</label>
                    <select className = "ui fluid dropdown" >
                        <option value = "Admin">Admin</option>
                        <option value = "Instructor">Instructor</option>
                    </select>
                </div>
                <button className = "ui button blue">Add</button>
            </form>
            <Message>
               <strong>View <Link to="/rolelist">roleList</Link></strong>
            </Message>
        </div>
        </div>
    ); 
}

export default AddRole;