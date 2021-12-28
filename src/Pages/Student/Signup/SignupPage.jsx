import { Button, Form, Grid, Header, Image, Message, Input  } from 'semantic-ui-react'
import { useState, useEffect , React,useContext} from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import {UserContext} from '../../../Providers/UserProvider'
const SignupPage = ()=>{

  const behost = process.env.REACT_APP_BACKEND_HOST;
  const {info,fetchInfo} = useContext(UserContext);
  const [studentData, setStudentData] = useState({});
  const [errorMsg,setErrorMsg] = useState();
  const [redirect, setRedirect] = useState(null);
  const [wait,setWait] = useState(false);

  const addStudentData = async (e) => {
    e.preventDefault();
    studentData.email = info.user && info.user.email;
      try {
        setWait(true);
        let result = await axios({
          method: "POST",
          url: behost + "student/sign-up",
          data: studentData,
          withCredentials: true
        })
        setWait(false);
        if(!result.data.success){
          setErrorMsg(result.data.msg);
          return;
        }
        fetchInfo();
        setRedirect("/student/dashboard")
      } catch (error) {
        setWait(false);
        setErrorMsg(error.message);
        console.log(error.message);
      }
  }



  const setData = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value
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
            <Image src='/iiitv.jpg' />
          </Header>
          <Form size='large'>
            <Form.Group widths='equal'>
              <Form.Field required
                name = "ABCAccNo"
                control={Input}
                onChange ={ (e) => setData(e)}
                label='ABC Account number'
                placeholder='ABC Account number'
              />
            </Form.Group>
            <Form.Field required
              id='form-button-control-public'
              control={Button}
              onClick = {addStudentData}
              content={wait?"Loading...":'Sign-up'}
              color='teal'
            />
          </Form>
          {errorMsg && <Message negative>
            <Message.Header>OOPS!!</Message.Header>
            <p>{errorMsg}</p>
          </Message>}
        </Grid.Column>}
      </Grid> 
    </div>
  );
}

export default SignupPage;