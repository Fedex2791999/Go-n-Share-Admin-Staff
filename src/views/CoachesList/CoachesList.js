import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { AppContext } from '../../store/store';

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

export default function CoachesList() {
  const classes = useStyles();
  const { coaches } = useContext(AppContext).state;
  const newlist = coaches.map((coach) => {
    return [
      `${coach.id}`,
      `${coach.numberPlate}`,
      `${coach.phone}`,
      `${coach?.route?.departureId} -> ${coach?.route?.arriveId}`,
      `${coach?.route?.basePrice}`,
      `${coach?.route?.drivingDuration}`,
    ];
  });
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Thông tin Nhân Viên</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                'Id',
                'Biển Số',
                'Chăng cố định từ',
                'Giá',
                'Thời gian di chuyển',
              ]}
              tableData={newlist}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
