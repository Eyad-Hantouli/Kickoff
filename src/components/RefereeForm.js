import { useState } from "react";
import "../styles/referee_form.css";
import axios from "axios";

const RefereeForm = ({ players }) => {

    const generatePlayerStat = () => {
        const playersStat = {};

        players.map((e) => {
            playersStat[e.username] = {yellowCard: 0, redCard: 0, goals: 0, fouls: 0, motm: 0, matchId: e.matchId};
        })

        return playersStat;
    }

    const [playersStat, setPlayersStat] = useState(generatePlayerStat());

    console.log(playersStat);

    // Goals Handler
    const setGoals = (username, value) => {
        setPlayersStat(prevState => ({
            ...prevState,
            [username]: {
                ...prevState[username],
                goals: Math.max(0, Math.min(99, value))
            }
        }));
    };

    const getGoals = (username) => {
        return playersStat[username]?.goals??0;
    }

    const [goalModal, setGoalModal] = useState({ open: false, playerUsername: null });

    const handleGoalsModal = (username = null) => {
        setGoalModal(prevState => ({
            open: !prevState.open,
            playerUsername: username
        }));
    }

    // Fouls Handler
    const setFouls = (username, value) => {
        setPlayersStat(prevState => ({
            ...prevState,
            [username]: {
                ...prevState[username],
                fouls: Math.max(0, Math.min(99, value))
            }
        }));
    };

    const getFouls = (username) => {
        return playersStat[username]?.fouls??0;
    }

    const [foulModal, setFoulModal] = useState({ open: false, playerUsername: null });

    const handleFoulsModal = (username = null) => {
        setFoulModal(prevState => ({
            open: !prevState.open,
            playerUsername: username
        }));
    }

    // MOTM handler
    const setMOTMfalse = (username) => {
        setPlayersStat(prevState => ({
            ...prevState,
            [username]: {
                ...prevState[username],
                motm: 0
            }
        }));
    }

    const handleMOTM = (username) => {

        players.map((e) => {
            setMOTMfalse(e.username)
        })
        
        setPlayersStat(prevState => ({
            ...prevState,
            [username]: {
                ...prevState[username],
                motm: 1
            }
        }));

    }

    const getMOTM = (username) => {
        return playersStat[username]?.motm??false;
    }

    // YellowCard handler
    const handleYellowCard = (username) => {
        
        setPlayersStat(prevState => ({
            ...prevState,
            [username]: {
                ...prevState[username],
                redCard: 0,
                yellowCard: getYellowCard(username) === 0 ? 1 : 0
            }
        }));

    }

    const getYellowCard = (username) => {
        return playersStat[username].yellowCard;
    }

    // RedCard handler
    const handleRedCard = (username) => {
        
        setPlayersStat(prevState => ({
            ...prevState,
            [username]: {
                ...prevState[username],
                yellowCard: 0,
                redCard: getRedCard(username) === 0 ? 1 : 0
            }
        }));

    }

    const getRedCard = (username) => {
        return playersStat[username]?.redCard??false;
    }

    const submitForm = async () => {
        try {
            const response = await axios.post('http://localhost:8080/system/submit-referee-statistics-form', playersStat);

          } catch (error) {
            console.error("Error in sending contact us message");
          }

          window.location.reload();
    }

    if (!players) return <>Loadin....</>

    return (
        <div className="RefereeForm">
            {goalModal.open && (
                <div className="modall add-match-schedule-modal">
                    <div className="background" onClick={() => handleGoalsModal(null)}></div>
                    <div className="modal-box">
                        <h4>Goals</h4>

                        <div className="modal-counter-holder">
                            <div className="modal-counter-sub controller" onClick={() => setGoals(goalModal.playerUsername, getGoals(goalModal.playerUsername) - 1)}><i className="fa-solid fa-minus"></i></div>
                            <div className="modal-counter-box">
                                <div id="counter-value">{getGoals(goalModal.playerUsername)}</div>
                            </div>
                            <div className="modal-counter-add controller" onClick={() => setGoals(goalModal.playerUsername, getGoals(goalModal.playerUsername) + 1)}><i className="fa-solid fa-plus"></i></div>
                        </div>

                        <div className="modal-btn-holder">
                            <button onClick={() => handleGoalsModal(null)}>Done <i className="fa-solid fa-check"></i></button>
                        </div>
                    </div>
                </div>
            )}
            {foulModal.open && (
                <div className="modall add-match-schedule-modal">
                    <div className="background" onClick={() => handleFoulsModal(null)}></div>
                    <div className="modal-box">
                        <h4>Fouls</h4>

                        <div className="modal-counter-holder">
                            <div className="modal-counter-sub controller" onClick={() => setFouls(foulModal.playerUsername, getFouls(foulModal.playerUsername) - 1)}><i className="fa-solid fa-minus"></i></div>
                            <div className="modal-counter-box">
                                <div id="counter-value">{getFouls(foulModal.playerUsername)}</div>
                            </div>
                            <div className="modal-counter-add controller" onClick={() => setFouls(foulModal.playerUsername, getFouls(foulModal.playerUsername) + 1)}><i className="fa-solid fa-plus"></i></div>
                        </div>

                        <div className="modal-btn-holder">
                            <button onClick={() => handleFoulsModal(null)}>Done <i className="fa-solid fa-check"></i></button>
                        </div>
                    </div>
                </div>
            )}
            {players.map(player => (
                <div className="row-" key={player.username}>
                    <div className="container">
                        <div className="top">
                            <span>Name: <b>{player.name}</b></span>
                            <span>Position: <b>{player.position}</b></span>
                            <span>Team: <b>{player.team}</b></span>
                            <span>Team: <b>{player.username}</b></span>
                        </div>
                        <div className="bottom">
                            <div className="sect" onClick={() => {handleYellowCard(player.username)}}>
                                <label>Yellow Card</label>
                                {getYellowCard(player.username)
                                    ? <i class="fa-solid fa-square-check"></i>
                                    : <i class="fa-regular fa-square"></i>
                                }
                            </div>
                            <div className="sect" onClick={() => {handleRedCard(player.username)}}>
                                <label>Red Card</label>
                                {getRedCard(player.username)
                                    ? <i class="fa-solid fa-square-check"></i>
                                    : <i class="fa-regular fa-square"></i>
                                }
                            </div>
                            <div className="sect" onClick={() => handleGoalsModal(player.username)}>
                                <label>Goals</label>
                                <span>{getGoals(player.username)}</span>
                            </div>
                            <div className="sect" onClick={() => handleFoulsModal(player.username)}>
                                <label>Fouls</label>
                                <span>{getFouls(player.username)}</span>
                            </div>
                            <div className="sect" onClick={() => {handleMOTM(player.username)}}>
                                <label htmlFor="attend">MOTM</label>
                                {getMOTM(player.username)
                                    ? <i class="fa-solid fa-square-check"></i>
                                    : <i class="fa-regular fa-square"></i>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="container button">
                <button className="btn" onClick={submitForm}>Submit</button>
            </div>
        </div>
    );
};

export default RefereeForm;
