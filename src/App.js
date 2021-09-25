import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import AddCourse from './Pages/Admin/Course/AddCourse/AddCourse'
import EditCourse from './Pages/Admin/Course/EditCourse/EditCourse'
import AdminCourseDetail from './Pages/Admin/Course/CourseDetail/CourseDetail'
import SignupPage from './Pages/Student/Signup/SignupPage'
import AddRole from './Pages/Admin/AccessRoles/AddRole'
import RoleList from './Pages/Admin/AccessRoles/RoleList'
import InstructorDashboard from './Pages/Instructor/Dashboard/Dashboard'
import StudentDashboard from './Pages/Student/Dashboard/Dashboard'
import axios from 'axios'
import { createMedia } from "@artsy/fresnel";
import Header from './Pages/Shared/Header/Header';
import UserProfile from './Pages/Student/Profile/Profile'
import CourseEnrollments from './Pages/Admin/Course/CourseEnrollments/CourseEnrollments';
import NavDecider from './Pages/Shared/Navbar/NavDecider';
import AdminDashboard from './Pages/Admin/Dashboard/Dashboard';
import InstructorCourseDetail from './Pages/Instructor/Course/CourseDetails/CourseDetails';
import StudentCourseDetail from './Pages/Student/Course/CourseDetails/CourseDetails';


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
          <NavDecider>
            <Switch>
              <Route exact path="/admin/add-course" component={AddCourse} />
              <Route exact path="/admin/courses/:id" component={AdminCourseDetail} />
              <Route exact path="/admin/courses/:id/enrollments" component={CourseEnrollments} />
              <Route exact path="/admin/edit-course/:id" component={EditCourse} />
              <Route exact path="/admin/dashboard" component ={AdminDashboard} />
              <Route exact path="/instructor/dashboard" component ={InstructorDashboard} />
              <Route exact path="/instructor/courses/:id" component={InstructorCourseDetail} />
              <Route exact path="/instructor/courses/:id/enrollments" component={CourseEnrollments} />
              <Route exact path="/student/dashboard" component ={StudentDashboard} />
              <Route exact path="/student/courses/:id" component={StudentCourseDetail} />
              <Route exact path="/student/courses/:id/enrollments" component={CourseEnrollments} />
              <Route exact path="/sign-up" component={SignupPage} />
              <Route exact path="/admin/rolelist" component={RoleList} />
              <Route exact path="/admin/addrole" component={AddRole}/>     
              <Route exact path="/sign-up" component={SignupPage} />
              <Route exact path="/user/profile" component={UserProfile} />          
            </Switch>
          </NavDecider>
        </MediaContextProvider>
      </Router>
    </div>
  );
}

export default App;
