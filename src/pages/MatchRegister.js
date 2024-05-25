import React, { Fragment, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/matches.css";
import "../styles/match_register.css";
import RefereeRateStars from "../components/RefereeRateStars";
import MatchPosition from "../components/MatchPosition";

const MatchRegister = () => {
    const { pitchId, matchId } = useParams();
    const location = useLocation();
    const { match } = location.state || {};
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


    return (
        <div className="Matches Register">
            <div className="container">
                <div className="matches-list">
                    <div className="match-box-container">
                        <div className="match-box">
                            <header>
                                <div className="match-time">{match.time} <i class="fa-regular fa-clock"></i></div>
                                <div className="total-score">{match.score_sum} <i className="fa-brands fa-web-awesome"></i></div>
                            </header>
                            <section className="match-button">
                                <div className="positions">
                                    <div className="side side-1 keeper">
                                        <MatchPosition username={match.positions[1].username} register={true}/>
                                    </div>
                                    <div className="side side-2">
                                        <MatchPosition username={match.positions[2].username} register={true}/>
                                        <MatchPosition username={match.positions[3].username} register={true}/>
                                    </div>
                                    <div className="side side-3">
                                        <MatchPosition username={match.positions[4].username} register={true}/>
                                        <MatchPosition username={match.positions[5].username} register={true}/>
                                    </div>

                                    <div className="side side-4 judge">
                                        <i className="fa-solid fa-flag-checkered referee-pos"></i>
                                    </div>

                                    <div className="side side-5">
                                        <MatchPosition username={match.positions[6].username} register={true}/>
                                        <MatchPosition username={match.positions[7].username} register={true}/>
                                    </div>
                                    <div className="side side-6">
                                        <MatchPosition username={match.positions[8].username} register={true}/>
                                        <MatchPosition username={match.positions[9].username} register={true}/>
                                    </div>
                                    <div className="side side-7 keeper">
                                        <MatchPosition username={match.positions[10].username} register={true}/>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchRegister;
