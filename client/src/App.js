import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from './components/Navbar.js';
import Register from "./components/Register.js";
import Details from './components/Details.js';
import Home from './components/Home.js';
import Edit from './components/Edit.js';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
    <Navbaar />
    <Home />
    <Register />
    <Edit />
    <Details />
    {/* <Routes>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/edit/:id" component={Edit} />
      <Route exact path="/view/:id" component={Details} />
    </Routes> */}
   
   </div>
  );
}

export default App;
