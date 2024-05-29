import { useEffect, useState } from "react";
import "../../styles/add_pitch_requests.css";
import axios from "axios";

const AddPitchRequests = () => {

    // const requests = [
    //     {
    //         username: "eyad_h",
    //         pitchName: "Parax",
    //         price: "3.5",
    //         pic: "https://img.yumpu.com/28393177/1/500x640/broad-green-fairfield-amp-waddon-16-10-12-croydon-council.jpg"
    //     },
    //     {
    //         username: "yamen9090",
    //         pitchName: "Parax",
    //         price: "3.5", 
    //         pic: "https://img.yumpu.com/28393177/1/500x640/broad-green-fairfield-amp-waddon-16-10-12-croydon-council.jpg"
    //     }
    // ]

    const [requests, setRequests] = useState();
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!isFetched) {
            axios.get('http://localhost:8080/system/get-add-pitch-requests')
                .then(response => {
                    console.log("HOOOOOOOOOOOOOOOOOOOOOOOOO:");
                    console.log(response.data[0]);
                    setRequests(response.data);
                    setIsFetched(true);
                })
                .catch(error => {
                    console.error("There was an error fetching the cities!", error);
                    setRequests([]);
            });
        }
    }, [isFetched]);

    const handleReject = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:8080/system/reject-add-pitch-requests/${id}`, { id });
          if (response.status === 200) {
            console.log('Request rejected successfully');
          } else {
            console.log('Failed to reject request');
          }
        } catch (error) {
          console.error('Error:', error);
          console.log('Error rejecting request');
        }
      };
    
      const handleAccept = async (id) => {
        try {
          const response = await axios.put(`http://localhost:8080/system/accept-add-pitch-requests/${id}`, { id });
          if (response.status === 200) {
            console.log('Request accepted successfully');
          } else {
            console.log('Failed to accept request');
          }
        } catch (error) {
          console.error('Error:', error);
          console.log('Error accepting request' + " " + id);
        }
      };

    if(!requests) return <>Loading...</>

    return (
        <div className="AddPitchRequests">
            <div className="container">
                {
                    requests.map(request => {
                        return <>
                            <div className="cardd">
                                <div className="left-side coll">
                                    <p>Username: {request.username}</p>
                                    <p>city: {request.city}</p>
                                    <p>name: {request.pitchName}</p>
                                    <p>address: {request.address}</p>
                                    <div className="images">
                                        <img src={`data:image/jpeg;base64,${request.ownershipDocumentation}`} alt="ownership documentation"></img>
                                    </div>
                                </div>
                                <div className="right-side coll">
                                    <div className="btn-container">
                                        <button className="accept" onClick={() => {handleAccept(request.id)}}>Accept</button>
                                        <button className="reject" onClick={() => {handleAccept(request.id)}}>Reject</button>
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
