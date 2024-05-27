import { useEffect, useState } from "react";
import "../styles/home.css"
import axios from "axios";

const Home = () => {

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("search submitted");
    }

    const [cities, setCities] = useState([]);
    useEffect(() => {
        // Fetch data from the backend API
        axios.get('http://localhost:8080/system/get-all-cities')
          .then(response => {
            // Update the state with the received data
            console.log(response.data)
            setCities(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the cities!", error);
          });
      }, []); // Empty dependency array to run the effect only once when the component mounts

      
    const contacts_form_submit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/system/create-contact-us', {
                "firstName": firstName,
                "midName": midName,
                "lastName": lastName,
                "address1": address1,
                "address2": address2,
                "message": message,
                "city": selectedCity
            });

          } catch (error) {
            console.log("Error in sending contact us message");
          }
    }

    // select city
    // Define the list of cities
    const [firstName, setFirstName] = useState();
    const [midName, setMiddleName] = useState();
    const [lastName, setLastName] = useState();
    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();
    const [message, setMessage] = useState();
    const [selectedCity, setSelectedCity] = useState();

    
  
    // State to manage the selected city

    // Function to handle city selection
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div className="Home" id="landing-header">
            <header className="landing_header">
                <div className="container">
                    <div className="search">
                        <div className="search_icon"><i className="fa-solid fa-magnifying-glass"></i></div>
                        <div className="search_bar">
                            <form onSubmit={handleSubmit}>
                                <input type="text" className="search_input" placeholder="Username..."></input>
                                <input type="submit" className="submit"></input>
                            </form>
                        </div>
                    </div>
                    <div className="title_container">
                        {/* <h1 className="title">Kickoff Net</h1> */}
                        <section className="wrapper">
                            <div className="top">Kickoff</div>
                            <div className="bottom" aria-hidden="true">Kickoff</div>
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
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                </div>
                                <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Middle Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Middle Name"
                                    onChange={(e) => setMiddleName(e.target.value)}
                                />
                                </div>
                                <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                    onChange={(e) => setLastName(e.target.value)}
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
                                onChange={(e) => setAddress1(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress2">Address 2</label>
                                <input
                                type="text"
                                className="form-control"
                                id="inputAddress2"
                                placeholder="Apartment, studio, or floor"
                                onChange={(e) => setAddress2(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputMessage">Message</label>
                                <input
                                type="text"
                                className="form-control"
                                id="inputMessage"
                                placeholder="Apartment, studio, or floor"
                                onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputState">City</label>
                                    <select 
                                    id="inputState" 
                                    className="form-control" 
                                    value={selectedCity} 
                                    onChange={handleCityChange}>
                                        {/* <option selected="">City...</option> */}
                                        {cities.map(city => (
                                            <option key={city.id} value={city.name}>{city.name}</option>
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