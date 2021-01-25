import logo from './logo.svg';
import LoginPage from "./components/LoginPage"
import StudentDashboard from "./components/StudentDashboard"
import InstructorLogin from "./components/InstructorLogin"
import StudentRoute from "./components/StudentRoute"
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Route exact path = "/" component={LoginPage}></Route>
        <StudentRoute exact path = "/student" component={StudentDashboard}></StudentRoute>
        <Route exact path = "/instructorlogin" component={InstructorLogin}></Route>

    </Router>
  );
}

export default App;
