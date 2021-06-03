import {
  gnsAuthApi,
  gnsStaffApi,
  gnsVehicleApi,
  gnsDriverApi,
  gnsTripApi,
  gnsBookingApi,
  reqConfig,
} from './environments-prod';

export const logIn = async (userInfo) => {
  try {
    const { data } = await gnsAuthApi.post('/staff/login', userInfo, reqConfig);
    localStorage.setItem('token', data.data);
    return data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const logOut = async () => {
  try {
    const { data } = await gnsAuthApi.delete('/staff/logout', reqConfig);
    localStorage.clear();
    return data;
  } catch (err) {
    alert(err.response.data.message);
    return;
  }
};

export const getUserInfo = async () => {
  try {
    const res = await gnsStaffApi.get('staff/me', reqConfig);
    return res.data.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const getTransitDetail = async (transitId) => {
  try {
    const res = await gnsTripApi.get(`/transit/${transitId}`, reqConfig);
    return res.data.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const getTripDetail = async (tripId) => {
  try {
    const res = await gnsTripApi.get(`/trip/${tripId}`, reqConfig);
    return res.data.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const refusedBooking = async (reqBody) => {
  try {
    await gnsBookingApi.post('/booking/verify/', reqBody, reqConfig);
    alert('Từ chối chuyến đi thành công!');
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const createStaff = async (reqBody) => {
  try {
    await gnsAuthApi.post('/staff/create', reqBody, reqConfig);
    alert('Tạo nhân viên thành công');
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const getAllRoutes = async () => {
  try {
    const res = await gnsVehicleApi.get('/coach/routes', reqConfig);
    return res.data.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const getAvailabelCoach = async (reqBody) => {
  try {
    const res = await gnsVehicleApi.post(
      '/coach/available',
      reqBody,
      reqConfig,
    );
    return res.data.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const getAvailabelDrivers = async (reqBody) => {
  try {
    const res = await gnsDriverApi.post(
      '/driver/available-schedule',
      reqBody,
      reqConfig,
    );
    return res.data.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const createTrip = async (reqBody) => {
  try {
    const res = await gnsTripApi.post('/trip', reqBody, reqConfig);
    alert('Tạo chuyến thành công, chuyến đi sẽ được xác nhận bởi tài xế!');
    return res.data.data;
  } catch (err) {
    alert(err.response.data.message);
    alert('Tạo chuyến không thành công, vui lòng kiểm tra lại thông tin!');
  }
};

export const getAllBooking = async () => {
  try {
    const res = await gnsBookingApi.get('/booking', reqConfig);
    return res.data.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const getAllStaff = async () => {
  try {
    const res = await gnsStaffApi.get('/staff', reqConfig);
    return res.data.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const getAllCoaches = async () => {
  try {
    const res = await gnsVehicleApi.get('/coach', reqConfig);
    return res.data.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const getAllDrivers = async () => {
  try {
    const res = await gnsDriverApi.get('/driver', reqConfig);
    return res.data.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};
export const confirmBooking = async (reqBody) => {
  try {
    await gnsBookingApi.post('/booking/verify/', reqBody, reqConfig);
    alert('Xác nhận chuyến đi thành công!');
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const sackStaff = async (staffId) => {
  try {
    await gnsStaffApi.post(`/staff/sacking/${staffId}`);
    alert('Sa thải nhân viên thành công!');
  } catch (err) {
    alert(err.response.data.message);
  }
};
