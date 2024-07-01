import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import Login from './components/Login/login';

function App() {
    // Get the current location using useLocation hook
    const location = useLocation();

    // Conditionally render the Navbar based on the current path
    const renderNavbar = () => {
        if (location.pathname === '/' ) {
            return null; // Don't render Navbar on Login or Home page
        }
        return <Navbar />;
    };

    return (
        <div>
            {renderNavbar()}
            <Routes>
            <Route exact path="/" element={<Login />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/home/register" element={<Register />} />
                <Route exact path="/home/edit/:id" element={<Edit />} />
                <Route exact path="/add-department" element={<AddDepartment />} />
                <Route exact path="/home/view/:id" element={<Details />} />
                <Route exact path="/departments" element={<DepartmentList />} />
                <Route exact path="/updatedepartment/:id" element={<EditDepartment />} />
            </Routes>
        </div>
    );
}

export default App;
