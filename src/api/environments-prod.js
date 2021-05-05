import axios from 'axios';

export const gnsAuthApi = axios.create({
  baseURL: 'https://www.gns.quangdvn.me/api/auth',
});

export const gnsStaffApi = axios.create({
  baseURL: 'https://www.gns.quangdvn.me/api/staff',
});

export const gnsVehicleApi = axios.create({
  baseURL: 'https://www.gns.quangdvn.me/api/vehicle',
});

export const gnsDriverApi = axios.create({
  baseURL: 'https://www.gns.quangdvn.me/api/driver',
});

export const gnsTripApi = axios.create({
  baseURL: 'https://www.gns.quangdvn.me/api/trip',
});

export const gnsBookingApi = axios.create({
  baseURL: 'https://www.gns.quangdvn.me/api/booking',
});

export const reqConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};
