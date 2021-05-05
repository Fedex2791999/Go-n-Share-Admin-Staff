/* eslint-disable react/prop-types */
import React from 'react';
import StepOne from '../StepOne/StepOne';
import StepTwo from '../StepTwo/StepTwo';
import StepThree from '../StepThree/StepThree';

export default function GetStep(props) {
  if (props.stepIndex === 0) {
    return (
      <StepOne
        classes={props.classes}
        selectedRouteId={props.selectedRouteId}
        setSelectedRouteId={props.setSelectedRouteId}
        formData={props.formData}
        setFormData={props.setFormData}
        focused={props.focused}
        setFocused={props.setFocused}
        selectedShift={props.selectedShift}
        setSelectedShift={props.setSelectedShift}
        handleGetAvailabelCoach={props.handleGetAvailabelCoach}
      />
    );
  }
  if (props.stepIndex === 1) {
    return (
      <StepTwo
        classes={props.classes}
        selectedCoach={props.selectedCoach}
        handleGetAvailableDrivers={props.handleGetAvailableDrivers}
        availabelCoaches={props.availabelCoaches}
      />
    );
  }
  if (props.stepIndex === 2) {
    return (
      <StepThree
        classes={props.classes}
        selectedDriver={props.selectedDriver}
        setSelectedDriver={props.setSelectedDriver}
        drivers={props.drivers}
      />
    );
  }
  return <div />;
}
