import axios from 'axios';

export const gnsAuthApi = axios.create({
  baseURL: 'https://www.gns.quangdvn.me/api/auth',
});

export const gnsStaffApi = axios.create({
  baseURL: 'https://www.gns.quangdvn.me/api/staff',
});

export const logIn = async (userInfo) => {
  try {
    const reqConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { data } = await gnsAuthApi.post('/staff/login', userInfo, reqConfig);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getStaffInfo = async () => {
  try {
    const reqConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const res = await gnsStaffApi.get('/me', reqConfig);
    return res;
  } catch (err) {
    console.log(err.message);
  }
};
