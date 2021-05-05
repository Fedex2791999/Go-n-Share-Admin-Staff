/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { FormControl, Select } from '@material-ui/core';
import { SingleDatePicker } from 'react-dates';
import { AppContext } from 'store/store';

const StepOne = (props) => {
  const { routes } = useContext(AppContext).state;
  return (
    <div>
      <div>
        <h3>Lựa chọn chặng đi</h3>
        <FormControl variant="outlined" className={props.classes.formControl}>
          <Select
            native
            id="grouped-native-age"
            value={props.selectedRouteId}
            onChange={(e) => {
              props.setSelectedRouteId(e.target.value);
            }}
          >
            <option
              value=""
              disabled
              style={{ fontWeight: 'bold', display: 'none' }}
            >
              Lựa chọn chặng
            </option>
            {routes.map((route, index) => (
              <option value={route.routeId} key={index}>
                Bến xe {route.departureTerminal} -&gt; Bến xe{' '}
                {route.arriveTerminal}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <h3>Lựa chọn ngày xuất phát</h3>
        <div>
          <SingleDatePicker
            date={props.formData.date}
            onDateChange={(date) => {
              props.setFormData({
                ...props.formData,
                date,
              });
            }}
            focused={props.focused}
            // eslint-disable-next-line no-shadow
            onFocusChange={({ focused }) => props.setFocused(focused)}
            numberOfMonths={1}
            id="single_date"
            small
            showDefaultInputIcon
            inputIconPosition="after"
          />
        </div>
      </div>
      <div>
        <h3>Lựa chọn ca xuất phát</h3>
        <FormControl variant="outlined" className={props.classes.formControl}>
          <Select
            native
            id="grouped-native-age"
            value={props.selectedShift}
            onChange={(e) => {
              props.handleGetAvailabelCoach(e.target.value);
              props.setSelectedShift(e.target.value);
            }}
            label="shift"
          >
            <option
              value=""
              disabled
              style={{ fontWeight: 'bold', display: 'none' }}
            >
              Lựa chọn ca
            </option>
            <option value={7}>Ca Sáng</option>
            <option value={14}>Ca Chiều</option>
            <option value={20}>Ca Tối</option>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default StepOne;
