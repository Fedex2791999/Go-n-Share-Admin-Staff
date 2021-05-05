import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getAllBooking, confirmBooking, refusedBooking } from 'api/gnsApi';
import moment from 'moment';
import { AppContext } from 'store/store';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 'auto',
  },
});

export const MappingCityData = {
  HAN: 'Hà Nội',
  HCM: 'Hồ Chí Minh',
  DAN: 'Đà Nẵng',
  QAN: 'Quảng Ninh',
};

export default function Boooking() {
  const classes = useStyles();
  const [listCard, setListCard] = useState([]);
  const [showTransit, setShowTransit] = useState(false);
  const { bookings } = useContext(AppContext).state;
  const filterBooking = (bookingList) => {
    return (bookingList = bookingList.filter(
      (booking) => !booking.isVerify && !booking.isCancel,
    ));
  };
  const getListBooking = async () => {
    let bookingList = await getAllBooking();
    setListCard(filterBooking(bookingList));
  };
  useEffect(() => {
    setListCard(filterBooking(bookings));
  }, []);
  const handleConfirmedBooking = async (id) => {
    const reqBody = {
      bookingId: id,
      confirm: 1,
    };
    await confirmBooking(reqBody);
    await getListBooking();
  };

  const handleRefusedBooking = async (id) => {
    const reqBody = {
      bookingId: id,
      confirm: 0,
    };
    await refusedBooking(reqBody);
    await getListBooking();
  };
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gridRowGap: 20,
        gridColumnGap: 20,
      }}
    >
      {listCard.map((booking, index) => (
        <Card className={classes.root} key={index}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="auto "
              src="https://fantasea.vn/wp-content/uploads/2018/10/xe-kh%C3%A1ch.jpg"
              title="Contemplative Reptile"
            />
          </CardActionArea>

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Xe đi từ{' '}
              {MappingCityData[`${booking.tripDetail.departureLocation}`]} đến{' '}
              {MappingCityData[`${booking.tripDetail.arriveLocation}`]} ngày{' '}
              {moment(booking.tripDetail.departureDate).format('DD-MM-YYYY')}
            </Typography>
            <div>Họ và tên: {booking.bookingName}</div>
            <div>Email: {booking.bookingMail}</div>
            <div>SĐT: {booking.bookingPhone}</div>
            <div>Ghi chú: {booking.notes}</div>
            <div>
              Phương thức thanh toán:{' '}
              {booking.paymentMethod === 'cash' ? 'Tiền mặt' : ''}
            </div>
            {booking.transitDetail && (
              <div>
                <div>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      setShowTransit(!showTransit);
                    }}
                  >
                    Chi tiết Transit
                  </Button>
                </div>
                {showTransit && (
                  <div>
                    {' '}
                    <div>
                      <strong>Thông tin transit </strong>
                    </div>
                    <div>Địa chỉ: {booking.transitDetail?.address}</div>
                    <div>Ghi chú transit: {booking.transitDetail?.notes}</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          <CardActions>
            <Button
              size="small"
              color="primary"
              cursor="pointer"
              onClick={() => {
                handleConfirmedBooking(booking.id);
              }}
            >
              Xác nhận
            </Button>
            <Button
              size="small"
              cursor="pointer"
              color="primary"
              onClick={() => {
                handleRefusedBooking(booking.id);
              }}
            >
              Từ chối
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
