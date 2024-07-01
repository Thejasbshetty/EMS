import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate(); // Using useNavigate hook from React Router v6

    // Handle logout button click
    const handleLogout = () => {
        // Implement logout functionality here if needed
        console.log('Logged out');
        // Redirect to login page
        navigate('/');
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        EMS
                    </NavLink>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" exact to="/home">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    exact
                                    to="/departments"
                                >
                                    Department
                                </NavLink>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-outline-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
