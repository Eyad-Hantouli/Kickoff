import { useEffect, useState } from "react";
import "../../styles/add_pitch_requests.css";
import axios from "axios";
import Loaderr from "../../components/Loader";
import { LoadingControlPanel } from "../../LoadingControlPanel";

const AddPitchRequests = () => {

    const [requests, setRequests] = useState();
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
      axios.get('http://localhost:8080/system/get-add-pitch-requests')
          .then(response => {
              setRequests(response.data);
          })
          .catch(error => {
              console.error("There was an error fetching the cities!", error);
              setRequests([]);
      });

      setTimeout(() => {
        setLoading(false);
    }, LoadingControlPanel.TIME)
    }, [update]);

    const handleReject = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:8080/system/reject-add-pitch-requests/${id}`, { id });
          if (response.status === 200) {
            setUpdate(curr => !curr);
          } else {
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const handleAccept = async (id) => {
        try {
          const response = await axios.put(`http://localhost:8080/system/accept-add-pitch-requests/${id}`, { id });
          if (response.status === 200) {
            setUpdate(curr => !curr);
          } else {
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    if(loading) return <Loaderr />

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
            {requests.length === 0 && <div className="empty-word">No Requests Yet.</div>}
        </div>
    );
};

export default AddPitchRequests;
