import Person from "@material-ui/icons/Person";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Statistic from "views/Statistic/Statistic.js";
import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Biểu đồ",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Thông tin cá nhân",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/staff/view",
    name: "Danh sách Nhân Viên",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/statistic",
    name: "Thống kê",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Statistic,
    layout: "/admin",
  },
];

export default dashboardRoutes;
