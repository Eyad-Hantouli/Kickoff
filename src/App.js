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

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
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
            <Route exact path='/panel' element = {<>Hello User !</>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
