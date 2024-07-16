import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Orders from './pages/Orders';
import Customers from './pages/Customers';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto py-6">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/employees" component={Employees} />
            <Route path="/orders" component={Orders} />
            <Route path="/customers" component={Customers} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;