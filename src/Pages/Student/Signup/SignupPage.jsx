import { Button, Form, Grid, Header, Image, Message, Input, Select  } from 'semantic-ui-react'
import { Link } from "react-router-dom";

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
  return(
    <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 800 }}>
          <Header as='h2' color='teal' textAlign='center' >
            <Image src='/iiitv.jpg' /> Signup to make your Profile
          </Header>
          <Form size='large'>
            <Form.Group widths='equal'>
              <Form.Field required
                id='form-input-control-first-name'
                control={Input}
                label='First name'
                placeholder='First name'
              />
              <Form.Field required
                id='form-input-control-last-name'
                control={Input}
                label='Last name'
                placeholder='Last name'
              />  
              <Form.Field required
                control={Select}
                options={genderOptions}
                label='Gender'
                placeholder='Gender'
                search
                searchInput={{ id: 'form-select-control-gender' }}
              />
            </Form.Group>
            <label><strong>Date of Birth</strong></label>
            <input type="date" id="birthday" name="birthday" required />
            <br /> <br />
            <Form.Group widths='equal'>
              <Form.Field required
                id='form-textarea-control-opinion'
                control={Input}
                label='Institute'
                placeholder='Institute Name'
              />
              <Form.Field required
                id='form-textarea-control-opinion'
                control={Select}
                options={currentYear}
                label='Current Year'
                placeholder='Current Year'
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field required
                id='form-input-control-error-email'
                control={Input}
                label='Email'
                placeholder='example@xyz.com'
                // error={{
                //   content: 'Please enter a valid email address',
                //   pointing: 'below',
                // }}
              />
              <Form.Field required
                id='form-input-control-error-email'
                control={Input}
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
              content='Signup'
              color='teal'
            />
          </Form>
          <Message>
            <strong>Already have a profile ? <Link to="/about">Login</Link></strong>
          </Message>
        </Grid.Column>
      </Grid> 
    </div>
  );
}

export default SignupPage;