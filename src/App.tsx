import "./App.css";
import {Routes, Route} from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Overview";
import Vendors from "./Pages/Vendors";
import Riders from "./Pages/Riders";
import Finance from "./Pages/Finance";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/overview" element={<Dashboard />} />
      <Route path="/orders" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/riders" element={<Riders />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/validation" element={<Dashboard />} />
      <Route path="/network-brain" element={<Dashboard />} />
    </Routes>
  );
}

export default App;