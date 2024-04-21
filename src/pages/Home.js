import { useState } from "react";
import "../styles/home.css"

const Home = () => {

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("search submitted");
    }

    const contacts_form_submit = (event) => {
        event.preventDefault();

        console.log("contacts submitted");
    }

    // select city
    // Define the list of cities
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia']; // from backend

    // State to manage the selected city
    const [selectedCity, setSelectedCity] = useState('');

    // Function to handle city selection
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div className="Home" id="landing-header">
            <header className="landing_header">
                <div className="container">
                    <div className="search">
                        <div className="search_icon"><i class="fa-solid fa-magnifying-glass"></i></div>
                        <div className="search_bar">
                            <form onSubmit={handleSubmit}>
                                <input type="text" className="search_input" placeholder="Username..."></input>
                                <input type="submit" className="submit"></input>
                            </form>
                        </div>
                    </div>
                    <div className="title_container">
                        {/* <h1 className="title">Kickoff Net</h1> */}
                        <section class="wrapper">
                            <div class="top">Kickoff</div>
                            <div class="bottom" aria-hidden="true">Kickoff</div>
                        </section>
                        <h3 className="subtitle">Network</h3>
                    </div>
                </div>
            </header>
            <section className="sections_holder" id = "contacts">
                {/* <section className="section section1">
                
                </section>
                <section className="section section2">
                
                </section>
                <section className="section section3">
                
                </section> */}

                <div className="container contacts_container">
                    <div className="contacts_form_container">
                        <h3 className="contact-title">Contact Us</h3>

                        <form onClick={contacts_form_submit} className="contacts_form">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                />
                                </div>
                                <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Middle Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Middle Name"
                                />
                                </div>
                                <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                />
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
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputState">City</label>
                                    <select id="inputState" className="form-control" value={selectedCity} onChange={handleCityChange}>
                                        {/* <option selected="">City...</option> */}
                                        {cities.map((city, index) => (
                                            <option key={index} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                            </div>
                            <button type="submit" className="btn submit_btn">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <footer className="footer">
                <div className="container">
                    &copy; Kickoff Net Team - Yarmouk University
                </div>
            </footer>
            
        </div>
    );
};

export default Home;