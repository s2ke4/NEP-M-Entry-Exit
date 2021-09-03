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
import AddRole from './Pages/Admin/AccessRoles/AddRole'
import RoleList from './Pages/Admin/AccessRoles/RoleList'
import { createMedia } from "@artsy/fresnel";
import Header from './Pages/Shared/Header/Header';


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

  const [roles, setroles] = useState([]);

  const addRoleHandler = (role) => {
    setroles([...roles, role]);
  };

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
              <Route exact path="/admin/login" component={AdminLogin} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/sign-up" component={SignupPage} />
              <Route exact path = "/rolelist" 
                render = {(props) =>(<RoleList {...props}  roles = {roles}/>)}
              />
              <Route exact path = "/addrole" 
                render = {(props) =>(<AddRole {...props}  addRoleHandler = {addRoleHandler} />)}
              />     
            </Switch>
          </Navbar>
        </MediaContextProvider>
      </Router>
    </div>
  );
}

export default App;
