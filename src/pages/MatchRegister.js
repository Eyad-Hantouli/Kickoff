import React, { Fragment, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/matches.css";
import "../styles/match_register.css";
import RefereeRateStars from "../components/RefereeRateStars";
import MatchPosition from "../components/MatchPosition";
import { Roles } from "../RolesEnum";
import { Position } from "../PositionsEnum";

const MatchRegister = ({ user }) => {
    const location = useLocation();
    const { match } = location.state || {};

    const [update, setUpdate] = useState(false);
    
    return (
        <div className="Matches Register">
            <div className="container">
                <div className="matches-list">
                    <div className="match-box-container">
                        <div className="match-box">
                            <header>
                                <div className="match-time">{match.time} <i className="fa-regular fa-clock"></i></div>
                                <div className="total-score">{match.day} <i className="fa-regular fa-calendar-days"></i></div>
                                <div className="total-score">{match.score_sum} <i className="fa-brands fa-web-awesome"></i></div>
                            </header>
                            <section className="match-button">
                                <div className="positions">
                                    <div className="side side-1 keeper">
                                        <MatchPosition teamNumber={1} positionNumber={1} position={Position.GOAL_KEEPER} match={match} source_user={user} target_user={match.positions[1]} register={true}/>
                                    </div>
                                    <div className="side side-2">
                                        <MatchPosition teamNumber={1} positionNumber={2} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[2]} register={true}/>
                                        <MatchPosition teamNumber={1} positionNumber={3} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[3]} register={true}/>
                                    </div>
                                    <div className="side side-3">
                                        <MatchPosition teamNumber={1} positionNumber={4} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[4]} register={true}/>
                                        <MatchPosition teamNumber={1} positionNumber={5} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[5]} register={true}/>
                                    </div>

                                    <div className="side side-99 judge">
                                        <MatchPosition teamNumber={0} positionNumber={99} position={Position.REFEREE} match={match} source_user={user} target_user={match.positions[99]} register={true}/>
                                    </div>

                                    <div className="side side-5">
                                        <MatchPosition teamNumber={2} positionNumber={6} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[6]} register={true}/>
                                        <MatchPosition teamNumber={2} positionNumber={7} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[7]} register={true}/>
                                    </div>
                                    <div className="side side-6">
                                        <MatchPosition teamNumber={2} positionNumber={8} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[8]} register={true}/>
                                        <MatchPosition teamNumber={2} positionNumber={9} position={Position.NORMAL_PLAYER} match={match} source_user={user} target_user={match.positions[9]} register={true}/>
                                    </div>
                                    <div className="side side-7 keeper">
                                        <MatchPosition teamNumber={2} positionNumber={10} position={Position.GOAL_KEEPER} match={match} source_user={user} target_user={match.positions[10]} register={true}/>
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
