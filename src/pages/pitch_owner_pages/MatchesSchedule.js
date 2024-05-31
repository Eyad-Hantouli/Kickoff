import { useParams } from "react-router-dom";
import "../../styles/matches_schedule.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Roles } from "../../RolesEnum";
import { handleAlert } from "../../components/handleAlertFunction";
import { Colors } from "../../ColorsEnum";

const MatchesSchedule = () => {

    const emptyTimeAlert = (msg) => handleAlert(msg, Colors.YELLOW);
    const intersectTimesAlert = (msg) => handleAlert(msg, Colors.RED);

    const getTimestamp = (day, time) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = daysOfWeek.indexOf(day);
        if (dayIndex === -1) {
            console.error("Invalid day provided.");
            return null;
        }

        return `2024-05-${12 + dayIndex} ${time.substring(0, 2)}:00:0`;
    };
    
    const { pitchId } = useParams();

    // const initialSchedule = [
    //     {id: 3, time: "17:00", day: "Sat", state: "on"}, 
    //     {id: 1, time: "13:00", day: "Sat", state: "on"}, 
    //     {id: 2, time: "15:00", day: "Sat", state: "off"}, 
    //     {id: 4, time: "13:00", day: "Sun", state: "on"},
    //     {id: 5, time: "13:00", day: "Mon", state: "off"}, 
    //     {id: 8, time: "16:00", day: "Fri", state: "on"},
    //     {id: 7, time: "19:00", day: "Mon", state: "on"},
    //     {id: 6, time: "02:00", day: "Tue", state: "on"}
    // ];

    const [time, setTime] = useState();

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete('http://localhost:8080/system/delete-schedule', {
                data: {
                    "id": parseInt(id)
                }
            }).then(() => {
                setIsFetched(curr => !curr);
            });
        } catch (error) {
        }
    }
    
    const handleDay = async (day, time, e) => {

        if (time) {

            const timestamp = getTimestamp(day, time);

            try {
                const response = await axios.post('http://localhost:8080/system/create-schedule', {
                    "pitchId": pitchId,
                    "timestamp": timestamp
                }).then(() => {
                    setIsFetched(curr => !curr);
                    handleModal();
                })

            } catch (error) {
                intersectTimesAlert("There is another match within 2 hours before or after this time.");
            }
        }
        else {
            emptyTimeAlert("You have to pick time before do this operation.");
        }
        
    };

    // const [schedule, setSchedule] = useState(initialSchedule);
    const [modal, setModal] = useState(false);

    const [schedule, setSchedule] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    
    useEffect(() => {
            axios.get(`http://localhost:8080/system/get-schedule/${pitchId}`)
                .then(response => {
                    setSchedule(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the pitches!", error);
                    setSchedule([]);
            });
    }, [isFetched]);


    const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOrder2 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const currSort = schedule.sort((a, b) => {
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
                match.id === id ? { ...match, state: match.state === Roles.ACTIVE ? Roles.DISABLED : Roles.ACTIVE } : match
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
                            <input required type="time" onChange={event => {
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
                                    
                                    >{thisDay.substring(0, 3)}</div>
                                })
                            }
                        </div>
                        {/* <div>
                            <button className="add-match-button" onClick={() => handleDay({ day: day, time: time })}>Add <i className="fa-solid fa-plus"></i></button>
                        </div> */}
                    </div>
            </div>}
            
            <div className="control-nav container">
                <button className="add-match" onClick={handleModal}>Add Match <i className="fa-solid fa-plus"></i></button>
            </div>

            <div className="matches-schedule-holder container">
                {
                    schedule.map(match => {
                        return <div className={`match-schedule ${match.state === Roles.ACTIVE ? "" : "darkness"}`} key={match.id}>
                            <p className="time"><i className="fa-regular fa-clock"></i> {match.time}</p>
                            
                            <div className="RHS">
                                <div className="week-days">
                                    {
                                        dayOrder2.map(day => {
                                            return <div className={`day ${day === match.day.substring(0, 3) ? "light" : ""}`} key={day}>
                                                {day[0]}
                                            </div>
                                        })
                                    }
                                </div>
                                <div className="control-buttons-holder">
                                    {match.state === Roles.ACTIVE &&
                                    <button className="turn-off" onClick={() => toggleState(match.id)}><i className="fa-solid fa-toggle-on"></i></button>}
                                    {match.state === Roles.DISABLED &&
                                    <button className="turn-on" onClick={() => toggleState(match.id)}><i className="fa-solid fa-toggle-off"></i></button>}
                                    <button className="remove" onClick={() => {handleDelete(match.id)}}><i className="fa-solid fa-xmark"></i></button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            {schedule.length === 0 && <div className="empty-word">No Matches Yet.</div>}

        </div>
    );
};

export default MatchesSchedule;
