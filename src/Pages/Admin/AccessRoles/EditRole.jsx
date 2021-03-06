import { useState, useEffect , React,useContext} from 'react';
import { Link, Redirect, useParams } from "react-router-dom";
import axios from 'axios';
import { Dropdown,Message } from 'semantic-ui-react'
import {UserContext} from '../../../Providers/UserProvider'

const EditRole = ()=>{
    const { id } = useParams();
    const {info} = useContext(UserContext);
    const behost = process.env.REACT_APP_BACKEND_HOST;
    const [data, setData] = useState({});
    const [redirect, setRedirect] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false);
    let [currentrole, setcurrentrole] = useState(1); 


    const fetchData = async () => {
      try {
        let res = await axios.get(`${behost}access/getroles/${id}`);
        if (res.data.length > 0) {
          setData(res.data[0]);
          if(res.data[0].role === 'admin'){
            setcurrentrole(0);
          }
          setLoading(false);
        } else {
          setRedirect("/404");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    useEffect(()=>{
      if (!info.user || info.user.role!=="admin") {
          if(!info.user){
            setRedirect("/");
          }else if(info.user==="instructor"){
            setRedirect("/instructor/dashboard")
          }else{
            setRedirect("/student/dashboard")
          }
      }
      fetchData();
    },[info])

    const handleEdit = async () => {
      try {
        if(!data.name||!data.email||!data.role){
          return;
        }
        setLoadingBtn(true);
        await axios({
          method: "PUT",
          url: behost + "access/edit/" + id,
          data,
          withCredentials: true
        })
        setLoadingBtn(false);
        setRedirect("/admin/rolelist")
      } catch (error) {
        console.log(error.message);
      }
    };

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
            <h2> Edit Role </h2>
            <form className = "ui form" >
                <div className = "field">
                    <label> Name </label>
                    <input type = "text" name = "name" placeholder = "Name"  value={data.role} onChange={(e) => setInfo(e)}/>
                </div>
                <div className = "field">
                    <label> Email</label>
                    <input type = "text" name = "email" placeholder = "E-mail" value={data.email } onChange={(e) => setInfo(e)}/>
                </div>
                {data.role && <div className = "field">
                    <label>Role</label>
                    <Dropdown
                      placeholder='Select Role'
                      selection
                      button
                      name="role"
                      header= 'role'
                      defaultValue={data.role}
                      options={roles}
                      onChange={setInfoDropdown}
                      required
                    />
                </div>}
                <button className = "ui button blue" onClick={handleEdit}>{loadingBtn ? "Updating..." : "Update Access"}</button>
                
            </form>
        </div>
        </div>
    ); 
}

export default EditRole;