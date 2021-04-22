import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { STAFF_URL } from 'api/environments-prod';
import axios from 'axios';
import { getStaffInfo } from 'api/gnsApi';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`${STAFF_URL}/me`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);
        setUserProfile(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // const getInfo = async () => {
    //   try {
    //     const res = await getStaffInfo();
    //     setUserProfile(res.data.data);
    //     console.log('1', res.data.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // getInfo();
    // console.log('2', userProfile);
  }, []);

  console.log('1', userProfile);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Chỉnh sửa thông tin cá nhân
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <TextField
                    label="Tên người dùng"
                    id="username"
                    // defaultValue={userProfile ? userProfile.username : ''}
                    value={userProfile ? userProfile.username : ''}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    label="Họ và Tên"
                    id="username"
                    // defaultValue={userProfile ? userProfile.fullname : ''}
                    value={userProfile ? userProfile.fullname : ''}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    label="Số điện thoại"
                    id="phone-number"
                    defaultValue={userProfile ? userProfile.phone : ''}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Vai trò"
                    id="phone-number"
                    defaultValue={userProfile ? userProfile.role : ''}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Trạng thái làm việc"
                    id="phone-number"
                    defaultValue={userProfile ? userProfile.workingStatus : ''}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Lưu</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
