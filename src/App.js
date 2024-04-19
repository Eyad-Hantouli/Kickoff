import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import "./styles/normalize.css";
import "./styles/index.css";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="App">
      <Navbar isLogin={isLogin} toggleLogin={setIsLogin}/>
      <Home />
    </div>
  );
}

export default App;
