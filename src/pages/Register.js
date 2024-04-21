import { Navigate } from "react-router-dom";
import "../styles/register.css"
import { useState } from "react";

const Register = ({ isLogin }) => {

    const [selectedDate, setSelectedDate] = useState();

    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia']; // from backend

    // State to manage the selected city
    const [selectedCity, setSelectedCity] = useState('');

    // Function to handle city selection
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    function register_form_submit(event) {
        event.preventDefault();

        console.log("register submitted");
    }

    if (isLogin) {
        return <Navigate to="/panel" replace />
    }

    return (
        <div className="Register">
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div
                            className="form-container card text-white"
                            style={{ borderRadius: "1rem" }}
                            >
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                                        <p className="text-white-50 mb-5">
                                            Please enter your data correct!
                                        </p>
                                        <form className="contacts_form" onSubmit={register_form_submit}>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="First Name"
                                                />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Middle Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Middle Name"
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Last Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Last Name"
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Birth of date</label>
                                                    <input
                                                        id="datepicker"
                                                        type="date"
                                                        className="form-control"
                                                        placeholder="Birth of date"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="inputState">City</label>
                                                    <select id="inputState" className="form-control" value={selectedCity} onChange={handleCityChange}>
                                                        {cities.map((city, index) => (
                                                            <option key={index} value={city}>{city}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputAddress">Address</label>
                                                <input
                                                type="text"
                                                className="form-control"
                                                id="inputAddress"
                                                placeholder="1234 Main St"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputAddress2">Address 2</label>
                                                <input
                                                type="text"
                                                className="form-control"
                                                id="inputAddress2"
                                                placeholder="Apartment, studio, or floor"
                                                />
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Username</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Username"
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Phone number</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="Phone number"
                                                    />
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="inputEmail4">Password</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="inputEmail4">Conferm password</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="Conferm password"
                                                    />
                                                </div>
                                            </div>
                                            <br />
                                            <button
                                                data-mdb-button-init=""
                                                data-mdb-ripple-init=""
                                                className="btn btn-outline-light btn-lg px-5"
                                                type="submit"
                                            >
                                                Register
                                            </button>
                                            <br />
                                            <br />
                                        </form>
                                        {/* <p className="small mb-5 pb-lg-2">
                                            <a className="text-white-50" href="#!">
                                            Forgot password?
                                            </a>
                                        </p>
                                        <div>
                                            <p className="mb-0">
                                                Don't have an account?{" "}
                                                <a href="#!" className="text-white-50 fw-bold">
                                                    Sign Up
                                                </a>
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;