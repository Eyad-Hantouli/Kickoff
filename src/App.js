import Navbar from "./components/Navbar";
import Home from "./pages/Home";


import "./styles/normalize.css";
import "./styles/index.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRoute from "./private routes/UserRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import MatchHistory from "./pages/MatchHistory";
import RefereeForm from "./components/RefereeForm";
import Pitch from "./pages/Pitches";
import Pitches from "./pages/Pitches";
import Matches from "./pages/Matches";
import MatchRegister from "./pages/MatchRegister";
import AdminRoute from "./private routes/AdminRoute";
import AdminPanel from "./pages/admin_pages/AdminPanel";
import UpgradeAccountRequests from "./pages/admin_pages/UpgradeAccountRequests";
import AddPitchRequests from "./pages/admin_pages/AddPitchRequests";
import BanList from "./pages/admin_pages/BanList";
import PitchOwnerRoute from "./private routes/PitchOwnerRoute";
import MatchesSchedule from "./pages/pitch_owner_pages/MatchesSchedule";
import axios from "axios";


function App() {

  


  const [user, setUser] = useState();
  const [isThereAMatch, setIsThereAMatch] = useState(false);

  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Get the username from LocalStorage
    const storedUsername = localStorage.getItem('username');

    // Set the username state
    setUsername(storedUsername);

    let state = {};
    
    if (storedUsername) {
      state.login = true;
      state.username = storedUsername;
      state.id = storedUsername;
      axios.get(`http://localhost:8080/system/get-role-by-username/${storedUsername}`)
      .then(response => {
        console.log(response);
        
        state.pitchOwner = response.data.role === 'PITCH_OWNER'; // Assuming the API returns the role as an object with a property 'role'
        state.superAdmin = response.data.role === 'SUPER_ADMIN';
        state.admin = response.data.role === 'ADMIN';
      })
      .catch(error => {
        console.error('Error fetching user role:', error);
        localStorage.removeItem("username");
      });
    }
    
    console.log(storedUsername)

    setUser(state);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <>

    { !isThereAMatch &&
      <div className="App">
        <BrowserRouter>
          <Navbar user={user} setUser={setUser}/>
          <Routes>
            {/* Public Routes */}
            <Route exact path='/' element = { <Home /> } />
            <Route exact path='/register' element = { <Register isLogin={user.login}/> } />
            <Route exact path='/login' element = { <Login isLogin={user.login}/> } />
            <Route exact path='/leaderboard' element = { <Leaderboard isLogin={user.login}/> } />

            {/* Private Routes */}
            <Route element={<UserRoute isLogin={user.login}/>}>
              <Route path="/profile/:username" element={<Profile user={user}/>} />
              <Route path="/matchhistory/:username" element={<MatchHistory />} />
              
              <Route path="/pitches/" element={<Pitches user={user}/>} />
              <Route path="/pitches/:pitchId/matches" element={<Matches />} />

              <Route path="/pitches/:pitchId/matches/:matchId" element={<MatchRegister />} />

              <Route element={<AdminRoute user={user}/>}>
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/admin-panel/upgrade-account-requests" element={<UpgradeAccountRequests />} />
                <Route path="/admin-panel/add-pitch-requests" element={<AddPitchRequests />} />
                <Route path="/admin-panel/ban-list" element={<BanList />} />
              </Route>

              <Route element={<PitchOwnerRoute user={user}/>}>
                <Route path="/pitches/:pitchId/schedule" element={<MatchesSchedule />} />
              </Route>
            </Route>
            
          </Routes>
        </BrowserRouter>
      </div>
    }

    { isThereAMatch && 
       <div className="App">
        <RefereeForm />
       </div>
    }

    </>
  );
}

export default App;
