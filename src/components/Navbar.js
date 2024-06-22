import { useNavigate } from "react-router-dom";
import "../styles/navbar.css"
import { Roles } from "../RolesEnum";

const Navbar = ({ user, setUser }) => {

    const navigate = useNavigate();

    function show_taps() {
        const item = document.querySelector(".Navbar .container .LHS .taps");
        item.classList.toggle("showen");
    }

    function scroll_to_home () {
        navigate("/");
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
        }, 100)
    }

    function scroll_to_contacts () {
        navigate("/");
        setTimeout(() => {
            window.location.href = "#contacts";
        }, 100)
    }

    const defaultProfileImage = "data:image/png;base64,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";

    return (
    <div className="Navbar">
            <div className="container">
                <ul className="LHS">
                    <li className="burger_bars" onClick={show_taps}><i className="fa-solid fa-bars"></i></li>
                    <span className="taps">
                        <li className="home_btn tap" onClick={scroll_to_home}>Home</li>
                        <li className="profile_btn tap" onClick={() => {navigate("/profile/" + user.username)}}>Profile</li>
                        <li className="profile_btn tap" onClick={() => {navigate("/pitches")}}>Pitches</li>
                        <li className="leaderboard_btn tap" onClick={() => {navigate("/leaderboard")}}>Leaderboard</li>
                        <li className="contact_us_btn tap" onClick={scroll_to_contacts}>Contact us</li>
                        {
                            (user.role === Roles.ADMIN || user.role === Roles.SUPER_ADMIN) &&
                                <li className="admin_panel_btn tap" onClick={() => {navigate("/admin-panel")}}>Admin Panel</li>
                        }
                        {
                            user.login && 
                                <li className="logout_btn tap" onClick={() => {localStorage.removeItem('username'); setUser({})}}>Logout . <i className="fa-solid fa-right-from-bracket"></i></li>
                        }
                    </span>
                </ul>
                <ul className="RHS">
                    {
                        !user.login && <>
                            <li className="register_btn tap" onClick={() => {navigate("/register")}}>Register</li>
                            <li className="login_btn tap" onClick={() => {navigate("/login")}}>Login</li>
                        </>
                    }

                    {
                        user.login && <>
                            <li className="notifications_btn">
                                <i className="fa-solid fa-bell"></i>
                            </li>
                            <li className="profile_image_btn">
                                <div className="profile_image" style={{backgroundImage: `url(${user.profileImage.length > 0 ? "data:image/jpeg;base64,"+user.profileImage : defaultProfileImage})`}}></div>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;