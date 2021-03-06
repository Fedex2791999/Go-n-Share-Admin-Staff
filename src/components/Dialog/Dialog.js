import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { TextField, Select } from 'formik-material-ui';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { Formik, Form, Field } from 'formik';
import { createStaff, getAllStaff } from 'api/gnsApi';
import { AppContext } from '../../store/store';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: 16,
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { dispatch } = useContext(AppContext);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    const res = await createStaff(values);
    if (res) {
      const staffList = await getAllStaff();
      dispatch({ type: 'get-staff', payload: staffList });
    }
    handleClose();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '88%' }}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Th??m nh??n vi??n
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Th??m nh??n vi??n
        </DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              fullname: '',
              username: '',
              password: '',
              phone: '',
              role: '',
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <Container component="main" maxWidth="xs">
                <div>
                  <Field
                    component={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="fullname"
                    label="H??? v?? t??n"
                    name="fullname"
                    autoComplete="fullname"
                    autoFocus
                    minLength={10}
                    maxLength={50}
                  />
                  <div style={{ display: 'flex' }}>
                    <Field
                      component={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="phone"
                      label="S??? ??i???n tho???i"
                      id="phone"
                      autoComplete="phone"
                    />
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-dialog-native">
                        Vai tr??
                      </InputLabel>
                      <Field
                        component={Select}
                        name="role"
                        autoWidth
                        native
                        input={<Input id="demo-dialog-native" />}
                        labelWidth={3}
                      >
                        <option
                          aria-label="None"
                          value=""
                          style={{ display: 'none' }}
                        />
                        <option value="tracking">Theo d??i</option>
                        <option value="scheduling">L???p l???ch</option>
                      </Field>
                    </FormControl>
                  </div>

                  <Field
                    component={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="T??n ng?????i d??ng"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                  <Field
                    component={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="M???t kh???u"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    minLength={6}
                  />
                </div>
                <div style={{ float: 'right' }}>
                  <Button
                    type="submit"
                    fullWidt
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Th??m
                  </Button>
                </div>
              </Container>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
