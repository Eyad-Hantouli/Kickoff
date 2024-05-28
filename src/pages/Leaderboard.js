import { useEffect, useState } from "react";
import "../styles/leaderboard.css"
import axios from "axios";

const Leaderboard = () => {

    let rankNumber = 0;
    const [limit, setLimit] = useState(10);

    function render_show_more_btn() {
        console.log(rankNumber + ", " + limit);
        return rankNumber < leaderboard.length;
    }

    const [leaderboard, setLeaderboard] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!isFetched) {
          axios.get('http://localhost:8080/system/leaderboard')
            .then(response => {
              console.log(response.data);
              setLeaderboard(response.data);
              setIsFetched(true);
            })
            .catch(error => {
              console.error("There was an error fetching the cities!", error);
            });
        }
      }, [isFetched]);

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
                    {leaderboard.map((user) => {
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
                        setLimit(current => Math.min(current + 10, leaderboard.length))
                    }}>
                        <p>Show More</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default Leaderboard;