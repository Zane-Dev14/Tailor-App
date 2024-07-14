import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Employees from './pages/Employees';
import EmployeeForm from './components/EmployeeForm';
import Orders from './pages/Orders';
import OrderForm from './components/OrderForm';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/employees" component={Employees} />
                <Route path="/employee/new" component={EmployeeForm} />
                <Route path="/employee/edit/:id" component={EmployeeForm} />
                <Route path="/orders" component={Orders} />
                <Route path="/order/new" component={OrderForm} />
                <Route path="/order/edit/:id" component={OrderForm} />
            </Switch>
        </Router>
    );
}

export default App;
