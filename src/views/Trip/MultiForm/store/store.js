/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { createContext, useReducer } from 'react';

const initialMutilFormState = {
  name: 'Bui Quang Huy',
  age: 22,
};

const MutiFormContext = createContext(initialMutilFormState);
const MutiFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'change-name':
        return {
          ...state,
          name: 'Bui Quang Quang',
        };
      case 'change-age':
        return {
          ...state,
          age: 30,
        };
      default:
        throw new Error();
    }
  }, initialMutilFormState);

  return (
    <MutiFormContext.Provider value={{ state, dispatch }}>
      {children}
    </MutiFormContext.Provider>
  );
};

export { MutiFormContext, MutiFormProvider };
