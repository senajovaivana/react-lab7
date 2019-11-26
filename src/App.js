import React from 'react';
import EmployeeClass from './EmployeeClass'
import NewComponent from './NewComponent'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

function App() {
  return (
      <>
          <Router>
              <Switch>
                  <Route exact path="/" component={EmployeeClass}/>
                 
              </Switch>
          </Router>

      </>
  );
}

export default App;
