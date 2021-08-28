import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import Home from './Pages/Home/Home'
import AddCourse from './Pages/Admin/Course/AddCourse/AddCourse'
import CourseDetail from './Pages/Admin/Course/CourseDetail/CourseDetail'
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin'
import LoginPage from './Pages/LoginSignup/LoginPage'
import SignupPage from './Pages/LoginSignup/SignupPage'

const App = ()=> {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin/add-course" component={AddCourse} />
          <Route exact path="/admin/course/:id" component={CourseDetail} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
