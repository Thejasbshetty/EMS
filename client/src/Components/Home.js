import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider';

const Home = () => {
    const [getuserdata, setUserdata] = useState([]);
    const { udata } = useContext(adddata);
    const { updata } = useContext(updatedata);
    const { dltdata, setDLTdata } = useContext(deldata);

    // Define the getdata function
    const getdata = async () => {
        try {
            const res = await fetch("/getusers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await res.json();
            setUserdata(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getdata(); // Use the defined getdata function here
    }, []);

    const deleteuser = async (id) => {
        try {
            const res = await fetch(`/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Failed to delete user");
            }

            const deletedata = await res.json();
            setDLTdata(deletedata);
            getdata();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <>
            {udata && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{udata.name}</strong> added successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            {updata && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{updata.name}</strong> updated successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            {dltdata && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{dltdata.name}</strong> deleted successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Register</NavLink>
                    </div>

                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getuserdata.map((element, index) => (
                                <tr key={element.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.work}</td>
                                    <td>{element.mobile}</td>
                                    <td className="d-flex justify-content-between">
                                        <NavLink to={`view/${element.id}`}>
                                            <button className="btn btn-success">
                                                <i className="bi bi-eye"></i>
                                            </button>
                                        </NavLink>
                                        <NavLink to={`edit/${element.id}`}>
                                            <button className="btn btn-primary">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                        </NavLink>
                                        <button className="btn btn-danger" onClick={() => deleteuser(element.id)}>
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

export default Home;
