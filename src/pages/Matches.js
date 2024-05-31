import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/matches.css";
import RefereeRateStars from "../components/RefereeRateStars";
import MatchPosition from "../components/MatchPosition";
import { Position } from "../PositionsEnum";
import axios from "axios";

const Matches = ({ user }) => {
    const { pitchId } = useParams();
    const navigate = useNavigate();
    
    const [matches, setMatches] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
            axios.get(`http://localhost:8080/system/get-all-matches/pitch/${pitchId}/user/${user.username}`)
                .then(response => {
                    setMatches(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the pitches!", error);
            });
    }, [update]);

    const [sortAscByScore, setSortAscByScore] = useState(true);
    const [sortAscByPlayersNumber, setSortAscByPlayersNumber] = useState(true);

    const handleSortByScore = () => {
        const sortedMatches = [...matches].sort((a, b) => {
            if (!sortAscByScore) {
                return a.score_sum - b.score_sum;
            } else {
                return b.score_sum - a.score_sum;
            }
        });
        setSortAscByScore(!sortAscByScore); // Toggle sorting order
        setMatches(sortedMatches);
    };

    const handleSortByPlayersNumber = () => {
        const sortedMatches = [...matches].sort((a, b) => {
            if (!sortAscByPlayersNumber) {
                return a.registered_players - b.registered_players;
            } else {
                return b.registered_players - a.registered_players;
            }
        });
        setSortAscByPlayersNumber(!sortAscByPlayersNumber); // Toggle sorting order
        setMatches(sortedMatches);
    };


    return (
        <div className="Matches">
            <div className="container">
                <div className="filters_container">
                    <select name="free-pos" id="free-pos" className="free-pos">
                        <option value="Any" defaultChecked>Free Position - Any</option>
                        <option value={Position.NORMAL_PLAYER}>Normal Player</option>
                        <option value={Position.GOAL_KEEPER}>Goal Keeper</option>
                        <option value={Position.REFEREE}>Referee</option>
                    </select>
                    <select name="referee" id="referee" className="referee">
                        <option value="referee">Has referee</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <button className="rate-sort" onClick={handleSortByScore}>Sort by score {sortAscByScore ? <i className="fa-solid fa-arrow-down-wide-short"></i> : <i className="fa-solid fa-arrow-up-wide-short"></i>}</button>
                    <button className="rate-sort" onClick={handleSortByPlayersNumber}>Sort by players# {sortAscByPlayersNumber ? <i className="fa-solid fa-arrow-down-wide-short"></i> : <i className="fa-solid fa-arrow-up-wide-short"></i>}</button>
                    <input required type="number" placeholder="From time" className="from-time-filter"></input>
                    <input required type="number" placeholder="To time" className="to-time-filter"></input>
                </div>
                <div className="matches-list">
                    {matches
                    .map(match => {
                        return <div className="match-box-container" key={match.id}>
                            <div className="match-box">
                                <header>
                                    <div className="match-time">{match.time} <i className="fa-regular fa-clock"></i></div>
                                    <div className="total-score">{match.day.substring(0, 3)} <i className="fa-regular fa-calendar-days"></i></div>
                                    <div className="total-score">{match.score_sum} <i className="fa-brands fa-web-awesome"></i></div>
                                </header>
                                <section className="match-button">
                                    <div className="positions">
                                    <div className="side side-1 keeper">
                                        <MatchPosition teamNumber={1} positionNumber={1} position={Position.GOAL_KEEPER} match={match} source_user={user} target_user={match.positions[1]} register={false}/>
                                    </div>
                                    <div className="side side-2">
                                        <MatchPosition teamNumber={1} positionNumber={2} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[2]} register={false}/>
                                        <MatchPosition teamNumber={1} positionNumber={3} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[3]} register={false}/>
                                    </div>
                                    <div className="side side-3">
                                        <MatchPosition teamNumber={1} positionNumber={4} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[4]} register={false}/>
                                        <MatchPosition teamNumber={1} positionNumber={5} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[5]} register={false}/>
                                    </div>

                                    <div className="side side-4 judge">
                                        <i className="fa-solid fa-flag-checkered referee-pos"></i>
                                    </div>

                                    <div className="side side-5">
                                        <MatchPosition teamNumber={2} positionNumber={6} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[6]} register={false}/>
                                        <MatchPosition teamNumber={2} positionNumber={7} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[7]} register={false}/>
                                    </div>
                                    <div className="side side-6">
                                        <MatchPosition teamNumber={2} positionNumber={8} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[8]} register={false}/>
                                        <MatchPosition teamNumber={2} positionNumber={9} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[9]} register={false}/>
                                    </div>
                                    <div className="side side-7 keeper">
                                        <MatchPosition teamNumber={2} positionNumber={10} position={Position.GOAL_KEEPER} match={match} source_user={user} target_user={match.positions[10]} register={false}/>
                                    </div>
                                    </div>
                                </section>
                                <div className="register-btn">
                                    <button onClick={() => {navigate("/pitches/" + pitchId + "/matches/" + match.id, { state: { match } })}}>Register <i className="fa-solid fa-paper-plane"></i></button>
                                </div>
                            </div>
                            <hr />
                        </div>
                    })}
                </div>
                {matches.length === 0 && <div className="empty-word">No Matches Yet.</div>}
            </div>
        </div>
    );
};

export default Matches;
