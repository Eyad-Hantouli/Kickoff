import { useParams } from "react-router-dom";
import "../../styles/matches_schedule.css";
import { useState } from "react";

const MatchesSchedule = () => {
    const { pitchId } = useParams();

    const initialSchedule = [
        {id: 3, time: "17:00", day: "Sat", state: "on"}, 
        {id: 1, time: "13:00", day: "Sat", state: "on"}, 
        {id: 2, time: "15:00", day: "Sat", state: "off"}, 
        {id: 4, time: "13:00", day: "Sun", state: "on"},
        {id: 5, time: "13:00", day: "Mon", state: "off"}, 
        {id: 8, time: "16:00", day: "Fri", state: "on"},
        {id: 7, time: "19:00", day: "Mon", state: "on"},
        {id: 6, time: "02:00", day: "Tue", state: "on"}
    ];

    const [time, setTime] = useState();

    const handleDay = (day, time, e) => {
        console.log(day + " -- " + time);
        if (time) {
            e.currentTarget.classList.add("selected");
        }
    };

    const [schedule, setSchedule] = useState(initialSchedule);
    const [modal, setModal] = useState(false);


    const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    schedule.sort((a, b) => {
        // Compare by day
        const dayDifference = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
        if (dayDifference !== 0) {
            return dayDifference;
        }
        // If days are the same, compare by time
        return a.time.localeCompare(b.time);
    });

    const toggleState = (id) => {
        setSchedule(prevSchedule =>
            prevSchedule.map(match =>
                match.id === id ? { ...match, state: match.state === "on" ? "off" : "on" } : match
            )
        );
    };

    const handleModal = () => {
        setTime(null);
        setModal(c => !c);
    }

    return (
        <div className="MatchesSchedule">

            {modal && <div className="modall add-match-schedule-modal">
                <div className="background" onClick={handleModal}></div>
                    <div className="modal-box">
                        <h4>Add Match</h4>
                        <div className="time-picker">
                            <input type="time" onChange={event => {
                                setTime(event.target.value);
                                Array.from(document.getElementsByClassName("selected")).forEach(e => {
                                    e.classList.remove("selected");
                                })
                            }}/>
                        </div>
                        <div className="day-picker">
                            {
                                dayOrder.map(thisDay => {
                                    return <div className="day-pick" 
                                    onClick={(e) => {
                                        handleDay(thisDay, time, e);
                                        }}
                                    
                                    >{thisDay}</div>
                                })
                            }
                        </div>
                        {/* <div>
                            <button className="add-match-button" onClick={() => handleDay({ day: day, time: time })}>Add <i class="fa-solid fa-plus"></i></button>
                        </div> */}
                    </div>
            </div>}
            
            <div className="control-nav container">
                <button className="add-match" onClick={handleModal}>Add Match <i class="fa-solid fa-plus"></i></button>
            </div>

            <div className="matches-schedule-holder container">
                {
                    schedule.map(match => {
                        return <div className={`match-schedule ${match.state === "on" ? "" : "darkness"}`} key={match.id}>
                            <p className="time"><i className="fa-regular fa-clock"></i> {match.time}</p>
                            
                            <div className="RHS">
                                <div className="week-days">
                                    {
                                        dayOrder.map(day => {
                                            return <div className={`day ${day === match.day ? "light" : ""}`} key={day}>
                                                {day[0]}
                                            </div>
                                        })
                                    }
                                </div>
                                <div className="control-buttons-holder">
                                    {match.state === "on" &&
                                    <button className="turn-off" onClick={() => toggleState(match.id)}><i className="fa-solid fa-toggle-on"></i></button>}
                                    {match.state === "off" &&
                                    <button className="turn-on" onClick={() => toggleState(match.id)}><i className="fa-solid fa-toggle-off"></i></button>}
                                    <button className="remove"><i className="fa-solid fa-xmark"></i></button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    );
};

export default MatchesSchedule;
