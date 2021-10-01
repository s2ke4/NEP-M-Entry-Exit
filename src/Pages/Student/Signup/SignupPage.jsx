import { Button, Form, Grid, Header, Image, Message, Input, Select  } from 'semantic-ui-react'
import { useState, useEffect , React,useContext} from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {UserContext} from '../../../Providers/UserProvider'


const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]
//roll number

const currentYear = [
  { key: '1', text: '1', value: '1' },
  { key: '2', text: '2', value: '2' },
  { key: '3', text: '3', value: '3' },
  { key: '4', text: '4', value: '4' },
  { key: '5', text: '5', value: '5' },
]

const SignupPage = ()=>{

  const {info} = useContext(UserContext);
  const behost = process.env.REACT_APP_BACKEND_HOST;
  const [studentData, setStudentData] = useState({});
  const [redirect, setRedirect] = useState(null);
  const [wait,setWait] = useState(false);

  const addStudentData = async (e) => {
    e.preventDefault();
    studentData.email = info.user && info.user.email;
      try {
        if(!studentData.firstname ||!studentData.email||!studentData.lastname||!studentData.phone||!studentData.birthday||!studentData.gender||!studentData.currentyear||!studentData.institute ){
          return;
        }
        setWait(true);
        await axios({
          method: "POST",
          url: behost + "student/sign-up",
          data: studentData,
          withCredentials: true
        })
        setRedirect("/student/dashboard")
      } catch (error) {
        setWait(false);
        console.log(error.message);
      }
  }

  const setData = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value
    })
  }

  const setDataDropdown = (e,{ name, value }) => {
    setStudentData({
      ...studentData,
      [name]: value,
    })
  }

  useEffect(()=>{
    if(!info.isLoading){
      if(!info.user){
        setRedirect("/")
      }else if(info.user.role==="admin"){
        setRedirect("/admin/dashboard")
      }else if(info.user.role==="instructor"){
        setRedirect("/instructor/dashboard");
      }else if(info.user.registered){
        setRedirect("/student/dashboard")
      }
    }
  },[info])

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return(
    <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
        {info.isLoading?<p>Loading...</p>:<Grid.Column style={{ maxWidth: 800 }}>
          <Header as='h2' color='teal' textAlign='center' >
            <Image src='/iiitv.jpg' /> Signup to make your Profile
          </Header>
          <Form size='large'>
            <Form.Group widths='equal'>
              <Form.Field required
                name = "firstname"
                control={Input}
                onChange ={ (e) => setData(e)}
                label='First name'
                placeholder='First name'
              />
              <Form.Field required
                name = "lastname"
                control={Input}
                onChange ={ (e) => setData(e)}
                label='Last name'
                placeholder='Last name'
              />  
              <Form.Field required
                control={Select}
                name = "gender"
                options={genderOptions}
                label='Gender'
                onChange ={setDataDropdown}
                placeholder='Gender'
                search
                searchInput={{ id: 'form-select-control-gender' }}
              />
            </Form.Group>
            <label><strong>Date of Birth</strong></label>
            <input type="date" id="birthday" name="birthday"  onChange ={ (e) => setData(e)}  required />
            <br /> <br />
            <Form.Group widths='equal'>
              <Form.Field required
                name = "institute"
                control={Input}
                onChange ={ (e) => setData(e)}
                label='Institute'
                placeholder='Institute Name'
              />
              <Form.Field required
                name = "currentyear"
                control={Select}
                options={currentYear}
                onChange ={setDataDropdown}
                label='Current Year'
                placeholder='Current Year'
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field required
                name = "email"
                control={Input}
                label='Email'
                value={info.user && info.user.email}
                placeholder='example@xyz.com'
                readonly
                // error={{
                //   content: 'Please enter a valid email address',
                //   pointing: 'below',
                // }}
              />
              <Form.Field required
                name = "phone"
                control={Input}
                onChange ={ (e) => setData(e)}
                label='Phone Number'
                placeholder='Do not include +91'
                // error={{
                //   content: 'Please enter a valid email address',
                //   pointing: 'below',
                // }}
              />
            </Form.Group>
            <Form.Field required
              id='form-button-control-public'
              control={Button}
              onClick = {addStudentData}
              //onSubmit = {addStudentData}
              content={wait?"Loading...":'Sign-up'}
              color='teal'
            />
          </Form>
        </Grid.Column>}
      </Grid> 
    </div>
  );
}

export default SignupPage;