import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import AddDepartment from './components/Department/department';
import DepartmentList from './components/Department/DepartmentList';
import EditDepartment from './components/Department/EditDepartment';

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/edit/:id" element={<Edit />} />
                <Route exact path="/add-department" element={<AddDepartment />} />
                <Route exact path="/view/:id" element={<Details />} />
                <Route exact path="/departments" element={<DepartmentList />} />
                <Route exact path="/updatedepartment/:id" element={<EditDepartment />} />
            </Routes>
        </div>
    );
}

export default App;
