import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';
import routesAdmin from 'routes-admin';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';
import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';
import DriverDetail from '../views/DriverDetail/DriverDetail';
let ps;
const switchRoutesAdmin = (
  <Switch>
    <Route path="/admin/driver/view/:id" component={DriverDetail} />
    {routesAdmin.map((prop, key) => (
      <Route
        path={prop.layout + prop.path}
        component={prop.component}
        key={key}
      />
    ))}
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [image, setImage] = useState(bgImage);
  const [color, setColor] = useState('blue');
  const [fixedClasses, setFixedClasses] = useState('dropdown');
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === 'dropdown') {
      setFixedClasses('dropdown show');
    } else {
      setFixedClasses('dropdown');
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routesAdmin}
        logoText="Chủ hợp tác xã"
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routesAdmin}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        <div className={classes.content}>
          <div className={classes.container}>{switchRoutesAdmin}</div>
          {/* <div>{test}</div> */}
        </div>

        <Footer />
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>
  );
}
