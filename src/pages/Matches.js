import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/matches.css";
import RefereeRateStars from "../components/RefereeRateStars";
import MatchPosition from "../components/MatchPosition";

const Matches = () => {
    const { pitchId } = useParams();
    const navigate = useNavigate();
    const [matches, setMatches] = useState([
        {id: 1, time: "11:00", score_sum: 400, registered_players: 3, positions: [
                {username: null},           // 0
                {username: null},           // 1
                {username: "yamn881"},      // 2
                {username: "eyad_h"},       // 3
                {username: null},           // 4
                {username: null},           // 5
                {username: null},           // 6
                {username: "haytham001"},   // 7
                {username: null},           // 8
                {username: null},           // 9
                {username: null}           // 10
            ]
        },
        {id: 2, time: "13:00", score_sum: 1200, registered_players: 2, positions: [
                {username: null},           // 0
                {username: "yamn881"},      // 1
                {username: "eyad_h"},       // 2
                {username: null},           // 3
                {username: null},           // 4
                {username: null},           // 5
                {username: null},           // 6
                {username: null},           // 7
                {username: null},           // 8
                {username: null},           // 9
                {username: null}           // 10
            ]
        },
        {id: 3, time: "16:00", score_sum: 120, registered_players: 1, positions: [
                {username: null},           // 0
                {username: null},           // 1
                {username: null},           // 2
                {username: null},           // 3
                {username: null},           // 4
                {username: null},           // 5
                {username: null},           // 6
                {username: "haytham001"},   // 7
                {username: null},           // 8
                {username: null},           // 9
                {username: null}           // 10
            ]
        }
    ]);

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
                        <option value="Position" defaultChecked>Free Position</option>
                        <option value="CF" defaultChecked>CF</option>
                        <option value="WTF">WTF</option>
                        <option value="EYF">EYF</option>
                        <option value="JF">JF</option>
                    </select>
                    <select name="referee" id="referee" className="referee">
                        <option value="referee">Has referee</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <button className="rate-sort" onClick={handleSortByScore}>Sort by score {sortAscByScore ? <i className="fa-solid fa-arrow-down-wide-short"></i> : <i className="fa-solid fa-arrow-up-wide-short"></i>}</button>
                    <button className="rate-sort" onClick={handleSortByPlayersNumber}>Sort by players# {sortAscByPlayersNumber ? <i className="fa-solid fa-arrow-down-wide-short"></i> : <i className="fa-solid fa-arrow-up-wide-short"></i>}</button>
                    <input type="number" placeholder="From time" className="from-time-filter"></input>
                    <input type="number" placeholder="To time" className="to-time-filter"></input>
                </div>
                <div className="matches-list">
                    {matches
                    .map(match => {
                        return <div className="match-box-container" key={match.id}>
                            <div className="match-box">
                                <header>
                                    <div className="match-time">{match.time} <i class="fa-regular fa-clock"></i></div>
                                    <div className="total-score">{match.score_sum} <i className="fa-brands fa-web-awesome"></i></div>
                                </header>
                                <section className="match-button">
                                    <div className="positions">
                                        <div className="side side-1 keeper">
                                            <MatchPosition username={match.positions[1].username} register={false}/>
                                        </div>
                                        <div className="side side-2">
                                            <MatchPosition username={match.positions[2].username} register={false}/>
                                            <MatchPosition username={match.positions[3].username} register={false}/>
                                        </div>
                                        <div className="side side-3">
                                            <MatchPosition username={match.positions[4].username} register={false}/>
                                            <MatchPosition username={match.positions[5].username} register={false}/>
                                        </div>

                                        <div className="side side-4 judge">
                                            <i className="fa-solid fa-flag-checkered referee-pos"></i>
                                        </div>

                                        <div className="side side-5">
                                            <MatchPosition username={match.positions[6].username} register={false}/>
                                            <MatchPosition username={match.positions[7].username} register={false}/>
                                        </div>
                                        <div className="side side-6">
                                            <MatchPosition username={match.positions[8].username} register={false}/>
                                            <MatchPosition username={match.positions[9].username} register={false}/>
                                        </div>
                                        <div className="side side-7 keeper">
                                            <MatchPosition username={match.positions[10].username} register={false}/>
                                        </div>
                                    </div>
                                </section>
                                <div className="register-btn">
                                    <button onClick={() => {navigate("/pitches/" + pitchId + "/matches/" + match.id, { state: { match } })}}>Register <i class="fa-solid fa-paper-plane"></i></button>
                                </div>
                            </div>
                            <hr />
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Matches;
