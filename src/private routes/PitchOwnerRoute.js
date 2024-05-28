import { Navigate, Outlet } from "react-router-dom";
import { Roles } from "../Roles";

const PitchOwnerRoute = ({ user }) => {

    return user.role === Roles.PITCH_OWNER ? (
        <Outlet />
    ) : (
        <Navigate to="/pitches" replace />
    );
};

export default PitchOwnerRoute