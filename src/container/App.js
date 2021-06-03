import React, { useEffect, useContext, useCallback } from 'react';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Admin from 'layouts/Admin.js';
import Staff from 'layouts/Staff';
import Login from 'layouts/Login.js';
import DriverDetail from '../views/DriverDetail/DriverDetail';
import 'assets/css/material-dashboard-react.css?v=1.9.0';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../store/store';
import {
  getUserInfo,
  getAllBooking,
  getAllRoutes,
  getAllStaff,
  getAllCoaches,
  getAllDrivers,
} from 'api/gnsApi';
// import NotFound from 'views/NotFound/NotFound';
const hist = createBrowserHistory();

export default function App() {
  const userToken = localStorage.getItem('token');
  // const [role, setRole] = useState(null);
  const { dispatch } = useContext(AppContext);
  const getInitData = useCallback(async () => {
    const bookings = await getAllBooking();
    const userInfo = await getUserInfo();
    if (userInfo?.role === 'scheduling') {
      const routes = await getAllRoutes();
      dispatch({ type: 'get-routes', payload: routes });
    }

    if (userInfo?.role === 'supervising') {
      const staffList = await getAllStaff();
      const coaches = await getAllCoaches();
      const drivers = await getAllDrivers();
      dispatch({ type: 'get-staff', payload: staffList });
      dispatch({ type: 'get-driver', payload: drivers });
      dispatch({ type: 'get-coaches', payload: coaches });
    }
    dispatch({ type: 'get-booking', payload: bookings });
    dispatch({ type: 'get-profile', payload: userInfo });

    // setRole(userInfo.role);
  }, [dispatch]);
  useEffect(() => {
    if (userToken) {
      getInitData();
    }
  }, [userToken, getInitData]);
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/staff" component={Staff} />
        <Route path="/login" component={Login} />
        <Route path="/admin/driver/view/:id" component={DriverDetail} />
        <Redirect from="/" to="/login" />
        {/* {role === 'supervising' && <Route path="/admin" component={Admin} />}
        <Route path="/login" component={Login} />
        {role === 'scheduling' && <Route path="/staff" component={Staff} />} */}
        {/* {role === 'supervising' && (
          <Redirect exact from="/" to="admin/dashboard" component={Admin} />
        )}

        {role === 'scheduling' && (
          <Redirect exact from="/" to="staff/dashboard" component={Staff} />
        )} */}

        {/* {!userToken && <Redirect from="/" to="/login" />} */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  );
}
