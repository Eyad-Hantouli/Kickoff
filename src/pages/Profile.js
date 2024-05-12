import { useNavigate, useParams } from "react-router-dom";
import "../styles/profile.css"
import RefereeRateStars from "../components/RefereeRateStars";

const Profile = () => {

    const { username } = useParams();
    const navigate = useNavigate();

    const statistics = {
        goals: "3",
        yellowCards: "3",
        redCards: 0,
        motm: 5,
        totalMatches: 5,
        scores: 850
    }

    const data = {
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

    return (
        <div className="Profile">
            <div className="profile-navbar">
                <div className="container">
                    <ul className="taps">
                        <li className="tap" onClick={() => {navigate("/profile/"+username)}}>Profile</li>
                        <li className="tap" onClick={() => {navigate("/matchhistory/"+username)}}>Match History</li>
                    </ul>
                </div>
            </div>

            <div className="container section">
                <div className="lhs">
                    <div className="image"></div>
                    <div className="name">{data.name} <span><i class="fa-solid fa-pen"></i></span></div>
                </div>

                <div className="rhs">
                    <p>Personal Data</p>
                    <div className="data">
                        <ul>
                            <li key={"row-username"} class = {"row-username"} id = {"row-username"}>
                                <span>username: </span>
                                <span>{username}</span>
                            </li>

                            {Object.entries(data).map(([key, value]) => (
                                key !== "name" &&
                                <li key={"row-" + key} class = {"row-" + key} id = {"row-" + key}>
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
                                <i class="fa-regular fa-star"></i>
                            </li>
                            <li className="block">
                                <p>Block User</p>
                                <i class="fa-solid fa-ban"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container statistics">
                <ul>
                    {Object.entries(statistics).map(([key, value]) => (
                        <li key={"row-" + key} class = {"row-" + key} id = {"row-" + key}>
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