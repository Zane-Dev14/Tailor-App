import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import DailyOutput from './pages/DailyOutput';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/employees" component={Employees} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/daily-output" component={DailyOutput} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
