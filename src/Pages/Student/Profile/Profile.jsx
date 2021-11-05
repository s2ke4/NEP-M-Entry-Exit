import { useState, useEffect, React, useContext } from "react";
import { Button, Table, Header, Icon, Divider } from 'semantic-ui-react'
import axios from "axios";
import { useParams } from "react-router-dom";

import './Profile.css'

const UserProfile = ()=>{

  const [profile, setProfile] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const behost = process.env.REACT_APP_BACKEND_HOST;
  const id = useParams();

  const fetchData = async () => {
    try {      
      let res = await axios.get(`${behost}student/profile/${id.id}`);
      setProfile(res.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    if(!!id){
      fetchData();
    }
  }, [])
  return(
    <div>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>{profile.name}</Header.Content>
      </Header>

      <Divider horizontal>
        <Header as='h4'>
          <Icon name='user circle' />
          Profile Information
        </Header>
      </Divider>

      <div className="profile-information-table">
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={2}>Name</Table.Cell>
              <Table.Cell>{profile.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Email</Table.Cell>
              <Table.Cell>{profile.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ABC account number</Table.Cell>
              <Table.Cell>{profile.id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Date of Birth</Table.Cell>
              <Table.Cell>{profile.dob}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Insitute</Table.Cell>
              <Table.Cell>{profile.institute}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Gender</Table.Cell>
              <Table.Cell>{profile.gender}</Table.Cell>
            </Table.Row>
            {/* <Table.Row>
              <Table.Cell>Current Year</Table.Cell>
              <Table.Cell>{profile.currentyear}</Table.Cell>
            </Table.Row> */}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default UserProfile;