import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pitches.css";
import RefereeRateStars from "../components/RefereeRateStars";
import { Roles } from "../RolesEnum";
import axios from "axios";
import { handleAlert } from "../components/handleAlertFunction";
import { Colors } from "../ColorsEnum";

const Pitches = ({ user }) => {
    const navigate = useNavigate();

    const alert = (msg, color) => handleAlert(msg, color);

    const [modal, setModal] = useState(false);

    const [cities, setCities] = useState([]);
    const [filterCity, setFilterCity] = useState("Any");
    const [selectedCity, setSelectedCity] = useState();
    const [priceRange, setPriceRange] = useState([-1, Infinity]);

    useEffect(() => {
        axios.get('http://localhost:8080/system/get-all-cities')
        .then(response => {
            setCities(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the cities!", error);
        });
      }, []);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    }

    const handleModal = () => {
        setModal(c => !c);
        setPitchName(null);
        setPitchPrice(null);
        setSelectedFile(null);
    }

    const [editMode, setEditMode] = useState(false);
    const [sortAsc, setSortAsc] = useState(true); // State to track sorting order
    // const [pitches, setPitches] = useState([
    //     {id: 1, state: "lock", city: "Amman", rate: 4.37, price: 3.5, name: "PLZ1", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 1},
    //     {id: 2, state: "active", city: "Amman", rate: 3.37, price: 3.5, name: "PLZ2", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 1},
    //     {id: 3, state: "active", city: "Amman", rate: 1.37, price: 3.5, name: "PLZ3", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 2},
    //     {id: 4, state: "active", city: "Amman", rate: 2.37, price: 3.5, name: "PLZ4", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 2},
    //     {id: 5, state: "active", city: "Amman", rate: 5,    price: 3.5, name: "PLZ5", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 3},
    //     {id: 6, state: "active", city: "Amman", rate: 0.3,  price: 3.5, name: "PLZ6", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 4}
    // ]);

    // Function to handle sorting
    const handleSort = () => {
        if (pitches.length === 0) return;
        const sortedPitches = [...pitches].sort((a, b) => {
            if (!sortAsc) {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        setSortAsc(!sortAsc); // Toggle sorting order
        setPitches(sortedPitches);
    };

    const [pitches, setPitches] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!isFetched) {
            axios.get('http://localhost:8080/system/get-all-pitches')
                .then(response => {
                    setPitches(response.data);
                    setIsFetched(true);
                    handleSort();
                })
                .catch(error => {
                    console.error("There was an error fetching the pitches!", error);
                    setPitches([]);
            });
        }
    }, [isFetched]);


    const [selectedFile, setSelectedFile] = useState(null);
    const [pitchName, setPitchName] = useState(null);
    const [pitchPrice, setPitchPrice] = useState(null);
    const [pitchAddress, setPitchAddress] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAddPitch = async () => {
        if (selectedFile) {
    
            const formData = new FormData();
            formData.append('username', user.username);
            formData.append('cityName', selectedCity);
            formData.append('pitchName', pitchName);
            formData.append('price', parseFloat(pitchPrice));
            formData.append('address', pitchAddress);
            formData.append('ownershipDocumentation', selectedFile);
    
            try {
                await axios.post('http://localhost:8080/system/add-pitch-requests', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert("Request submitted successfully.", Colors.GREEN);
                
            } catch (error) {
                console.error('Error submitting Add pitch request:', error);
                alert("Faild to send request.", Colors.RED);
            }
            handleModal();
        }
    };

    const handleMinPrice = (e) => {
        const newArray = [...priceRange];

        if (e.target.value)
            newArray[0] = e.target.value;
        else
            newArray[0] = -1;

        setPriceRange(newArray);
    } 
    const handleMaxPrice = (e) => {
        const newArray = [...priceRange];
        if (e.target.value)
            newArray[1] = e.target.value;
        else
            newArray[1] = Infinity;

        setPriceRange(newArray);
    } 

    if (!isFetched) return <>Loading...</>

    return (
        <div className="Pitches">
            {modal && <div className="modall add-match-schedule-modal">
                <div className="background" onClick={handleModal}></div>
                    <div className="modal-box">
                        <h4>Add Pitch</h4>
                        <input required onChange = {(e) => {setPitchName(e.target.value)}} className = "data-input" type="text" placeholder="Name"/>
                        <input required onChange = {(e) => {setPitchPrice(e.target.value)}} className = "data-input" type="number" placeholder="Price"/>
                        <input required onChange = {(e) => {setPitchAddress(e.target.value)}} className = "data-input" type="text" placeholder="Address"/>

                        <label className="city-label" htmlFor="inputState">City</label>
                        <select id="inputState" className="form-control" value={selectedCity} onChange={handleCityChange}>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                        <div>
                            <h6>Ownership Documentation:</h6>
                            <input required type="file" onChange={handleFileChange} />
                            {selectedFile && (
                                <div>
                                <p>Selected Image: {selectedFile.name.substring(0, 14)}</p>
                                </div>
                            )}
                        </div>
                        <div className="modal-btn-holder">
                            <button onClick={handleModal}>Cancel <i className="fa-solid fa-circle-xmark"></i></button>
                            <button onClick={handleAddPitch}>Add <i className="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
            </div>}
            <div className="container">
                <div className="filters_container">
                    <select name="city" id="city" className="city-filter" onChange={(e) => {setFilterCity(e.target.value)}}>
                        <option value="Any" defaultChecked>City - Any</option>
                        {
                            cities.map(city => {
                                return <option value={city.name}>{city.name}</option>
                            })
                        }
                    </select>
                    <button className="rate-sort" onClick={handleSort}>Sort by price {sortAsc ? <i className="fa-solid fa-arrow-down-wide-short"></i> : <i className="fa-solid fa-arrow-up-wide-short"></i>}</button>
                    <input required type="number" placeholder="Min price" className="mid-price-filter" onChange={handleMinPrice}></input>
                    <input required type="number" placeholder="Max price" className="max-price-filter" onChange={handleMaxPrice}></input>
                </div>
                <div className="buttons-holder">
                    {user.role === Roles.PITCH_OWNER && !editMode && 
                    <button className="edit-mode-on" onClick={() => {setEditMode(true)}}>Edit mode <i className="fa-solid fa-hammer"></i></button>}

                    {editMode && 
                    <button className="edit-mode-off" onClick={() => {setEditMode(false)}}>Edit mode <i className="fa-solid fa-door-open"></i></button>}

                    {editMode && 
                    <button className="add-pitch" onClick={handleModal}>Add Pitch <i className="fa-solid fa-plus"></i></button>}
                </div>
                <div className="pitches-list">
                    {pitches
                    .filter(pitch => user.role === Roles.PITCH_OWNER ? true : pitch.state === "active")
                    .filter(pitch => editMode ? pitch.ownerId === user.id : true)
                    .filter(pitch => filterCity === "Any" || filterCity === pitch.city)
                    .filter(pitch => pitch.price >= priceRange[0] && pitch.price <= priceRange[1])
                    .map(pitch => {
                        return <div className="pitch-box-container" key={pitch.id}>
                            <div className="pitch-box">
                                <header>
                                    <div className="pitch-name"><span className="first-letter-of-name">{pitch.name[0]}</span>{pitch.name.substr(1, pitch.name.length)}</div>
                                    <div className="pitch-price">{pitch.price} JD</div>
                                    <RefereeRateStars value={pitch.rate}/>
                                </header>
                                <section className="pitch-button" onClick={() => {if (!editMode) navigate("/pitches/" + pitch.id + "/matches")}}></section>
                                {
                                    !editMode &&
                                    <footer>
                                        <div className="phone-number"><i className="fa-solid fa-phone"></i> {pitch.phoneNumber}</div>
                                        <div className="owner-name"><i className="fa-solid fa-user"></i> {pitch.ownerName}</div>
                                    </footer>
                                }
                                {editMode &&
                                    <div className="pitch-control-buttons-holder">
                                        <button onClick={() => {navigate("/pitches/" + pitch.id + "/schedule")}}>Edit Schedule <i className="fa-regular fa-calendar-days"></i></button>
                                        <button>Edit Name <i className="fa-solid fa-file-signature"></i></button>
                                        <button>Edit Price <i className="fa-solid fa-dollar-sign"></i></button>

                                        
                                        {pitch.state === Roles.ACTIVE && 
                                            <button>Lock <i className="fa-solid fa-lock"></i></button>}

                                        {pitch.state === Roles.LOCK && 
                                            <button>Lock <i className="fa-solid fa-lock-open"></i></button>}
                                        <button className="remove-pitch-button">Remove <i className="fa-solid fa-ban"></i></button>

                                    </div>
                                }
                            </div>
                            <hr />
                        </div>
                    })}
                </div>
                {pitches.length === 0 && <div className="empty-word">No Pitches Yet.</div>}
            </div>
        </div>
    );
};

export default Pitches;
