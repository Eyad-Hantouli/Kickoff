import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/login.css"
import { useState } from "react";
import axios from "axios";
import { handleAlert } from "../components/handleAlertFunction";
import { Colors } from "../Colors";

const Login = ({ setUser }) => {

    const wrongLogin = (msg) => handleAlert(msg, Colors.RED);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          username: username,
          password: password,
        });
  
        // Assuming a successful response contains a status code of 200
        if (response.status === 200) {
          // Store the username in LocalStorage
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setUser(JSON.parse(localStorage.getItem("user")));
        //   window.location.reload();
        }
      } catch (error) {
        setError('Login failed');
        wrongLogin("Username or password isn't correct !");
      }
  }

    const navigate = useNavigate();

    function login_form_submit(event) {
        event.preventDefault();

        handleLogin();
    }

    if (localStorage.getItem("user")) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="Login">
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
                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">
                                            Please enter username and password!
                                        </p>
                                        <form className="contacts_form" onSubmit={login_form_submit}>
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="inputEmail4">Username</label>
                                                    <input required
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Username"
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="inputEmail4">Password</label>
                                                    <input required
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        onChange={(e) => setPassword(e.target.value)}
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
                                                Login
                                            </button>
                                            <br />
                                            <br />
                                        </form>
                                        {/* <p className="small mb-5 pb-lg-2">
                                            <a className="text-white-50" href="#!">
                                            Forgot password?
                                            </a>
                                        </p> */}
                                        <div>
                                            <p className="mb-0">
                                                Don't have an account?{" "}
                                                <span className="navigate text-white-50 fw-bold" 
                                                    onClick={() => {navigate("/register")}}
                                                >
                                                    Sign Up
                                                </span>
                                            </p>
                                        </div>
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

export default Login;