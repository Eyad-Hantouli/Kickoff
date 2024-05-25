import { useNavigate, useParams } from "react-router-dom";
import "../styles/profile.css"
import RefereeRateStars from "../components/RefereeRateStars";
import { useState } from "react";

const Profile = ({ user }) => {

    const { username } = useParams();
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(c => !c);
        // setPitchName(null);
        // setPitchPrice(null);
        setSelectedFace1(null);
        setSelectedFace2(null);
    }

    const statistics = {
        goals: "3",
        yellowCards: "3",
        redCards: 0,
        motm: 5,
        totalMatches: 5,
        scores: 850
    }

    const data = {
        admin: false,
        name: "Eyad Hantouli",
        refereeRate: 3.28, 
        city: "Amman", 
        mostPlayedPoisition: "CF", 
        dob: "04-07-2002",
        createdDate: "01-01-2001"
    };

    function to_small(str) {
        return str.replace(/[A-Z]/g, function(match) {
            return ' ' + match.toLowerCase();
        });
    }

    const handleAdminControl = () => {
        document.getElementById("admin-profile-control").classList.toggle("hidden")
    }

    const [selectedFace1, setSelectedFace1] = useState(null);
    const [selectedFace2, setSelectedFace2] = useState(null);
    // const [pitchName, setPitchName] = useState(null);
    // const [pitchPrice, setPitchPrice] = useState(null);

    const handleFace1Change = (event) => {
        setSelectedFace1(event.target.files[0]);
    };
    const handleFace2Change = (event) => {
        setSelectedFace2(event.target.files[0]);
    };

    const handleUpgradeAccount = () => {
        if (selectedFace1 && selectedFace2)
            console.log("ID card faces: " + selectedFace1.name + ", " + selectedFace2.name);
        handleModal();
    }

    return (
        <div className="Profile">

            {modal && <div className="modall add-match-schedule-modal">
                <div className="background" onClick={handleModal}></div>
                    <div className="modal-box">
                        <h4>Upgrade Account</h4>
                        {/* <input onChange = {(e) => {setPitchName(e.target.value)}} className = "data-input" type="text" placeholder="Name"/>
                        <input onChange = {(e) => {setPitchPrice(e.target.value)}} className = "data-input" type="number" placeholder="Price"/> */}
                        <div>
                            <h6>ID card face 1:</h6>
                            <input type="file" onChange={handleFace1Change} />
                            {selectedFace1 && (
                                <div>
                                <p>Selected Image: {selectedFace1.name.substring(0, 14)}</p>
                                </div>
                            )}
                            <h6>ID card face 2:</h6>
                            <input type="file" onChange={handleFace2Change} />
                            {selectedFace2 && (
                                <div>
                                <p>Selected Image: {selectedFace2.name.substring(0, 14)}</p>
                                </div>
                            )}
                        </div>
                        <div className="modal-btn-holder">
                            <button onClick={handleModal}>Cancel <i class="fa-solid fa-circle-xmark"></i></button>
                            <button onClick={handleUpgradeAccount}>Upgrade <i class="fa-solid fa-star"></i></button>
                        </div>
                    </div>
            </div>}

            <div className="profile-navbar">
                <div className="container nav-container">
                    <ul className="taps">
                        
                        <li className="tap" onClick={() => {navigate("/profile/"+username)}}>Profile</li>
                        <li className="tap" onClick={() => {navigate("/matchhistory/"+username)}}>Match History</li>
                        {
                            user.admin && 
                            <li className="tap">
                                <i className="fa-solid fa-gear" onClick={handleAdminControl}></i>
                                <ol className="hidden" id="admin-profile-control">
                                    <li>Ban <i className="fa-solid fa-ban"></i></li>
                                    {
                                        user.superAdmin && <>
                                            {
                                                !data.admin 
                                                    ? <li>Grant Admin <i className="fa-solid fa-shield-halved"></i></li> 
                                                    : <li>Revoke Admin <i className="fa-solid fa-circle-minus"></i></li>
                                            }
                                        </>
                                    }
                                </ol>
                            </li>
                            
                        }
                    </ul>
                    {   !user.admin && !user.pitchOwner &&
                        <button className="upgrade-acc" onClick={handleModal}>Upgrade Account <i class="fa-solid fa-star"></i></button>
                    }
                </div>
            </div>

            <div className="container section">
                <div className="lhs">
                    <div className="image"></div>
                    <div className="name">{data.name} <span><i className="fa-solid fa-pen"></i></span></div>
                </div>

                <div className="rhs">
                    <p>Personal Data</p>
                    <div className="data">
                        <ul>
                            <li key={"row-username"} className = {"row-username"} id = {"row-username"}>
                                <span>username: </span>
                                <span>{username}</span>
                            </li>

                            {Object.entries(data).map(([key, value]) => (
                                key !== "name" && key !== "admin" &&
                                <li key={"row-" + key} className = {"row-" + key} id = {"row-" + key}>
                                    <span>{to_small(key)}: </span>
                                    {key !== "refereeRate" && <span>{value}</span>}
                                    {key === "refereeRate" && <span><RefereeRateStars value = {value}/></span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="buttons">
                        <ul>
                            <li className="friend">
                                <p>Add Friend</p>
                                <i className="fa-regular fa-star"></i>
                            </li>
                            <li className="block">
                                <p>Block User</p>
                                <i className="fa-solid fa-ban"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container statistics">
                <ul>
                    {Object.entries(statistics).map(([key, value]) => (
                        <li key={"row-" + key} className = {"row-" + key} id = {"row-" + key}>
                            <span>{to_small(key)}</span>
                            <span>{value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;