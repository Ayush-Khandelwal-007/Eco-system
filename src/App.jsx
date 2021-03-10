import './App.css';
import Header from './StudentComponents/Header';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
    <div className="App">
      <Router>
      <div className="App">
        <Switch>
          <Route exact path="/studentDashboard">
            {
              <StudentDashboard/>
            }
            {/* {state.user ? <Orders /> : <SignIn />} */}
          </Route>
          <Route exact path="/HODDashboard">
            {/* {state.user ? <Checkout /> : <SignIn />} */}
          </Route>
          <Route exact path="/FnADashBoard">
            {/* {state.user ? <Redirect to="/" /> : <SignIn />} */}
          </Route>
          <Route exact path="/Login">
            {/* {state.user ? <Redirect to="/" /> : <SignUp />} */}
          </Route>
          <Route path="/">
            {/* {} */}
          </Route>
        </Switch>
      </div>
    </Router >
    </div>
  );
}

export default App;
