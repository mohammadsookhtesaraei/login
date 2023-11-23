
import Login from "./components/Login";
import SingUp from "./components/SingUp";
import {Routes,Route,Navigate} from "react-router-dom"


const App = () => {
  return (
    <div>
     <Routes>
      <Route path="/singup" element={<SingUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Navigate to="singup"/>}/>
     </Routes>
    </div>
  );
}

export default App;
