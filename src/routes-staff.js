import Person from '@material-ui/icons/Person';
import UserProfile from 'views/UserProfile/UserProfile.js';
import Booking from 'views/Booking/Booking';
import Trip from 'views/Trip/Trip';
import Dashboard from '@material-ui/icons/Dashboard';
import DashboardStaffPage from 'views/Dashboard/DashboardStaff';

const staffRoutes = [
  {
    path: '/dashboard',
    name: 'Thống kê',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardStaffPage,
    layout: '/staff',
  },
  {
    path: '/profile',
    name: 'Thông tin cá nhân',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: UserProfile,
    layout: '/staff',
  },
  {
    path: '/trip/create',
    name: 'Tạo chuyến',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Trip,
    layout: '/staff',
  },
  {
    path: '/booking/unconfirm',
    name: 'Vé chưa được xác nhận',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: Booking,
    layout: '/staff',
  },
];

export default staffRoutes;
