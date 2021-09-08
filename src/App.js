import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import Home from './Pages/Home/Home'
import AddCourse from './Pages/Admin/Course/AddCourse/AddCourse'
import CourseDetail from './Pages/Admin/Course/CourseDetail/CourseDetail'
import Navbar from './Pages/Shared/Navbar/Navbar'
import SignupPage from './Pages/Student/Signup/SignupPage'
import AddRole from './Pages/Admin/AccessRoles/AddRole'
import RoleList from './Pages/Admin/AccessRoles/RoleList'
import InstructorDashboard from './Pages/Instructor/Dashboard/Dashboard'
import StudentDashboard from './Pages/Student/Dashboard/Dashboard'
import AdminDashboard from './Pages/Admin/Dashboard/Dashboard'
import axios from 'axios'
import { createMedia } from "@artsy/fresnel";
import Header from './Pages/Shared/Header/Header';
import UserProfile from './Pages/Student/Profile/Profile'
import AdminCourses from './Pages/Admin/Course/Courses/Courses'
import CourseEnrollments from './Pages/Admin/Course/CourseEnrollments/CourseEnrollments';


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

  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <Router>
        <Header/>
        <style>{mediaStyles}</style>
        <MediaContextProvider>
          <Navbar>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/courses" component={AdminCourses} />
              <Route exact path="/admin/courses" component={AdminCourses} />
              <Route exact path="/admin/add-course" component={AddCourse} />
              <Route exact path="/admin/courses/:id" component={CourseDetail} />
              <Route exact path="/admin/courses/:id/enrollments" component={CourseEnrollments} />
              <Route exact path="/admin/dashboard" component ={AdminDashboard} />
              <Route exact path="/instructor/dashboard" component ={InstructorDashboard} />
              <Route exact path="/student/dashboard" component ={StudentDashboard} />
              <Route exact path="/sign-up" component={SignupPage} />
              <Route exact path = "/admin/rolelist" component={RoleList} />
              <Route exact path = "/admin/addrole" component={AddRole}/>     
              <Route exact path="/sign-up" component={SignupPage} />
              <Route exact path="/user/profile" component={UserProfile} />          
            </Switch>
          </Navbar>
        </MediaContextProvider>
      </Router>
    </div>
  );
}

export default App;
