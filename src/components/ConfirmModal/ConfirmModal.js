/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sackStaff, getAllStaff } from 'api/gnsApi';
import { AppContext } from '../../store/store';

export default function ConFirmModal({
  staffId,
  openConFirmModal,
  setOpenConfirmModal,
}) {
  const { dispatch } = useContext(AppContext);
  const handleClose = () => {
    setOpenConfirmModal(false);
  };

  const handleSackStaff = async () => {
    const res = await sackStaff(staffId);
    if (res) {
      const staffList = await getAllStaff();
      dispatch({ type: 'get-staff', payload: staffList });
    }
    handleClose();
  };
  return (
    <Dialog
      open={openConFirmModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{' Cảnh báo'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bán có chắc chắn muốn sa thải nhân viên này?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Từ chối
        </Button>
        <Button onClick={handleSackStaff} color="primary" autoFocus>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
}
