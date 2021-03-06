import React, {useState,useContext,useEffect} from 'react';
import { useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import { AppContext } from '../../store/store';
import {MappingRole,MappingShift} from '../UserProfile/UserProfile'
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import {getTransitDetail,getTripDetail} from 'api/gnsApi'
import moment from 'moment';
import {compareDate} from 'helper/sort'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const [showDetailTransit, setShowDetailTransit] = useState(false);
  const [showListSchedule, setShowListSchedule] = useState(true);
  const [detailTransitInfo, setDetailTransitInfo] = useState(null);

  const handleClose = () => {
    onClose();
    setShowDetailTransit(false);
    setShowListSchedule(true);
  };

  const handleListItemClick = async (transitId) => {
    const res = await getTransitDetail(transitId);
    setDetailTransitInfo(res)
  };
  console.log('props?.listSchedule',props?.listSchedule);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWith="lg"
      fullWidth
    >
      {showListSchedule && (
        <div>
        <DialogTitle id="simple-dialog-title">Danh s??ch l???ch tr??nh</DialogTitle>
        <List>
          {props?.listSchedule?.map((schedule) => (
            <div style = {{
              border: '1px solid #695353',
              borderRadius: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            }}>
            <ListItem
              button
              onClick={() => {
                  handleListItemClick(schedule.id);
                  setShowDetailTransit(true);
                  setShowListSchedule(false);
                }
              }
              key={schedule}
            >
              <ListItemAvatar>
                <AirportShuttleIcon 
                className={classes.avatar} 
                fontSize = 'large'
                color = 'primary'
                />
              </ListItemAvatar>
              <div>Ng??y {moment(schedule?.departureDate).format('DD/MM/YYYY')}, {MappingShift[schedule?.departureShift]}</div>
            </ListItem>
            </div>
          ))}
        </List>
        </div>
      )}
      
      {showDetailTransit && detailTransitInfo && (
        <div >
        <DialogTitle id="simple-dialog-title">Chi ti???t l???ch tr??nh</DialogTitle>
        <div style = {{padding: 24}}>
        <div>Chuy???n ??i t??? {detailTransitInfo?.departureName} -> {detailTransitInfo?.arriveName}</div>
        <div>
          <div>
            Ng??y xu???t ph??t: {detailTransitInfo?.departureDate}
          </div>
          <div>
            Ca xu???t ph??t: {MappingShift[detailTransitInfo?.departureShift]}
          </div>
        </div>
          <div>Danh s??ch h??nh kh??ch ??i xe transit</div>
          <div style = {{overflow: 'auto',maxHeight: 350, marginTop: 10, marginBottom: 10, paddingRight: 10}}>
          {detailTransitInfo?.details?.map((detail)=> (
              <div style = {{ 
                border: '2px solid red',
                padding: 4,
                borderRadius: 9,
                background: '#4FD1C5',
                marginBottom: 10,
            }}>
            <div>T??n h??nh kh??ch: {detail?.bookingName}</div>
            <div>SDT: {detail?.bookingPhone}</div>
            <div>Ghi ch??: {detail?.notes}</div>
            <div>?????a ch???: {detail?.address}</div>
            </div>
          ))}
          </div>
          <Button color="primary" onClick = {()=>{
            setShowDetailTransit(false);
            setShowListSchedule(true);
            setDetailTransitInfo(null);
          }} >
          <KeyboardBackspaceRoundedIcon /> {' '}Quay l???i
        </Button>
        </div>
        </div>
      )}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function DriverDetail() {
  const [open, setOpen] = React.useState(false);
  const [driverInfo, setDriverInfo] = useState(null);
  const [listSchedule, setListSchedule] = useState([]);
  const {id} = useParams();
  const { drivers } = useContext(AppContext).state;
  useEffect(() => {
    const result = drivers.find((driver) =>driver.id === parseInt(id));
    setDriverInfo(result);
    setListSchedule(result?.role === 'transitTrip' ? result?.transits.sort(compareDate) : result?.trips.sort(compareDate) );
  }, [driverInfo,drivers,listSchedule])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <h2 style={{ fontWeight: 'bold' }}>Th??ng tin chi ti???t t??i x???</h2>
      <h4>H??? v?? t??n: {driverInfo?.fullname}</h4>
      <h4>S??? ??i???n tho???i: {driverInfo?.phone}</h4>
      <h4>Tu???i: {driverInfo?.age}</h4>
      <h4>V??i tr??: {MappingRole[`${driverInfo?.role}`]}</h4>
      <h4>N??i l??m vi???c: {driverInfo?.location?.name}</h4>
      <h4>L???ch l??m vi???c: {driverInfo?.schedule.map((day) => `Th??? ${day+1}, `)}</h4>
      <div>
        <Link  onClick={handleClickOpen} style ={{cursor: 'pointer'}}>
          Danh s??ch c??c chuy???n
        </Link>
        <SimpleDialog
          // selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          listSchedule = {listSchedule}
        />
      </div>
    </div>
  );
}
