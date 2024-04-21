import { useState } from "react";
import "../styles/leaderboard.css"

const Leaderboard = () => {

    let rankNumber = 0;
    const [limit, setLimit] = useState(10);

    function render_show_more_btn() {
        console.log(rankNumber + ", " + limit);
        return rankNumber < usersList.length;
    }

    const usersList = [
        {"name": "Yamen Amjad", "username": "____0809", "score": "800"},
        {"name": "Eyad Hantouli", "username": "eyad_h", "score": "650"},
        {"name": "Haytham Shreydah", "username": "shreydah_02_82186", "score": "-500"},
        {"name": "Yamen Amjad", "username": "____0809", "score": "800"},
        {"name": "Eyad Hantouli", "username": "eyad_h", "score": "650"},
        {"name": "Haytham Shreydah", "username": "shreydah_02_82186", "score": "-500"},
        {"name": "Yamen Amjad", "username": "____0809", "score": "800"},
        {"name": "Eyad Hantouli", "username": "eyad_h", "score": "650"},
        {"name": "Haytham Shreydah", "username": "shreydah_02_82186", "score": "-500"},
        {"name": "Yamen Amjad", "username": "____0809", "score": "800"},
        {"name": "Eyad Hantouli", "username": "eyad_h", "score": "650"},
        {"name": "Haytham Shreydah", "username": "shreydah_02_82186", "score": "-500"},
        {"name": "Yamen Amjad", "username": "____0809", "score": "800"},
        {"name": "Eyad Hantouli", "username": "eyad_h", "score": "650"},
        {"name": "Haytham Shreydah", "username": "shreydah_02_82186", "score": "-500"},
        {"name": "Yamen Amjad", "username": "____0809", "score": "800"},
        {"name": "Eyad Hantouli", "username": "eyad_h", "score": "650"},
        {"name": "Haytham Shreydah", "username": "shreydah_02_82186", "score": "-500"},
        {"name": "Eyad Hantouli", "username": "eyad_h", "score": "650"},
        {"name": "Haytham Shreydah", "username": "shreydah_02_82186", "score": "-500"},
        {"name": "Haytham Shreydah", "username": "shreydah_02_82186", "score": "-500"},
    ];

    return (
        <div className="Leaderboard">
            <br />
            <div className="container">
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                    {usersList.map((user) => {
                        if (rankNumber >= limit) return<></>;
                        rankNumber++;
                        return <tr>
                            <th scope="row">{rankNumber}</th>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.score}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
                {
                    render_show_more_btn() && 
                    <div className="container show-more-button" onClick={() => {
                        setLimit(current => Math.min(current + 10, usersList.length))
                    }}>
                        <p>Show More</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default Leaderboard;