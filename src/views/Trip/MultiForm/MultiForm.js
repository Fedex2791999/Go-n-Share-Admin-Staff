import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  StepLabel,
  Typography,
  Step,
  Stepper,
} from '@material-ui/core';
import moment from 'moment';
import { getAvailabelCoach, getAvailabelDrivers, createTrip } from 'api/gnsApi';
import GetStep from './GetStep/GetStep';
import { MutiFormProvider } from './store/store';
import { AppContext } from 'store/store';
import { driverList } from 'constraint/driver.const';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    margin: 'auto',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    display: 'flex',
    justifyContent: 'center',
    background: 'white',
    borderTop: '2px solid #eeeeee',
    borderBottom: '2px solid #eeeeee',
    paddingBottom: 20,
    height: 420,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const getSteps = () => {
  return ['Bước 1', 'Bước 2', 'Bước 3'];
};

export default function MultiForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedCoach, setSelectedCoach] = useState('');
  const [focused, setFocused] = useState(false);
  const [availabelCoaches, setAvailabelCoaches] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({
    date: moment(),
  });
  const { routes } = useContext(AppContext).state;
  const getDepartureLocation = (routeId) => {
    return routes.find((route) => route.routeId === parseInt(routeId));
  };

  const handleGetAvailabelCoach = async (selectedShift) => {
    const reqBody = {
      departureDate: formData.date.format('YYYY/MM/DD'),
      shift: parseInt(selectedShift),
      routeId: parseInt(selectedRouteId),
    };
    // setLoadingAvailableCoach(true);
    const coaches = await getAvailabelCoach(reqBody);
    // setLoadingAvailableCoach(false);
    setAvailabelCoaches(coaches);
  };

  const MappingCityData = {
    'Hà Nội': 'HAN',
    'Hồ Chí Minh': 'HCM',
    'Đà Nẵng': 'DAN',
    'Quảng Ninh': 'QAN',
  };

  const handleGetAvailableDrivers = async (e) => {
    setSelectedCoach(e.target.value);
    const routeObject = getDepartureLocation(selectedRouteId);
    const reqBody = {
      location: MappingCityData[`${routeObject.departureLocation}`],
      role: 'fixedTrip',
      departureDate: formData.date.format('YYYY/MM/DD'),
      shift: parseInt(selectedShift),
      drivingDuration: routeObject.drivingDuration,
    };
    const driversId = await getAvailabelDrivers(reqBody);
    const drivers = driversId.map((driverId) => {
      const res = driverList.find((driver) => driver.id === driverId);
      return res;
    });
    setDrivers(drivers);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmitCreateTrip = async () => {
    // setActiveStep(0);
    const reqBody = {
      driverId: parseInt(selectedDriver),
      coachId: parseInt(selectedCoach),
      shift: parseInt(selectedShift),
      departureDate: formData.date.format('YYYY/MM/DD'),
    };
    // setLoadingCreateTrip(true);
    await createTrip(reqBody);
    // setLoadingCreateTrip(false);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              <MutiFormProvider>
                <GetStep
                  stepIndex={activeStep}
                  classes={classes}
                  selectedRouteId={selectedRouteId}
                  setSelectedRouteId={setSelectedRouteId}
                  formData={formData}
                  setFormData={setFormData}
                  focused={focused}
                  setFocused={setFocused}
                  selectedShift={selectedShift}
                  setSelectedShift={setSelectedShift}
                  handleGetAvailabelCoach={handleGetAvailabelCoach}
                  selectedCoach={selectedCoach}
                  handleGetAvailableDrivers={handleGetAvailableDrivers}
                  availabelCoaches={availabelCoaches}
                  selectedDriver={selectedDriver}
                  setSelectedDriver={setSelectedDriver}
                  drivers={drivers}
                />
              </MutiFormProvider>
            </Typography>
            <div
              style={{
                display: 'flex',
                background: 'white',
                justifyContent: 'space-between',
                padding: '9px 80px',
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Quay lại
              </Button>
              {activeStep === 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={!(selectedRouteId && selectedShift)}
                >
                  Tiếp
                </Button>
              )}
              {activeStep === 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={!selectedCoach}
                >
                  Tiếp
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitCreateTrip}
                  disabled={!selectedDriver}
                >
                  Tạo chuyến
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
