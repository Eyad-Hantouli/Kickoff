import { useNavigate, useParams } from "react-router-dom";
import "../styles/match_history.css"
import { useEffect, useState } from "react";
import axios from "axios";

const MatchHistory = () => {

    const { username } = useParams();
    const navigate = useNavigate();
    const[matchesData, setMatchesData] = useState();

    useEffect(() => {
        const fetchUserStatistics = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/system/match-history/${username}`);
            setMatchesData(response.data);
        } catch (error) {
            console.log("Error in fetching match history")
            setMatchesData({});
        }
        };

        fetchUserStatistics();
    }, []);

    console.log(matchesData);

    if (!matchesData) return<>Loading...</>

    return (
        <div className="MatchHistory">
            <div className="MatchHistory-navbar">
                <div className="container">
                    <ul className="taps">
                    <li className="tap" onClick={() => {navigate("/profile/"+username)}}>Profile</li>
                        <li className="tap" onClick={() => {navigate("/matchhistory/"+username)}}>Match History</li>
                    </ul>
                </div>
            </div>

            <ul>
                {matchesData.map(match => {
                    return <div className="row-" key={match.id}>
                        <div className="container">
                            <div className="top">
                                <ul>
                                    <li>Position: {match.position}</li>
                                    <li>Location: {match.location}</li>
                                    <li>Referee: {match.referee}</li>
                                    <li>Date: {match.date}</li>
                                    <li>Score: {match.score}</li>   
                                </ul>
                            </div>
                            <div className="bottom">
                                <ul>
                                    <li><span>{match.goals}</span><span>Goals</span></li>
                                    <li><span>{match.yellowCard}</span><span>Yellow Cards</span></li>
                                    <li><span>{match.redCard}</span><span>Red Cards</span></li>
                                    <li><span>{match.fouls}</span><span>Fouls</span></li>
                                    <li><span>{match.motm}</span><span>MOTM</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                })}
            </ul>

            {matchesData.length === 0 && <div className="empty-word">No Matches Played.</div>}
        </div>
    );
};

export default MatchHistory;