import { useEffect, useState } from "react";
import "../../styles/upgrade-account-requests.css";
import axios from "axios";

const UpgradeAccountRequests = () => {

    const [requests, setRequests] = useState();
    const [update, setUpdate] = useState(false);

    useEffect(() => {
      axios.get('http://localhost:8080/system/get-upgrade-account-requests')
        .then(response => {
          setRequests(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the cities!", error);
          setRequests([]);
      });
    }, [update]);

    const handleReject = async (username) => {
        try {
          const response = await axios.delete(`http://localhost:8080/system/reject-upgrade-account-requests/${username}`, { username });
          if (response.status === 200) {
          } else {
          }
          setUpdate(curr => !curr);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const handleAccept = async (username) => {
        try {
          const response = await axios.put(`http://localhost:8080/system/accept-upgrade-account-requests/${username}`, { username });
          if (response.status === 200) {
          } else {
          }
          setUpdate(curr => !curr);
        } catch (error) {
          console.error('Error:', error);
          console.error('Error accepting request' + " " + username);
        }
      };
      

    // const requests = [
    //     {
    //         username: "eyad_h", 
    //         pic1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8QNnjJVos5rihxLflBCmIg4Y0Nmj2WnrFQ&usqp=CAU",
    //         pic2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8QNnjJVos5rihxLflBCmIg4Y0Nmj2WnrFQ&usqp=CAU"
    //     },
    //     {
    //         username: "yamen9090", 
    //         pic1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8QNnjJVos5rihxLflBCmIg4Y0Nmj2WnrFQ&usqp=CAU",
    //         pic2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8QNnjJVos5rihxLflBCmIg4Y0Nmj2WnrFQ&usqp=CAU"
    //     }
    // ]

    if(!requests) return <>Loading...</>

    return (
        <div className="UpgradeAccountRequests">
            <div className="container">
                {
                    requests.map(row => {
                        return <>
                            <div className="cardd">
                                <div className="left-side coll">
                                    <p>Username: {row.username}</p>
                                    <div className="images">
                                        <img src={`data:image/jpeg;base64,${row.face1}`} alt="face1"></img>
                                        <img src={`data:image/jpeg;base64,${row.face2}`} alt="face2"></img>
                                    </div>
                                </div>
                                <div className="right-side coll">
                                    <div className="btn-container">
                                        <button className="accept" onClick={() => {handleAccept(row.username)}}>Accept</button>
                                        <button className="reject" onClick={() => {handleReject(row.username)}}>Reject</button>
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

export default UpgradeAccountRequests;
