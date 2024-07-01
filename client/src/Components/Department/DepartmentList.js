import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { adddata, deldata, updatedata } from '../context/ContextProvider';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const { udata } = useContext(adddata);
    const { updata } = useContext(updatedata);
    const { dltdata, setDLTdata } = useContext(deldata);

    // Fetch departments from API
    const fetchDepartments = async () => {
        try {
            const res = await fetch("/departments", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch departments.");
            }

            const data = await res.json();
            // Sort departments by ID in ascending order
            data.sort((a, b) => a.did - b.did);
            setDepartments(data);
        } catch (error) {
            console.error("Error fetching departments:", error);
            // Notify user or handle error appropriately
        }
    };

    // Fetch departments on component mount
    useEffect(() => {
        fetchDepartments();
    }, []);

    // Handle department deletion
    const handleDeleteDepartment = async (id) => {
        try {
            const res = await fetch(`/deletedepartment/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete department.");
            }

            const deletedata = await res.json();
            setDLTdata(deletedata);
            fetchDepartments();
        } catch (error) {
            console.error("Error deleting department:", error);
            // Notify user or handle error appropriately
        }
    };

    return (
        <>
            {udata && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{udata.dname}</strong> added successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            {updata && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{updata.dname}</strong> updated successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            {dltdata && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{dltdata.dname}</strong> deleted successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            <div className="mt-5">
                <div className="container">
                <div className="row mt-3 mb-2">
    <div className="col-6 d-flex justify-content-start">
        <NavLink to="/home" className="btn btn-secondary">
            Back to Employees
        </NavLink>
    </div>
    <div className="col-6 d-flex justify-content-end">
        <NavLink to="/add-department" className="btn btn-primary">
            Add Department
        </NavLink>
    </div>
</div>


                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">ID</th>
                                <th scope="col">Department Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department) => (
                                <tr key={department.did}>
                                    <th scope="row">{department.did}</th>
                                    <td>{department.dname}</td>
                                    <td className="d-flex justify-content-between">
                                        <NavLink to={`/updatedepartment/${department.did}`}>
                                            <button className="btn btn-primary">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                        </NavLink>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteDepartment(department.did)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DepartmentList;
