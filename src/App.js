import Navbar from "./components/Navbar";
import Home from "./pages/Home";


import "./styles/normalize.css";
import "./styles/index.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRoute from "./private routes/UserRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import MatchHistory from "./pages/MatchHistory";
import RefereeForm from "./components/RefereeForm";

function App() {
  const [isLogin, setIsLogin] = useState(1);
  const [isThereAMatch, setIsThereAMatch] = useState(0);
  return (
    <>

    { !isThereAMatch &&
      <div className="App"> 
        <BrowserRouter>
          <Navbar isLogin={isLogin} toggleLogin={setIsLogin}/>
          <Routes>
            {/* Public Routes */}
            <Route exact path='/' element = { <Home /> } />
            <Route exact path='/register' element = { <Register isLogin={isLogin}/> } />
            <Route exact path='/login' element = { <Login isLogin={isLogin}/> } />
            <Route exact path='/leaderboard' element = { <Leaderboard isLogin={isLogin}/> } />

            {/* Private Routes */}
            <Route element={<UserRoute isLogin={isLogin}/>}>
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/matchhistory/:username" element={<MatchHistory />} />
              <Route exact path='/panel' element = {<>Hello User !</>} />
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
