import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import ErrorPage from './components/pages/ErrorPage';
import {Protected} from './components/etc/Protected'
import Create from './components/pages/Create';
import './App.css';

function App() {
  /*var history = useHistory();

  const route = (props) => {
    console.log('clicked',props);
  }*/

  return (
    <Router>
      <Switch>{/*
        <Route exact path="/">
          <Login />
        </Route>*/}
        <Route exact path="/" component={Login} />
{/*
        <Route exact path="/view/:id">
          <Login />
        </Route>*/}

        {/*<Route exact path="/register">
          <Register />
        </Route>*/}
        
        <Route exact path="/register" component={Register} />

        <Route exact path="/dashboard/create">
          <Create />
        </Route>
        {/*
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>*/}

        <Protected exact path="/dashboard" component={Dashboard}/>

        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
