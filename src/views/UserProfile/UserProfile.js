import React, { useContext } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { AppContext } from 'store/store';

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

export const MappingRole = {
  scheduling: 'Nhân viên quản lý',
  supervising: 'Chủ hợp tác xã',
  tracking: 'Nhân viên giám sát',
  transitTrip: 'Tài xế yêu cầu',
  fixedTrip: 'Tài xế cố định',
};

export const MappingShift = {
  7: 'Ca sáng',
  14: 'Ca chiều',
  20: 'Ca tối',
};

export const MappingWorkingStatus = {
  working: 'Đang làm việc',
  resign: 'Đã nghỉ hưu',
};

export default function UserProfile() {
  const { userInfo } = useContext(AppContext).state;
  const classes = useStyles();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thông tin cá nhân</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <TextField
                    label="Tên người dùng"
                    id="username"
                    value={userInfo ? userInfo.username : ''}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    label="Họ và Tên"
                    id="username"
                    value={userInfo ? userInfo.fullname : ''}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <TextField
                    label="Số điện thoại"
                    id="phone-number"
                    value={userInfo ? userInfo.phone : ''}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    label="Vai trò"
                    id="role"
                    value={userInfo ? MappingRole[`${userInfo.role}`] : ''}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Trạng thái làm việc"
                    id="workingStatus"
                    value={
                      userInfo
                        ? MappingWorkingStatus[`${userInfo.workingStatus}`]
                        : ''
                    }
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            {/* <CardFooter>
              <Button color="primary">Lưu</Button>
            </CardFooter> */}
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
