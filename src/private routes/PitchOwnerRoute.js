import { Navigate, Outlet } from "react-router-dom";

const PitchOwnerRoute = ({ user }) => {

    return user.pitchOwner ? (
        <Outlet />
    ) : (
        <Navigate to="/pitches" replace />
    );
};

export default PitchOwnerRoute