import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ user }) => {

    return user.admin ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default AdminRoute