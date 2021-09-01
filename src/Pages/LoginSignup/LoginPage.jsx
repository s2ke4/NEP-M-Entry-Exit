import GoogleLogin  from 'react-google-login';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import axios from 'axios';

const LoginPage = ()=>{
  const client_id="170807146234-875ioslntjl4qi7lo3ul7clp90hm7umd.apps.googleusercontent.com"

  const responseSuccessGoogle = async(response)=>{
    console.log("success")
    const res = await axios({
      method:"POST",
      url:"http://localhost:5000/auth/login",
      data:{tokenId:response.tokenId},
      withCredentials:true
    })
    console.log(res);
  }

  const responseErrorGoogle= (response)=>{
    console.log("OOPS Error while google authentication ",response)
  }

  const checkAuthStatus = async()=>{
    let res = await axios.get("http://localhost:5000/auth/status")
     console.log(res.data);
  }

  return(
    <div>
      <GoogleLogin
        clientId={client_id}
        buttonText="Login With Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <Button onClick={checkAuthStatus}>Check Auth Status</Button>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/iiitv.jpg' /> Login your Profile 
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />

              <Button color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            <strong>Already have a profile ? <Link to="/about">Sign-up</Link></strong>
          </Message>
        </Grid.Column>
      </Grid> 
    </div>
  );
}

export default LoginPage;