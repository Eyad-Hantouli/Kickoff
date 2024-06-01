import { Navigate, useNavigate } from "react-router-dom";
import "../styles/register.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { handleAlert } from "../components/handleAlertFunction";
import { Colors } from "../ColorsEnum";

const Register = () => {

    const wrongPasswordConfermAlert = (msg) => handleAlert(msg, Colors.RED);
    const userTakenAlert = (msg) => handleAlert(msg, Colors.Yellow);

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState();

    const [cities, setCities] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("user") && !isFetched) {
          axios.get('http://localhost:8080/system/get-all-cities')
            .then(response => {
              setCities(response.data);
              setIsFetched(true);
            })
            .catch(error => {
              console.error("There was an error fetching the cities!", error);
            });
        }
      }, [isFetched]);

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [midName, setMidName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confermPassword, setConfermPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [idCardOne, setIdCardOne] = useState('');
    const [idCardTwo, setIdCardTwo] = useState('');

    // State to manage the selected city
    const [selectedCity, setSelectedCity] = useState('');

    // Function to handle city selection
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    if (localStorage.getItem("user")) {
        return <Navigate to="/" replace />
    }


    const handleRegister = async () => {
        try {
          const response = await axios.post('http://localhost:8080/register', {
                "username" : username,
                "firstName" : firstName,
                "midName" : midName, 
                "lastName" : lastName,
                "dob" : dob ,
                "address" : address , 
                "password" : password,
                "phoneNumber" : phoneNumber ,
                "idCardOne" : idCardOne ,
                "idCardTwo" : idCardTwo,
                "city": selectedCity
            });
          
          if ((response.status === 200 || response.status === 201) && response.data.token !== null) {
            navigate("/login");
          }
          else {
            if (response.data.message) {
                userTakenAlert("Username already exist, try another one please.");
            }
            else {
                wrongPasswordConfermAlert("Regesteration faild !");
            }
          }
        } catch (error) {
            wrongPasswordConfermAlert("Registration error !");
            console.error('Registration error:', error);
        }
      };

    function register_form_submit(event) {
        event.preventDefault();

        if (confermPassword !== password)  {
            wrongPasswordConfermAlert("Password doesnt match the Conferm password !");
            return;
        }

        handleRegister();
    }

    console.log(dob);

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
                                                <input required
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="First Name"
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Middle Name</label>
                                                    <input required
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Middle Name"
                                                        onChange={(e) => setMidName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Last Name</label>
                                                    <input required
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Last Name"
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Birth of date</label>
                                                    <input required
                                                        id="datepicker"
                                                        type="date"
                                                        className="form-control"
                                                        placeholder="Birth of date"
                                                        onChange={(e) => setDob(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="inputState">City</label>
                                                    <select id="inputState" className="form-control" value={selectedCity} onChange={handleCityChange}>
                                                        {cities.map((city) => (
                                                            <option key={city.id} value={city.name}>{city.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputAddress">Address</label>
                                                <input required
                                                type="text"
                                                className="form-control"
                                                id="inputAddress"
                                                placeholder="1234 Main St"
                                                onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Username</label>
                                                    <input required
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Username"
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Phone number</label>
                                                    <input required
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="Phone number"
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="inputEmail4">Password</label>
                                                    <input required
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="inputEmail4">Conferm password</label>
                                                    <input required
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Conferm password"
                                                        onChange={(e) => setConfermPassword(e.target.value)}
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