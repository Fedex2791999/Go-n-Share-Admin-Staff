/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Dialog from '../Dialog/Dialog';
import ConFirmModal from '../ConfirmModal/ConfirmModal';
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function TableDriver(props) {
  const classes = useStyles();
  const [openConFirmModal, setOpenConfirmModal] = useState(false);
  const [staffId, setStaffId] = useState('');
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      {props.addStaff && <Dialog />}
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow} hover>
                {prop.map((data, key) => (
                  <TableCell className={classes.tableCell} key={key}>
                    <Link to={`/admin/driver/view/${prop[0]}`}>{data}</Link>
                  </TableCell>
                ))}

                {prop[4] === 'Đang làm việc' && (
                  <div
                    style={{
                      position: 'relative',
                      right: 118,
                      top: 6,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={() => {
                        setStaffId(prop[0]);
                        setOpenConfirmModal(true);
                      }}
                    >
                      Sa thải
                    </Button>
                  </div>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {openConFirmModal && (
        <ConFirmModal
          staffId={staffId}
          openConFirmModal={openConFirmModal}
          setOpenConfirmModal={setOpenConfirmModal}
        />
      )}
    </div>
  );
}

TableDriver.defaultProps = {
  tableHeaderColor: 'gray',
};

TableDriver.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
