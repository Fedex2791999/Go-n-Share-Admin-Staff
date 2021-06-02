import React, { useState, useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Store from '@material-ui/icons/Store';
import Accessibility from '@material-ui/icons/Accessibility';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardFooter from 'components/Card/CardFooter.js';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { DataGrid } from '@material-ui/data-grid';
import { AppContext } from 'store/store';
import { MappingCityData } from '../Booking/Booking';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import { getUserInfo, getAllBooking, getAllRoutes } from 'api/gnsApi';

const useStyles = makeStyles(styles);
export default function Dashboard() {
  const classes = useStyles();
  const userToken = localStorage.getItem('token');
  const [showTable] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [isVerify, setIsVerified] = useState([]);
  const [isCancel, setIsCancel] = useState([]);
  const [notVerify, setNotVerified] = useState([]);
  const [bookingMap, setBookingMap] = useState([]);
  const { dispatch } = useContext(AppContext);
  const { bookings } = useContext(AppContext).state;
  const data = {
    columns: [
      { field: 'id', headerName: 'Mã ID', width: 100 },
      { field: 'bookingName', headerName: 'Họ và tên', width: 150 },
      { field: 'bookingMail', headerName: 'Email', width: 150 },
      { field: 'bookingPhone', headerName: 'Số điện thoại', width: 150 },
      { field: 'totalPrice', headerName: 'Tổng giá', width: 150 },
      {
        field: 'paymentMethod',
        headerName: 'Ghi chú',
        type: 'number',
        width: 100,
      },
      {
        field: 'fixedTrip',
        headerName: '',
        type: 'Tuyến đường',
        width: 150,
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
    ],
    rows: bookingMap,
  };

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const getInitData = useCallback(async () => {
    const bookings = await getAllBooking();
    const userInfo = await getUserInfo();
    const routes = await getAllRoutes();
    dispatch({ type: 'get-routes', payload: routes });
    dispatch({ type: 'get-booking', payload: bookings });
    dispatch({ type: 'get-profile', payload: userInfo });
  }, [dispatch]);

  useEffect(() => {
    if (userToken) {
      getInitData();
    }
  }, [userToken, getInitData]);

  useEffect(() => {
    if (bookings.length > 0) {
      const isVerify = bookings.filter((booking) => booking.isVerify);
      const isCancel = bookings.filter((booking) => booking.isCancel);
      const notVerify = bookings.filter(
        (booking) => booking.isVerify === false,
      );
      const bookingMap = bookings.map((data) => {
        return {
          ...data,
          totalPrice: `${formatNumber(data?.totalPrice)} VNĐ`,
          departureDate: data?.tripDetail?.departureDate,
          fixedTrip: `${
            MappingCityData[data?.tripDetail?.departureLocation]
          } -> ${MappingCityData[data?.tripDetail.arriveLocation]}`,
        };
      });
      setIsVerified(isVerify);
      setIsCancel(isCancel);
      setNotVerified(notVerify);
      setBookingMap(bookingMap);
    }
  }, [bookings]);

  return showTable ? (
    <div style={{ height: 500, width: '100%' }}>
      <KeyboardBackspaceRoundedIcon />
      <DataGrid
        pageSize={5}
        rowsPerPageOptions={[20, 20, 20]}
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
              <p className={classes.cardCategory}>Tổng số vé đã huỷ</p>
              <h3 className={classes.cardTitle}>{isCancel.length} vé</h3>
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
              <p className={classes.cardCategory}>Tổng số vé đã xác nhận</p>
              <div style={{ cursor: 'pointer' }}>
                <h3
                  className={classes.cardTitle}
                  // onClick={() => {
                  //   setShowTable(true);
                  // }}
                >
                  {isVerify.length} vé
                </h3>
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
              <p className={classes.cardCategory}>Tổng số vé chưa xác nhận</p>
              <div style={{ cursor: 'pointer' }}>
                <h3 className={classes.cardTitle}>{notVerify.length} vé </h3>
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
              <p className={classes.cardCategory}>Số chuyến đã tạo</p>
              <div style={{ cursor: 'pointer' }}>
                <h3 className={classes.cardTitle}>15 chuyến </h3>
              </div>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
