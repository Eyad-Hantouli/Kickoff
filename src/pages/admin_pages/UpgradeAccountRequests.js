import "../../styles/upgrade-account-requests.css";

const UpgradeAccountRequests = () => {

    const requests = [
        {
            username: "eyad_h", 
            pic1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8QNnjJVos5rihxLflBCmIg4Y0Nmj2WnrFQ&usqp=CAU",
            pic2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8QNnjJVos5rihxLflBCmIg4Y0Nmj2WnrFQ&usqp=CAU"
        },
        {
            username: "yamen9090", 
            pic1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8QNnjJVos5rihxLflBCmIg4Y0Nmj2WnrFQ&usqp=CAU",
            pic2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8QNnjJVos5rihxLflBCmIg4Y0Nmj2WnrFQ&usqp=CAU"
        }
    ]

    return (
        <div className="UpgradeAccountRequests">
            <div className="container">
                {
                    requests.map(request => {
                        return <>
                            <div className="cardd">
                                <div className="left-side coll">
                                    <p>Username: {request.username}</p>
                                    <div className="images">
                                        <img src={request.pic1} alt="face1"></img>
                                        <img src={request.pic2} alt="face2"></img>
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

export default UpgradeAccountRequests;
