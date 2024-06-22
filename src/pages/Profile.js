import { useNavigate, useParams } from "react-router-dom";
import "../styles/profile.css"
import RefereeRateStars from "../components/RefereeRateStars";
import { useEffect, useState } from "react";
import { Roles } from "../RolesEnum";
import axios from "axios";
import { handleAlert } from "../components/handleAlertFunction";
import { Colors } from "../ColorsEnum";
import Register from "./Register";
import Loaderr from "../components/Loader";
import { LoadingControlPanel } from "../LoadingControlPanel";

const Profile = ({ user, setUpdate }) => {

    const alert = (msg, color) => handleAlert(msg, color);

    

    const { username } = useParams();
    const navigate = useNavigate();

    const [upgradeAccountModal, setUpgradeAccountModal] = useState(false);
    const [editProfileModal, setEditProfileModal] = useState(false);
    const [thisUpdate, setThisUpdate] = useState(false);

    const profileOwner = user.username === username;

    const handleUpgradeAccountModal = () => {
        setUpgradeAccountModal(c => !c);
        setSelectedFace1(null);
        setSelectedFace2(null);
    }

    const handleEditProfileModal = () => {
        setEditProfileModal(c => !c);
        // here
    }
    const [userStatistics, setUserStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(user);
    const [error, setError] = useState(null);

    const handleUploadImage = async (event) => {
        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('profileImage', event.target.files[0]);

        try {
            await axios.put(`http://localhost:8080/system/change-user-profile-image/${user.username}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert("Image changed successfuly.", Colors.GREEN);
            setUpdate(c => !c);
            setThisUpdate(c => !c);

        } catch (error) {

            console.error('Error submitting upgrade request:', error);
            alert("Change profile image faild !", Colors.RED);

        }
    }

    useEffect(() => {
        const fetchUserStatistics = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/system/user/${username}/user-statistics`);
            setUserStatistics(response.data);
            
        } catch (error) {
            setError(error.message);
        }
        };

        fetchUserStatistics();

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/system/get-user-data-by-username/${username}`);
                setUserData(response.data);
            } catch (error) {
                setError(error.message);
            }
            };
    
            fetchUserData();

            setTimeout(() => {
                setLoading(false);
            }, LoadingControlPanel.TIME)
    }, [thisUpdate]);

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

    const [firstName, setFirstName] = useState(user.firstName);
    const [midName, setMidName] = useState(user.midName);
    const [lastName, setLastName] = useState(user.lastName);
    const [dob, setDob] = useState(user.dob);
    const [address, setAddress] = useState(user.address);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [selectedCity, setSelectedCity] = useState(user.city);

    const handleFace1Change = (event) => {
        setSelectedFace1(event.target.files[0]);
    };
    const handleFace2Change = (event) => {
        setSelectedFace2(event.target.files[0]);
    };

    const handleUpgradeAccount = async () => {
        if (selectedFace1 && selectedFace2) {

            const formData = new FormData();
            formData.append('username', username);
            formData.append('idCardFace1', selectedFace1);
            formData.append('idCardFace2', selectedFace2);

            try {
                await axios.post('http://localhost:8080/system/upgrade-account-requests', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                alert("Request sent successfuly.", Colors.GREEN);

            } catch (error) {

                console.error('Error submitting upgrade request:', error);
                alert("Request already sent !", Colors.RED);

            }
            
            handleUpgradeAccountModal();
        }
    }

    const handleEditProfile = async () => {
        if (firstName.length > 0 && 
            midName.length > 0 && 
            lastName.length > 0 && 
            dob && 
            address.length > 0 &&
            phoneNumber.length === 10 && 
            selectedCity) {

                try {
                    const response = await axios.put('http://localhost:8080/system/edit-profile', {
                        username: user.username,
                        firstName: firstName,
                        midName: midName,
                        lastName: lastName,
                        dob: dob, 
                        address: address,
                        phoneNumber: phoneNumber,
                        city: selectedCity
                    });

                    alert("Profile edited successfully", Colors.GREEN);
                    setUpdate(c => !c);
                    setThisUpdate(c => !c);
                
                    handleEditProfileModal();
                } catch {
                    alert("Phone number already taken !", Colors.RED);
                }
        }
        else {
            alert("Please make sure to fill all fields correctly.", Colors.YELLOW);
            console.log(
                {firstName,
            midName,
            lastName,
            dob, 
            address,
            phoneNumber,
            selectedCity}
            );
        }
    }

    const [cities, setCities] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    useEffect(() => {
        if (!isFetched) {
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

    if (loading) return  <Loaderr />
    if (!userStatistics) return  <div className="empty-word">Error 404:<br></br>User not found</div>

    const defaultProfileImage = "data:image/png;base64,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";


    return (
        <div className="Profile">

            {editProfileModal && <div className="modall add-match-schedule-modal">
                <div className="background" onClick={handleEditProfileModal}></div>
                    <div className="modal-box">
                        <h4>Edit Profile</h4>
                        <form className="contacts_form">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">First Name</label>
                                <input required
                                    type="text"
                                    className="form-control data-input"
                                    placeholder="First Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    defaultValue={firstName}
                                />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputEmail4">Middle Name</label>
                                    <input required
                                        type="text"
                                        className="form-control data-input"
                                        placeholder="Middle Name"
                                        onChange={(e) => setMidName(e.target.value)}
                                        value={midName}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputEmail4">Last Name</label>
                                    <input required
                                        type="text"
                                        className="form-control data-input"
                                        placeholder="Last Name"
                                        onChange={(e) => setLastName(e.target.value)}
                                        defaultValue={lastName}
                                    />
                                </div>
                                
                            </div>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Birth of date</label>
                                    <input required
                                        id="datepicker"
                                        type="date"
                                        className="form-control  data-input"
                                        placeholder="Birth of date"
                                        onChange={(e) => setDob(e.target.value)}
                                        defaultValue={dob}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputState">City</label>
                                    <select id="inputState" className="form-control data-input" value={selectedCity} onChange={handleCityChange}>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.name} defaultChecked = {city.name === city}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputAddress">Address</label>
                                <input required
                                type="text"
                                className="form-control data-input"
                                id="inputAddress"
                                placeholder="1234 Main St"
                                onChange={(e) => setAddress(e.target.value)}
                                defaultValue={address}
                                />
                            </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Phone number</label>
                                    <input required
                                        type="tel"
                                        className="form-control data-input"
                                        placeholder="Phone number"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        defaultValue={phoneNumber}
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="modal-btn-holder">
                            <button onClick={handleEditProfileModal}>Cancel <i className="fa-solid fa-circle-xmark"></i></button>
                            <button onClick={handleEditProfile}>Done <i class="fa-solid fa-check"></i></button>
                        </div>
                    </div>
            </div>}
            {upgradeAccountModal && <div className="modall add-match-schedule-modal">
                <div className="background" onClick={handleUpgradeAccountModal}></div>
                    <div className="modal-box">
                        <h4>Upgrade Account</h4>
                        
                        <div>
                            <h6>ID card face 1:</h6>
                            <input required type="file" onChange={handleFace1Change} />
                            {selectedFace1 && (
                                <div>
                                <p>Selected Image: {selectedFace1.name.substring(0, 14)}</p>
                                </div>
                            )}
                            <h6>ID card face 2:</h6>
                            <input required type="file" onChange={handleFace2Change} />
                            {selectedFace2 && (
                                <div>
                                <p>Selected Image: {selectedFace2.name.substring(0, 14)}</p>
                                </div>
                            )}
                        </div>
                        <div className="modal-btn-holder">
                            <button onClick={handleUpgradeAccountModal}>Cancel <i className="fa-solid fa-circle-xmark"></i></button>
                            <button onClick={handleUpgradeAccount}>Upgrade <i className="fa-solid fa-star"></i></button>
                        </div>
                    </div>
            </div>}

            <div className="profile-navbar">
                <div className="container nav-container">
                    <ul className="taps">
                        
                        <li className="tap" onClick={() => {navigate("/profile/"+username)}}>Profile</li>
                        <li className="tap" onClick={() => {navigate("/matchhistory/"+username)}}>Match History</li>
                        {
                            (!profileOwner && (user.role === Roles.ADMIN || user.role === Roles.SUPER_ADMIN)) && 
                            <li className="tap" onClick={handleAdminControl}>
                                <i className="fa-solid fa-gear"></i>
                                <ol className="hidden" id="admin-profile-control">
                                    <li>Ban <i className="fa-solid fa-ban"></i></li>
                                    {
                                        user.role === Roles.SUPER_ADMIN && <>
                                            {
                                                !userData.role === Roles.ADMIN 
                                                    ? <li>Grant Admin <i className="fa-solid fa-shield-halved"></i></li> 
                                                    : <li>Revoke Admin <i className="fa-solid fa-circle-minus"></i></li>
                                            }
                                        </>
                                    }
                                </ol>
                            </li>
                            
                        }
                    </ul>
                    {   profileOwner && user.role === Roles.USER &&
                        <button className="upgrade-acc" onClick={handleUpgradeAccountModal}>Upgrade Account <i className="fa-solid fa-star"></i></button>
                    }
                </div>
            </div>

            <div className="container section">
                <div className="lhs">
                    <div className="image" style={{backgroundImage: `url(${user.profileImage.length > 0 ? "data:image/jpeg;base64,"+userData.profileImage : defaultProfileImage})`}}>
                        {
                            profileOwner && <div className="control">
                            <div className="holder">
                                <p>Change Image</p>
                                <input type="file" onChange={handleUploadImage}/>
                            </div>
                        </div>
                        }
                    </div>
                    <div className="name">{userData.firstName} {userData.lastName}</div>
                </div>

                <div className="rhs">
                    <p>Personal Data</p>
                    <div className="data">
                        <ul>

                            <li>
                                <span>username:</span>
                                <span>{userData.username}</span>
                            </li>
                            <li>
                                <span>city:</span>
                                <span>{userData.city}</span>
                            </li>
                            <li>
                                <span>dob:</span>
                                <span>{userData.dob}</span>
                            </li>
                            <li>
                                <span>join date:</span>
                                <span>{userData.joinDate}</span>
                            </li>
                        </ul>
                    </div>
                    {!profileOwner &&
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
                    </div>}
                    {profileOwner &&
                    <div className="buttons">
                        <ul className="right-adj">
                            <li className="edit-profile" onClick={handleEditProfileModal}>
                                <p>Edit Profile</p>
                                <i class="fa-solid fa-pen"></i>
                            </li>
                        </ul>
                    </div>}
                </div>
            </div>

            <div className="container statistics">
                <ul>
                    {Object.entries(userStatistics).map(([key, value]) => (
                        <li key={"row-" + key} className = {"row-" + key} id = {"row-" + key}>
                            <span>{to_small(key)}</span>
                            <span>{value ? value : 0}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;