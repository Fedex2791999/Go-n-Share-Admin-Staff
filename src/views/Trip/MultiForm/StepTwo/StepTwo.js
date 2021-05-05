/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, Select } from '@material-ui/core';

const StepTwo = (props) => {
  return (
    <div>
      <h3>Lựa chọn Xe Khách đang rảnh</h3>
      <FormControl variant="outlined" className={props.classes.formControl}>
        <Select
          native
          id="grouped-native-age"
          value={props.selectedCoach}
          onChange={props.handleGetAvailableDrivers}
          label="Age"
        >
          <option
            value=""
            disabled
            style={{ fontWeight: 'bold', display: 'none' }}
          >
            Lựa chọn xe khách
          </option>
          {props.availabelCoaches.map((coach, index) => (
            <option value={coach.id} key={index}>
              Xe số: {coach.id} {'-'} Biển số: {coach.numberPlate}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default StepTwo;
