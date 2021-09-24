import RoleCard from '../AccessRoles/RoleCard';
import { useState, useEffect, React } from 'react';
import { Redirect,useParams,Link } from 'react-router-dom'
import { Table,Button,Message } from 'semantic-ui-react'
import axios from 'axios';


const RoleList = () => {


    const [data,setData] = useState([]);
    const [redirect, setRedirect] = useState(null);
    const behost = process.env.REACT_APP_BACKEND_HOST;
    const [loading,setLoading] = useState(true);
    
    const fetchData = async()=>{
        try {
            let res = await axios.get(`${behost}access/getroles`);
            if(res.data.length>0){
                setData(res.data);
                setLoading(false);
            }else{
                setRedirect("/404")
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDelete = async(e, id)=>{
        console.log(id);
    //    try {
    //     await axios.delete(`${behost}access/delete/${id}`)
    //     setRedirect("/admin/rolelist")
    //    } catch (error) {
    //        console.log(error.message);
    //    }
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
          }else{
              fetchData();
          }
        })
      },[])
    
    if (redirect) {
        return <Redirect to={redirect} />
    }
    
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
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map((val, index) => (
                            <Table.Row>
                                <Table.Cell>{index+1}</Table.Cell>
                                <Table.Cell>{val.name}</Table.Cell>
                                <Table.Cell>{val.email}</Table.Cell>
                                <Table.Cell>{val.role}</Table.Cell>
                                <Table.Cell><Button onClick={handleDelete(val.id)} >Delete</Button></Table.Cell>
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