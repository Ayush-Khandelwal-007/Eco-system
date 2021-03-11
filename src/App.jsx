import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import StudentDashboard from './pages/StudentDashboard';
import Login from './pages/Login';
import Landing from './pages/Landing';

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
            <Login/>
          </Route>
          <Route path="/">
            {/* {} */}
            <Landing/>
          </Route>
        </Switch>
      </div>
    </Router >
    </div>
  );
}

export default App;
