import "../styles/navbar.css"

const Navbar = ({ isLogin, toggleLogin }) => {

    function show_taps() {
        const item = document.querySelector(".Navbar .container .LHS .taps");
        item.classList.toggle("showen");
    }

    return (
        <div className="Navbar">
            <div className="container">
                <ul className="LHS">
                    <li className="burger_bars" onClick={show_taps}><i class="fa-solid fa-bars"></i></li>
                    <span className="taps">
                        <li className="home_btn tap">Home</li>
                        <li className="profile_btn tap">Profile</li>
                        <li className="leaderboard_btn tap">Leaderboard</li>
                        <li className="contact_us_btn tap">Contact us</li>
                        {
                            isLogin && 
                                <li className="logout_btn tap" onClick={() => {toggleLogin(false)}}>Logout . <i class="fa-solid fa-right-from-bracket"></i></li>
                        }
                    </span>
                </ul>
                <ul className="RHS">
                    {
                        !isLogin && <>
                            <li className="register_btn tap" onClick={() => {toggleLogin(true)}}>Register</li>
                            <li className="login_btn tap" onClick={() => {toggleLogin(true)}}>Login</li>
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