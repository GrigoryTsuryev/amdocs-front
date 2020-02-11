import React from 'react';
import ReactDOM from 'react-dom';
import Wellcome from "./components/Wellcome.js";
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router,Route} from "react-router-dom";

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Wellcome} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path='/dashboard:error' component={Dashboard} />
      </div>
    </Router>
  );
  

ReactDOM.render(routing, document.getElementById('root'));


