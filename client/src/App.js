import logo from './logo.svg';
import LoginPage from "./components/LoginPage"
import InstructorDashboard from "./components/InstructorDashboard"
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Route exact path = "/" component={LoginPage}></Route>
        <Route exact path = "/instructor" component={InstructorDashboard}></Route>
    </Router>
  );
}

export default App;
