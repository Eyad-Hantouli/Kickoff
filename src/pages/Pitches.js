import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pitches.css";
import RefereeRateStars from "../components/RefereeRateStars";

const Pitches = ({ user }) => {
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(c => !c);
        setPitchName(null);
        setPitchPrice(null);
        setSelectedFile(null);
    }

    const [editMode, setEditMode] = useState(false);
    const [sortAsc, setSortAsc] = useState(true); // State to track sorting order
    const [pitches, setPitches] = useState([
        {id: 1, state: "lock", city: "Amman", rate: 4.37, price: 3.5, name: "PLZ1", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 1},
        {id: 2, state: "active", city: "Amman", rate: 3.37, price: 3.5, name: "PLZ2", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 1},
        {id: 3, state: "active", city: "Amman", rate: 1.37, price: 3.5, name: "PLZ3", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 2},
        {id: 4, state: "active", city: "Amman", rate: 2.37, price: 3.5, name: "PLZ4", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 2},
        {id: 5, state: "active", city: "Amman", rate: 5,    price: 3.5, name: "PLZ5", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 3},
        {id: 6, state: "active", city: "Amman", rate: 0.3,  price: 3.5, name: "PLZ6", phoneNumber: "078822****", ownerName: "Eyad Hntouli", ownerId: 4}
    ]);

    // Function to handle sorting
    const handleSort = () => {
        const sortedPitches = [...pitches].sort((a, b) => {
            if (!sortAsc) {
                return a.rate - b.rate;
            } else {
                return b.rate - a.rate;
            }
        });
        setSortAsc(!sortAsc); // Toggle sorting order
        setPitches(sortedPitches);
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [pitchName, setPitchName] = useState(null);
    const [pitchPrice, setPitchPrice] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAddPitch = () => {
        if (selectedFile && pitchName && pitchPrice)
            console.log("Pitch Added: " + selectedFile.name + " | Name: " + pitchName + " | Price: " + pitchPrice);
        handleModal();
    }

    return (
        <div className="Pitches">
            {modal && <div className="modall add-match-schedule-modal">
                <div className="background" onClick={handleModal}></div>
                    <div className="modal-box">
                        <h4>Add Pitch</h4>
                        <input onChange = {(e) => {setPitchName(e.target.value)}} className = "data-input" type="text" placeholder="Name"/>
                        <input onChange = {(e) => {setPitchPrice(e.target.value)}} className = "data-input" type="number" placeholder="Price"/>
                        <div>
                            <h6>Ownership Documentation:</h6>
                            <input type="file" onChange={handleFileChange} />
                            {selectedFile && (
                                <div>
                                <p>Selected Image: {selectedFile.name.substring(0, 14)}</p>
                                </div>
                            )}
                        </div>
                        <div className="modal-btn-holder">
                            <button onClick={handleModal}>Cancel <i class="fa-solid fa-circle-xmark"></i></button>
                            <button onClick={handleAddPitch}>Add <i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
            </div>}
            <div className="container">
                <div className="filters_container">
                    <select name="city" id="city" className="city-filter">
                        <option value="City" defaultChecked>City</option>
                        <option value="Amman">Amman</option>
                        <option value="Jerrash">Jerrash</option>
                        <option value="Irbid">Irbid</option>
                    </select>
                    <button className="rate-sort" onClick={handleSort}>Sort by rate {sortAsc ? <i className="fa-solid fa-arrow-down-wide-short"></i> : <i className="fa-solid fa-arrow-up-wide-short"></i>}</button>
                    <input type="number" placeholder="Min price" className="mid-price-filter"></input>
                    <input type="number" placeholder="Max price" className="max-price-filter"></input>
                </div>
                <div className="buttons-holder">
                    {user.pitchOwner && !editMode && 
                    <button className="edit-mode-on" onClick={() => {setEditMode(true)}}>Edit mode <i className="fa-solid fa-hammer"></i></button>}

                    {editMode && 
                    <button className="edit-mode-off" onClick={() => {setEditMode(false)}}>Edit mode <i class="fa-solid fa-door-open"></i></button>}

                    {editMode && 
                    <button className="add-pitch" onClick={handleModal}>Add Pitch <i className="fa-solid fa-plus"></i></button>}
                </div>
                <div className="pitches-list">
                    {pitches
                    .filter(pitch => user.pitchOwner ? true : pitch.state === "active")
                    .filter(pitch => editMode ? pitch.ownerId === user.id : true)
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

                                        
                                        {pitch.state === "active" && 
                                            <button>Lock <i className="fa-solid fa-lock"></i></button>}

                                        {pitch.state === "lock" && 
                                            <button>Lock <i className="fa-solid fa-lock-open"></i></button>}
                                        <button className="remove-pitch-button">Remove <i className="fa-solid fa-ban"></i></button>

                                    </div>
                                }
                            </div>
                            <hr />
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Pitches;
