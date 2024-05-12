import { useNavigate } from "react-router-dom";
import "../styles/navbar.css"

const Navbar = ({ isLogin, toggleLogin }) => {

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
                    <li className="burger_bars" onClick={show_taps}><i class="fa-solid fa-bars"></i></li>
                    <span className="taps">
                        <li className="home_btn tap" onClick={scroll_to_home}>Home</li>
                        <li className="profile_btn tap" onClick={() => {navigate("/profile/eyad_h")}}>Profile</li>
                        <li className="profile_btn tap">Pitches</li>
                        <li className="leaderboard_btn tap" onClick={() => {navigate("/leaderboard")}}>Leaderboard</li>
                        <li className="contact_us_btn tap" onClick={scroll_to_contacts}>Contact us</li>
                        {
                            isLogin && 
                                <li className="logout_btn tap" onClick={() => {toggleLogin(false)}}>Logout . <i class="fa-solid fa-right-from-bracket"></i></li>
                        }
                    </span>
                </ul>
                <ul className="RHS">
                    {
                        !isLogin && <>
                            <li className="register_btn tap" onClick={() => {navigate("/register")}}>Register</li>
                            <li className="login_btn tap" onClick={() => {navigate("/login")}}>Login</li>
                        </>
                    }

                    {
                        isLogin && <>
                            <li className="notifications_btn">
                                <i class="fa-solid fa-bell"></i>
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