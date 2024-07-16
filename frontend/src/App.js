import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import EmployeeEditForm from './components/EmployeeEditForm';
import CustomerForm from './components/CustomerForm';
import OrderForm from './components/OrderForm';
import Home from './components/Home';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/employees" exact component={EmployeeList} />
                <Route path="/employees/edit/:id" component={EmployeeEditForm} />
                <Route path="/customers" component={CustomerForm} />
                <Route path="/orders" component={OrderForm} />
            </Switch>
        </Router>
    );
};

export default App;
