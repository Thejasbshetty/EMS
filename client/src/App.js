import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from './components/Navbar';
import Register from "./components/Register";
import Details from './components/Details';
import Home from './components/Home';
import Edit from './components/Edit';
import AddDepartment from './components/Department/department';
import DepartmentList from './components/Department/DepartmentList';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbaar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        <Route path="/add-department" element={<AddDepartment />} />
        <Route exact path="/view/:id" element={<Details />} />
        <Route exact path="/departments" component={<DepartmentList />} />
      </Routes>
    </div>
  );
}

export default App;
