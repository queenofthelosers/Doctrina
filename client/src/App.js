import logo from './logo.svg';
import LoginPage from "./components/LoginPage"
import StudentDashboard from "./components/StudentDashboard"
import InstructorLogin from "./components/InstructorLogin"
import StudentRoute from "./components/StudentRoute"
import InstructorDashboard from "./components/InstructorDashboard"
import { BrowserRouter as Router, Route} from 'react-router-dom';
import InstructorRoute from './components/InstructorRoute';
import Editor from "./components/Editor";
function App() {
  return (
    <Router>
        <Route exact path = "/" component={LoginPage}></Route>
        <StudentRoute exact path = "/student" component={StudentDashboard}></StudentRoute>
        <Route exact path = "/instructorlogin" component={InstructorLogin}></Route>
        <InstructorRoute exact path = "/instructor_dashboard" component = {InstructorDashboard}></InstructorRoute>
        <InstructorRoute exact path = "/editor" component = {Editor}></InstructorRoute>
    </Router>
  );
}

export default App;
