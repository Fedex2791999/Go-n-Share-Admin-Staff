import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { logIn, getUserInfo } from 'api/gnsApi';

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
}));

export default function SignIn() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const reqBody = { username, password };
      setLoading(true);
      const res = await logIn(reqBody);
      if (res) {
        const user = await getUserInfo();
        setLoading(false);
        if (user.role === 'scheduling') {
          history.replace('/staff/dashboard');
        } else if (user.role === 'supervising') {
          history.replace('/admin/dashboard');
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng Nhập
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Tên người dùng"
          name="email"
          autoComplete="username"
          autoFocus
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mật khẩu"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <div style={{ float: 'left', width: '100%' }}>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Nhớ mật khẩu"
          />
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        )}
      </div>
    </Container>
  );
}
