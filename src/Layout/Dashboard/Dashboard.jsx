import { CiViewList } from "react-icons/ci";
import { FaEdit, FaHome } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
const Dashboard = () => {

    return (
        <div className="flex flex-col md:flex-row">
            <div className="drawer md:w-[25%] lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mt-10 md:mt-0 flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn bg-base-content text-white drawer-button lg:hidden">Open Menus</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li>
                            <NavLink to="/dashboard/missions">
                                <CiViewList className="text-2xl"></CiViewList>
                                Available Missions</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/addSurvey">
                                <IoMdAddCircleOutline className="text-2xl"></IoMdAddCircleOutline>
                                Add Survey</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/editSurvey">
                                <FaEdit className="text-2xl"></FaEdit>
                                Edits Surveys</NavLink>
                        </li>

                        {/* shared nav links */}
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome className="text-2xl"></FaHome>
                                Home</NavLink>
                        </li>
                    </ul>

                </div>
            </div>
            <div className="p-8 md:w-[75%]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;