import React, { useState, useContext, useEffect, useCallback } from 'react';
import ChartistGraph from 'react-chartist';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Store from '@material-ui/icons/Store';
import Accessibility from '@material-ui/icons/Accessibility';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { completedTasksChart } from 'variables/charts.js';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import {
  getUserInfo,
  getAllBooking,
  getAllStaff,
  getAllCoaches,
  getAllDrivers,
} from 'api/gnsApi';
import { AppContext } from '../../store/store';

const useStyles = makeStyles(styles);

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export default function Dashboard() {
  const userToken = localStorage.getItem('token');
  const classes = useStyles();
  const [showTable, setShowTable] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [totalCoach, setTotalCoach] = useState(0);
  const [totalDriver, setTotalDriver] = useState(0);
  const [selectionModel, setSelectionModel] = useState([]);
  const data = {
    columns: [
      { field: 'id', width: 50 },
      { field: 'bookingName', headerName: 'Họ và tên', width: 150 },
      { field: 'bookingMail', headerName: 'Email', width: 150 },
      { field: 'bookingPhone', headerName: 'Số điện thoại', width: 150 },
      { field: 'totalPrice', headerName: 'Tổng giá', width: 50 },
      {
        field: 'paymentMethod',
        headerName: 'Ghi chú',
        type: 'number',
        width: 140,
      },
      {
        field: 'createdAt',
        headerName: '',
        type: 'Ngày đặt',
        width: 140,
      },
      {
        field: 'departureDate',
        headerName: '',
        type: 'Ngày xuất phát',
        width: 200,
      },
      {
        field: 'fixedTrip',
        headerName: '',
        type: 'Tuyến đường',
        width: 200,
      },
    ],
    rows: [
      {
        id: 1,
        bookingName: 'Bùi Quang Huy',
        bookingMail: 'codatduoc@gmail.com',
        bookingPhone: '0973405092',
        totalPrice: 100000,
        isVerify: true,
        isCancel: false,
        hasTransit: true,
        transitDetailId: 1,
        notes: 'Thanh toán tiền mặt',
        tripId: 1,
        bookingStatus: 'success',
        paymentMethod: 'online',
        createdAt: '2021-04-24T17:53:46.949Z',
        departureDate: '2021/05/25',
        fixedTrip: 'Hà Nội -> Quảng Ninh',
      },
    ],
  };
  const { dispatch } = useContext(AppContext);

  const getInitData = useCallback(async () => {
    const bookings = await getAllBooking();
    const userInfo = await getUserInfo();
    const staffList = await getAllStaff();
    const coaches = await getAllCoaches();
    const driverList = await getAllDrivers();
    const prices = bookings
      .filter((booking) => booking.isVerify && !booking.isCancel)
      .map((data) => data.totalPrice);
    const totalPrice = prices.reduce((a, b) => a + b);
    const staffs = staffList.filter(
      (staff) =>
        (staff.role === 'scheduling' || staff.role === 'tracking') &&
        staff.workingStatus === 'working',
    );
    const drivers = driverList.filter(
      (driver) => driver.workingStatus === 'working',
    );
    setTotalPrice(totalPrice);
    setTotalStaff(staffs.length);
    setTotalCoach(coaches.length);
    setTotalDriver(drivers.length);
    dispatch({ type: 'get-booking', payload: bookings });
    dispatch({ type: 'get-profile', payload: userInfo });
    dispatch({ type: 'get-staff', payload: staffList });
    dispatch({ type: 'get-driver', payload: drivers });
    dispatch({ type: 'get-coaches', payload: coaches });
  }, [dispatch]);

  useEffect(() => {
    if (userToken) {
      getInitData();
    }
  }, [userToken, getInitData]);
  return showTable ? (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        pageSize={5}
        // rowsPerPageOptions={[20, 20, 20]}
        onPageChange={(params) => {
          // setPage(params.page);
          console.log('params', params.page);
        }}
        pagination
        {...data}
        onSelectionModelChange={(newSelection) => {
          console.log('newSelection', newSelection);
          setSelectionModel(newSelection.selectionModel);
        }}
        selectionModel={selectionModel}
      />
    </div>
  ) : (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Doanh Thu dự kiến</p>
              <h3 className={classes.cardTitle}>
                {formatNumber(totalPrice)} VNĐ
              </h3>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Tổng số xe khách</p>
              <div style={{ cursor: 'pointer' }}>
                <Link to="/admin/coaches/view">
                  <h3
                    className={classes.cardTitle}
                    onClick={() => {
                      setShowTable(true);
                    }}
                  >
                    {totalCoach} xe
                  </h3>
                </Link>
              </div>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Tổng số tài xế</p>
              <div style={{ cursor: 'pointer' }}>
                <Link to="/admin/driver/view">
                  <h3 className={classes.cardTitle}>{totalDriver} người </h3>
                </Link>
              </div>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Tổng số nhân viên</p>
              <Link to="/admin/staff/view">
                <h3 className={classes.cardTitle}>{totalStaff} người </h3>
              </Link>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Biểu đồ Doanh thu</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
