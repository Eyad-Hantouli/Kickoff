import { useNavigate, useParams } from "react-router-dom";
import "../styles/match_history.css"

const MatchHistory = () => {

    const { username } = useParams();
    const navigate = useNavigate();

    const matches = [
        {
            id: "1",
            position: "DEF", location: "Parax", referee: "yamen88", date: "01-01-2024 | 21:00",
            score: 20, goals: 3, yellowCards: 3, redCards: 0, fouls: 0
        },
        {
            id: "2",
            position: "DEF", location: "Parax", referee: "yamen88", date: "01-01-2024 | 21:00",
            score: 50, goals: 1, yellowCards: 3, redCards: 0, fouls: 2
        },
        {
            id: "3",
            position: "DEF", location: "Parax", referee: "yamen88", date: "01-01-2024 | 21:00",
            score: 20, goals: 3, yellowCards: 3, redCards: 0, fouls: 3
        },
        {
            id: "4",
            position: "DEF", location: "Parax", referee: "yamen88", date: "01-01-2024 | 21:00",
            score: 50, goals: 1, yellowCards: 3, redCards: 0, fouls: 2
        },
        {
            id: "5",
            position: "DEF", location: "Parax", referee: "yamen88", date: "01-01-2024 | 21:00",
            score: 20, goals: 3, yellowCards: 3, redCards: 0, fouls: 1
        },
        {
            id: "6",
            position: "DEF", location: "Parax", referee: "yamen88", date: "01-01-2024 | 21:00",
            score: 50, goals: 1, yellowCards: 3, redCards: 0, fouls: 9
        },
    ];

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
                {matches.map(match => {
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
                                    <li><span>{match.yellowCards}</span><span>Yellow Cards</span></li>
                                    <li><span>{match.redCards}</span><span>Red Cards</span></li>
                                    <li><span>{match.Fouls}</span><span>Fouls</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                })}
            </ul>
        </div>
    );
};

export default MatchHistory;