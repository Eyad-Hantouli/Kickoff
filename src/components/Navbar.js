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
                                <li className="logout_btn tap" onClick={() => {localStorage.removeItem('user'); setUser({})}}>Logout . <i className="fa-solid fa-right-from-bracket"></i></li>
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
                                <div className="profile_image"></div>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;