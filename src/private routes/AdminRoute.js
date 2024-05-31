import { Navigate, Outlet } from "react-router-dom";
import { Roles } from "../RolesEnum";

const AdminRoute = ({ user }) => {

    return (user.role === Roles.ADMIN || user.role === Roles.SUPER_ADMIN) ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default AdminRoute