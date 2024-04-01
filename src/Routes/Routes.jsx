import {
    createBrowserRouter
} from "react-router-dom";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Main from "../Layout/MainLayout/Main";
import AddSurvey from "../Pages/DashBoard/AddSurvey/AddSurvey";
import EditSurvey from "../Pages/DashBoard/EditSurvey/EditSurvey";
import Missions from "../Pages/DashBoard/Missions/Missions";
import UpdateSurvey from "../Pages/DashBoard/UpdateSurvey/UpdateSurvey";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: 'dashboard',
        errorElement: <ErrorPage></ErrorPage>,
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                path: 'missions',
                element: <Missions></Missions>
            },
            {
                path: 'addSurvey',
                element: <AddSurvey></AddSurvey>
            },
            {
                path: 'editSurvey',
                element: <EditSurvey></EditSurvey>
            },
            {
                path: 'updateSurvey/:id',
                element: <UpdateSurvey></UpdateSurvey>
            }
        ]
    }
]);
export default router