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
import EditRole from './Pages/Admin/AccessRoles/EditRole'
import PendingStudentList from './Pages/Admin/PendingRequest/StudentList'
import StudentApplication from './Pages/Admin/PendingRequest/StudentApplication'
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
import UserProvider from './Providers/UserProvider'
import AppliedCourses from './Pages/Student/Course/AppliedCourses/AppliedCourses';
import Notification from './Pages/Student/Notification';
import MyCourses from './Pages/Student/Course/MyCourses/MyCourses';
import StudentVerify from './Pages/Admin/PendingRequest/StudentVerify';
import demoCourse from './Pages/Admin/PendingRequest/demoCourse.jsx'

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
      <UserProvider>
        <Router>
          <Header/>
          <style>{mediaStyles}</style>
          <MediaContextProvider>
            <NavDecider>
              <Switch>
                <Route exact path="/" component={StudentDashboard} />
                <Route exact path="/admin/add-course" component={AddCourse} />
                <Route exact path="/admin/courses/:id" component={AdminCourseDetail} />
                <Route exact path="/admin/course/request/:id" component={PendingStudentList} />
                <Route exact path="/admin/courses/:id/enrollments" component={CourseEnrollments} />
                <Route exact path="/admin/edit-course/:id" component={EditCourse} />
                <Route exact path="/admin/course/:courseId/student-profile/:studentId" component={StudentApplication} />
                <Route exact path="/admin/dashboard" component ={AdminDashboard} />
                <Route exact path="/admin/dashboard" component ={AdminDashboard} />
                <Route exact path="/admin/course/verify/:studentId" component ={StudentVerify} />
                <Route exact path="/instructor/dashboard" component ={InstructorDashboard} />
                <Route exact path="/instructor/courses/:id" component={InstructorCourseDetail} />
                <Route exact path="/instructor/courses/:id/enrollments" component={CourseEnrollments} />
                <Route exact path="/student/dashboard" component ={StudentDashboard} />
                <Route exact path="/student/courses/:id" component={StudentCourseDetail} />
                <Route exact path="/student/applied-courses" component={AppliedCourses} />
                <Route exact path="/student/my-courses" component={MyCourses} />
                <Route exact path="/admin/rolelist" component={RoleList} />
                <Route exact path="/admin/add-role" component={AddRole}/>     
                <Route exact path="/admin/editrole/:id" component={EditRole}/>
                <Route exact path="/admin/student-profile/:id" component={UserProfile}/>     
                <Route exact path="/student/sign-up" component={SignupPage} />
                <Route exact path="/user/profile" component={UserProfile} />   
                <Route exact path="/student/notifications" component={Notification} />  
                <Route exact path="/college/demo" component={demoCourse} />          
              </Switch>
            </NavDecider>
          </MediaContextProvider>
        </Router>
        </UserProvider>
    </div>
  );
}

export default App;
