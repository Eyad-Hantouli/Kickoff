import { Navigate, Outlet } from "react-router-dom";

const UserRoute = ({ isLogin }) => {

    return isLogin ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default UserRoute