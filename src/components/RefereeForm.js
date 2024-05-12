import "../styles/referee_form.css";

const RefereeForm = () => {

    const players = [
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"},
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"},
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"},
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"},
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"},
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"},
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"},
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"},
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"},
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"},
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"},
        {username: "eyad_h", name: "Eyad Hantouli", position: "CF", team: "1"}
    ];

    return (
        <div className="RefereeForm">
            {
                players.map(player => {
                    return <>
                        <div className="row-">
                            <div className="container">
                                <div className="top">
                                    {player.name} - {player.position} - team {player.team}
                                </div>
                                <div className="bottom">
                                    <div className="sect">
                                        <label htmlFor="attend">Attend</label>
                                        <input type="checkbox" id="attend"/>
                                    </div>
                                    <div className="sect">
                                        <label>Yellow Card</label>
                                        <span></span>
                                    </div>
                                    <div className="sect">
                                        <label>Red Card</label>
                                        <span></span>
                                    </div>
                                    <div className="sect">
                                        <label>Goals</label>
                                        <span></span>
                                    </div>
                                    <div className="sect">
                                        <label>Fouls</label>
                                        <span></span>
                                    </div>
                                    <div className="sect">
                                        <label>Ethics</label>
                                        <span></span>
                                    </div>
                                    <div className="sect">
                                        <label htmlFor="motm">MOTM</label>
                                        <input type="checkbox" id="motm"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                })
            }

            <div className="container button">
                <button className="btn">Submit</button>
            </div>
        </div>
    );
};

export default RefereeForm;
