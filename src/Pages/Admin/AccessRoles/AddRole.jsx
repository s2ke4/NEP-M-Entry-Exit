import { useState, useEffect , React} from 'react';
import {  Message } from 'semantic-ui-react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'


const AddRole = ()=>{


    const behost = process.env.REACT_APP_BACKEND_HOST;
    const [data, setData] = useState({});
    const [redirect, setRedirect] = useState(null);

    const addrole = async (e) => {
      e.preventDefault();
        try {
          if(!data.name||!data.email||!data.role){
            return;
          }
          await axios({
            method: "POST",
            url: behost + "access/addrole",
            data,
            withCredentials: true
          })
          setRedirect("/admin/rolelist")
        } catch (error) {
          console.log(error.message);
        }
    }

    useEffect(()=>{
        axios.get(`${behost}auth/status`).then((res) => {
          if (!res.data.user || res.data.user.role!=="admin") {
             if(!res.data.user){
               setRedirect("/");
             }else if(res.data.user==="istructor"){
               setRedirect("/instructor/dashboard")
             }else{
               setRedirect("/student/dashboard")
             }
          }
        })
      },[])

    const setInfo = (e) => {
      setData({
        ...data,
        [e.target.name]: e.target.value
      })
    }

    const setInfoDropdown = (e,{ name, value }) => {
      setData({
        ...data,
        [name]: value,
      });
    };

    if (redirect) {
      return <Redirect to={redirect} />
    }
    
    const roles = [
      { key : 1, text: 'Admin', value: "admin"},
      { key: 2, text: 'Instructor', value: "instructor"}
    ]

    return(
        <div className = "ui container">
        <div className = "ui main">
            <h2> Add Role </h2>
            <form className = "ui form" >
                <div className = "field">
                    <label> Name </label>
                    <input type = "text" name = "name" placeholder = "Name" onChange={(e) => setInfo(e)}/>
                </div>
                <div className = "field">
                    <label> Email</label>
                    <input type = "text" name = "email" placeholder = "E-mail" onChange={(e) => setInfo(e)}/>
                </div>
                <div className = "field">
                    <label>Role</label>
                    <Dropdown
                      placeholder='Select Role'
                      selection
                      button
                      name="role"
                      header= 'role'
                      options={roles}
                      onChange={setInfoDropdown}
                      required
                    />
                    {/* <select className = "ui fluid dropdown" name ="role" onChange={setInfoDropdown} >
                        <option value = "admin">Admin</option>
                        <option value = "instructor">Instructor</option>
                    </select> */}
                </div>
                <button className = "ui button blue" onClick={addrole}>Add</button>
            </form>
            <Message>
               <strong>View <Link to="/admin/rolelist">roleList</Link></strong>
            </Message>
        </div>
        </div>
    ); 
}

export default AddRole;