import React, { useState, useContext, useEffect } from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
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

  const getInitData = async () => {
    const bookings = await getAllBooking();
    const userInfo = await getUserInfo();
    const staffList = await getAllStaff();
    const coaches = await getAllCoaches();
    const drivers = await getAllDrivers();
    dispatch({ type: 'get-booking', payload: bookings });
    dispatch({ type: 'get-profile', payload: userInfo });
    dispatch({ type: 'get-staff', payload: staffList });
    dispatch({ type: 'get-driver', payload: drivers });
    dispatch({ type: 'get-coaches', payload: coaches });
  };

  useEffect(() => {
    if (userToken) {
      getInitData();
    }
  }, [userToken]);
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
      <GridContainer justify="flex-end">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-native-select">Lựa chọn</InputLabel>
          <Select
            native
            id="grouped-native-select"
            onChange={(e) => {
              console.log('values', e.target.value);
            }}
          >
            <option value={4}>Tháng 4</option>
            <option value={3}>Tháng 3</option>
            <option value={2}>Tháng 2</option>
            <option value={1}>Tháng 1</option>
            {/* </optgroup> */}
          </Select>
        </FormControl>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Doanh Thu tháng 4</p>
              <h3 className={classes.cardTitle}>
                {formatNumber(43685000)} VNĐ
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
              <p className={classes.cardCategory}>Số chuyến thực hiện</p>
              <div style={{ cursor: 'pointer' }}>
                <h3
                  className={classes.cardTitle}
                  onClick={() => {
                    setShowTable(true);
                  }}
                >
                  125 chuyến
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
              <p className={classes.cardCategory}>Số chuyến huỷ</p>
              <div style={{ cursor: 'pointer' }}>
                <h3 className={classes.cardTitle}>15 chuyến </h3>
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
              <p className={classes.cardCategory}>Số nhân viên hiện tại</p>
              <Link to="/admin/staff/view">
                <h3 className={classes.cardTitle}>15 người </h3>
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
