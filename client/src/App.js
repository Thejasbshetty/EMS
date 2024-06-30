import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from './components/Navbar';
import Register from "./components/Register";
import Details from './components/Details';
import Home from './components/Home';
import Edit from './components/Edit';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbaar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        <Route exact path="/view/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
