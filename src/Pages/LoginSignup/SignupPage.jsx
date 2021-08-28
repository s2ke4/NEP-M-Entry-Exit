import { Button, Form, Grid, Header, Image, Message, Input, TextArea, Select  } from 'semantic-ui-react'
import { Link } from "react-router-dom";


const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const yearOfGradudation = [
  { key: '2021', text: '2021', value: '2021' },
  { key: '2022', text: '2022', value: '2022' },
  { key: '2023', text: '2023', value: '2023' },
]

const SignupPage = ()=>{
  return(
    <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 800 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/iiitv.jpg' /> Signup to make your Profile
          </Header>
          <Form size='large'>
            <Form.Group widths='equal'>
              <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='First name'
                placeholder='First name'
              />
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Last name'
                placeholder='Last name'
              />
              <Form.Field
                control={Select}
                options={genderOptions}
                label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
                placeholder='Gender'
                search
                searchInput={{ id: 'form-select-control-gender' }}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field
                id='form-textarea-control-opinion'
                control={Input}
                label='Institute'
                placeholder='Institute Name'
              />
              <Form.Field
                id='form-textarea-control-opinion'
                control={Select}
                options={yearOfGradudation}
                label='Graduation'
                placeholder='Year of Graduation'
              />
            </Form.Group>
            <Form.Field
              id='form-input-control-error-email'
              control={Input}
              label='Email'
              placeholder='example@xyz.com'
              // error={{
              //   content: 'Please enter a valid email address',
              //   pointing: 'below',
              // }}
            />
            <Form.Field
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