import Person from '@material-ui/icons/Person';
import UserProfile from 'views/UserProfile/UserProfile.js';
import StaffList from 'views/TableList/TableList';
import DriverList from 'views/DriverList/DriverList';
import CoachesList from 'views/CoachesList/CoachesList';
import Dashboard from '@material-ui/icons/Dashboard';
import DashboardPage from 'views/Dashboard/Dashboard.js';

const adminRoutes = [
  {
    path: '/dashboard',
    name: 'Thống kê',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/profile',
    name: 'Thông tin cá nhân',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/staff/view',
    name: 'Danh sách Nhân Viên',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: StaffList,
    layout: '/admin',
  },
  {
    path: '/driver/view',
    name: 'Danh sách Tài Xế',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: DriverList,
    layout: '/admin',
  },
  {
    path: '/coaches/view',
    name: 'Danh sách Xe Khách',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: CoachesList,
    layout: '/admin',
  },
];

export default adminRoutes;
