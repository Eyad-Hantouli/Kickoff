import "../../styles/ban_list.css";

const BanList = () => {

    const users = [
        {
            username: "eyad_h",
            role: "User",
            name: "Eyad Hantouli",
            pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        },
        {
            username: "yamen9090",
            role: "User",
            name: "Yamen Amjad",
            pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
    ]

    return (
        <div className="BanList">
            <div className="container">
                {
                    users.map(user => {
                        return <div className="card-holder">
                            <div className="img-holder">
                                <img className="card-img-top" src={user.pic} alt="img" />
                            </div>
                            <div className="card" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className="card-text">
                                    Username: {user.username}
                                    </p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Role: {user.role}</li>
                                </ul>
                                <div className="card-body">
                                    <button>Unblock</button>
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default BanList;
