import "../styles/alert.css";

const Alert = () => {

    const handleClose = () => {
        document.getElementById("custom-alert").style.display = "none";
    }

    return (
        <div className="Alert container" id = "custom-alert">
            <div className="alert-inner container">
                <div className="LHS">
                    <p className="message"><i className="fa-solid fa-triangle-exclamation"></i> <span id = "custom-alert-message">.</span></p>
                </div>
                <div className="RHS">
                    <div>
                        <i className="fa-solid fa-xmark" onClick={handleClose}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;
