import React from 'react';
import {  Message } from 'semantic-ui-react';
import { Link } from "react-router-dom";


class AddRole extends React.Component {

    state = {
        name : "",
        email : "",
        role : "",
    };

    add = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.email === "" || this.state.role === ""){
            alert("All the fields are mandatory!");
            return
        }
        this.props.addRoleHandler(this.state);
        this.setState({name : "", email : "", role :""});
    }

 render(){
    return(
        <div className = "ui container">
        <div className = "ui main">
            <h2> Add Role </h2>
            <form className = "ui form" onSubmit = {this.add}>
                <div className = "field">
                    <label> Name </label>
                    <input type = "text" name = "name" placeholder = "Name"  value = {this.state.name} onChange = { (e) => this.setState({name: e.target.value})}/>
                </div>
                <div className = "field">
                    <label> Email</label>
                    <input type = "text" name = "email" placeholder = "E-mail" value = {this.state.email} onChange = { (e) => this.setState({email: e.target.value})} />
                </div>
                <div className = "field">
                    <label>Role</label>
                    <select className = "ui fluid dropdown" value = {this.state.role} onChange = { (e) => this.setState({role: e.target.value})}>
                        <option value = "">Add Role</option>
                <option value = "Admin">Admin</option>
                <option value = "Staff">Staff</option>
                <option value = "Student">Student</option>
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
}

export default AddRole;