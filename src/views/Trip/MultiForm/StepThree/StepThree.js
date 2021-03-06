/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, Select } from '@material-ui/core';

const StepThree = (props) => {
  return (
    <div>
      <div>
        <h3>Lựa chọn tài xế đang rảnh</h3>
        <FormControl variant="outlined" className={props.classes.formControl}>
          <Select
            native
            id="grouped-native-age"
            value={props.selectedDriver}
            onChange={(e) => {
              props.setSelectedDriver(e.target.value);
            }}
          >
            <option
              value=""
              disabled
              style={{ fontWeight: 'bold', display: 'none' }}
            >
              Lựa chọn tài xế
            </option>
            {props.drivers.map((driver, index) => (
              <option value={driver.id} key={index}>
                {`Tài xế: ${driver.fullname} ~ SĐT: ${driver.phone}`}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* {props.loadingCreateTrip ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={props.handleCreateTrip}
        >
          Tạo chuyến
        </Button>
      )} */}
    </div>
  );
};

export default StepThree;
