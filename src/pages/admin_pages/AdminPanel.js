import { useNavigate } from "react-router-dom";
import "../../styles/admin_panel.css";

const AdminPanel = () => {
    const navigate = useNavigate();
    
    return (
        <div className="AdminPanel">
            <div className="container">
                <h3>Requests</h3>
                <div className="requests roww">
                    <div className="account-upgrade-request icon" onClick={() => {navigate("/admin-panel/upgrade-account-requests")}}>
                        <i className="fa-solid fa-user-shield"></i>
                        <p>Upgrade Account</p>
                    </div>
                    <div className="add-pitch-request icon" onClick={() => {navigate("/admin-panel/add-pitch-requests")}}>
                        <i className="fa-solid fa-file-invoice"></i>
                        <p>Add Pitch</p>
                    </div>
                </div>
                <h3>Lists</h3>
                <div className="lists roww">
                    <div className="ban_list icon" onClick={() => {navigate("/admin-panel/ban-list")}}>
                        <i className="fa-solid fa-user-slash"></i>
                        <p>Ban List</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
