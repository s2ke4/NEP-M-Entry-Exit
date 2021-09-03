import './App.css';
import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import Home from './Pages/Home/Home'
import AddCourse from './Pages/Admin/Course/AddCourse/AddCourse'
import CourseDetail from './Pages/Admin/Course/CourseDetail/CourseDetail'
import Navbar from './Pages/Shared/Navbar/Navbar'
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin'
import LoginPage from './Pages/LoginSignup/LoginPage'
import SignupPage from './Pages/LoginSignup/SignupPage'
<<<<<<< HEAD
import AddRole from './Pages/Admin/AccessRoles/AddRole'
import RoleList from './Pages/Admin/AccessRoles/RoleList'
=======
import InstructorDashboard from './Pages/Instructor/Dashboard/Dashboard'
import StudentDashboard from './Pages/Student/Dashboard/Dashboard'
import axios from 'axios'
>>>>>>> 8dc1e72533b48b0225b456b370a766c4a02ccafc
import { createMedia } from "@artsy/fresnel";
import Header from './Pages/Shared/Header/Header';
import UserProfile from './Pages/Profile/Profile'


const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920,
  },
});

const mediaStyles = AppMedia.createMediaStyle();
const { MediaContextProvider } = AppMedia;



const App = ()=> {
<<<<<<< HEAD

  const [roles, setroles] = useState([]);

  const addRoleHandler = (role) => {
    setroles([...roles, role]);
  };

=======
  axios.defaults.withCredentials = true;
>>>>>>> 8dc1e72533b48b0225b456b370a766c4a02ccafc
  return (
    <div className="App">
      <Router>
        <Header/>
        <style>{mediaStyles}</style>
        <MediaContextProvider>
          <Navbar>
            <Switch>
              
              <Route exact path="/" component={Home} />
              <Route exact path="/admin/add-course" component={AddCourse} />
              <Route exact path="/admin/course/:id" component={CourseDetail} />
              <Route exact path="/instructor/dashboard" component ={InstructorDashboard} />
              <Route exact path="/student/dashboard" component ={StudentDashboard} />
              <Route exact path="/admin/login" component={AdminLogin} />
<<<<<<< HEAD
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/sign-up" component={SignupPage} />
              <Route exact path = "/rolelist" 
                render = {(props) =>(<RoleList {...props}  roles = {roles}/>)}
              />
              <Route exact path = "/addrole" 
                render = {(props) =>(<AddRole {...props}  addRoleHandler = {addRoleHandler} />)}
              />     
=======
              <Route exact path="/sign-up" component={SignupPage} />
              <Route exact path="/user/profile" component={UserProfile} />          
>>>>>>> 8dc1e72533b48b0225b456b370a766c4a02ccafc
            </Switch>
          </Navbar>
        </MediaContextProvider>
      </Router>
    </div>
  );
}

export default App;
