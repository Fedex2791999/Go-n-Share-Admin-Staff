import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import TableDriver from 'components/TableDriver/TableDriver';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { AppContext } from '../../store/store';
import { MappingRole, MappingWorkingStatus } from '../UserProfile/UserProfile';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

export default function DriverList() {
  const classes = useStyles();
  const { drivers } = useContext(AppContext).state;
  const newlist = drivers.map((driver) => {
    return [
      `${driver.id}`,
      `${driver.fullname}`,
      `${driver?.location?.name}`,
      `${MappingRole[driver.role]}`,
      `${driver?.phone}`,
      `${MappingWorkingStatus[driver.workingStatus]}`,
    ];
  });
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Thông tin Tài Xế</h4>
          </CardHeader>
          <CardBody>
            <TableDriver
              tableHeaderColor="primary"
              tableHead={[
                'Id',
                'Họ tên',
                'Nơi đăng ký làm việc',
                'Vai trò',
                'Số điện thoại',
                'Trang thái làm việc',
              ]}
              tableData={newlist}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
