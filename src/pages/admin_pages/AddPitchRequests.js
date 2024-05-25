import "../../styles/add_pitch_requests.css";

const AddPitchRequests = () => {

    const requests = [
        {
            username: "eyad_h",
            pitchName: "Parax",
            price: "3.5",
            pic: "https://img.yumpu.com/28393177/1/500x640/broad-green-fairfield-amp-waddon-16-10-12-croydon-council.jpg"
        },
        {
            username: "yamen9090",
            pitchName: "Parax",
            price: "3.5", 
            pic: "https://img.yumpu.com/28393177/1/500x640/broad-green-fairfield-amp-waddon-16-10-12-croydon-council.jpg"
        }
    ]

    return (
        <div className="AddPitchRequests">
            <div className="container">
                {
                    requests.map(request => {
                        return <>
                            <div className="cardd">
                                <div className="left-side coll">
                                    <p>Username: {request.username}</p>
                                    <p>Pitch name: {request.pitchName}</p>
                                    <p>Price: {request.price} JD</p>
                                    <div className="images">
                                        <img src={request.pic} alt="face1"></img>
                                    </div>
                                </div>
                                <div className="right-side coll">
                                    <div className="btn-container">
                                        <button className="accept">Accept</button>
                                        <button className="reject">Reject</button>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                        </>
                    })
                }
            </div>
        </div>
    );
};

export default AddPitchRequests;
