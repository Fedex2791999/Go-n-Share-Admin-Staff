/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { createContext, useReducer } from 'react';

const initialGlobalState = {
  routes: [],
  userInfo: {},
  bookings: [],
  staffList: [],
  drivers: [],
  coaches: [],
};

const AppContext = createContext(initialGlobalState);
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'get-profile': {
        return {
          ...state,
          userInfo: action.payload,
        };
      }

      case 'get-routes': {
        return {
          ...state,
          routes: action.payload,
        };
      }
      case 'get-booking': {
        return {
          ...state,
          bookings: action.payload,
        };
      }

      case 'get-staff': {
        return {
          ...state,
          staffList: action.payload,
        };
      }

      case 'get-driver': {
        return {
          ...state,
          drivers: action.payload,
        };
      }

      case 'get-coaches': {
        return {
          ...state,
          coaches: action.payload,
        };
      }

      case 'reset-state': {
        return initialGlobalState;
      }

      default:
        throw new Error();
    }
  }, initialGlobalState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
