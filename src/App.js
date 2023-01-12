import { Route, Redirect, Switch, BrowserRouter} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Job from './components/Job'
import NotFound from './components/NotFound'
import JobItemDetailed from './components/JobItemDetailed'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => 
<BrowserRouter>
    <Switch>
        <Route exact path='/login' component={Login} />
        <ProtectedRoute exact path='/' component={Home} />
        <ProtectedRoute exact path='/jobs' component={Job} />
        <Route exact path='/not-found' component={NotFound} />
        <Route exact path='/jobs/:id' component={JobItemDetailed} />
        <Redirect to='/not-found' />
    </Switch>
</BrowserRouter>

export default App
