import BusinessIcon from "@material-ui/icons/Business";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ReportIcon from "@material-ui/icons/Report";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import PeopleIcon from '@material-ui/icons/People';
import { authRoles } from "../../helpers/authRoles";
import SigninPage from "../../containers/login_page/Login";
import Register from "../../containers/login_page/Register"
import NotFound from "../../containers/not_found/NotFound"
// import UnderConstruction from "../under_construction/UnderConstruction"
export const Routes = [
  {
    accordion: true,
    display: true,
    name: "Admin",
    icon: BusinessIcon,
    components: [
      {
        name: "Users Management",
        icon: SupervisorAccountIcon,
        usersCanSee: authRoles.admin,
        path: "/userManagement",
        component: NotFound,
      },
      {
        name: "Admins Management",
        icon: ControlPointIcon,
        usersCanSee: authRoles.admin,
        path: "/adminManagement",
        component: NotFound,
      },
    ],
  },
  {
    accordion: false,
    display: false,
    name: "My Profile",
    icon: SupervisorAccountIcon,
    components: [
      {
        name: "My Profile",
        icon: SupervisorAccountIcon,
        usersCanSee: authRoles.all,
        path: "/myProfile",
        component: NotFound,
      },
    ],
  },
  {
    accordion: false,
    display: true,
    name: "Chats",
    icon: PeopleIcon,
    components: [
      {
        name: "Chats",
        icon: PeopleIcon,
        usersCanSee: authRoles.all,
        path: "/",
        component: NotFound,
      },
    ],
  },
  {
    accordion: false,
    display: false,
    name: "Login",
    icon: ReportIcon,
    components: [
      {
        name: "Login",
        icon: ReportIcon,
        usersCanSee: authRoles.only_guest,
        path: "/auth",
        component: SigninPage,
      },
    ],
  },
  {
    accordion: false,
    display: false,
    name: "Register",
    icon: ReportIcon,
    components: [
      {
        name: "Login",
        icon: ReportIcon,
        usersCanSee: authRoles.only_guest,
        path: "/register",
        component: Register,
      },
    ],
  },
  {
    accordion: false,
    display: false,
    name: "Not Found",
    icon: ReportIcon,
    components: [
      {
        name: "Not Found",
        icon: ReportIcon,
        usersCanSee: authRoles.all,
        path: "*",
        component: NotFound,
      },
    ],
  },
];
