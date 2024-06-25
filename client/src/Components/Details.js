import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const Details = () => {
    const [getUserdata, setUserdata] = useState(null);
    const { id } = useParams();
    const history = useNavigate();

    const getData = async () => {
        try {
            const res = await fetch(`/induser/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Error fetching data");
            }

            const data = await res.json();
            setUserdata(data[0]);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Error deleting user");
            }

            const deleteData = await res.json();
            console.log("User deleted:", deleteData);
            history.push("/");
        } catch (error) {
            console.error(error.message);
        }
    };

    if (!getUserdata) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome Harsh Pathak</h1>

            <div className="card" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <div className="add_btn">
                        <NavLink to={`/edit/${getUserdata.id}`}>
                            <button className="btn btn-primary mx-2">
                                <i className="bi bi-pencil"></i>
                            </button>
                        </NavLink>
                        <button className="btn btn-danger" onClick={() => deleteUser(getUserdata.id)}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">Name: <span>{getUserdata.name}</span></h3>
                            <h3 className="mt-3">Age: <span>{getUserdata.age}</span></h3>
                            <p className="mt-3"><i className="bi bi-envelope"></i> Email: <span>{getUserdata.email}</span></p>
                            <p className="mt-3"><i className="bi bi-briefcase"></i> Occupation: <span>{getUserdata.work}</span></p>
                        </div>
                        <div className="right_view col-lg-6 col-md-6 col-12">
                            <p className="mt-5"><i className="bi bi-phone"></i> Mobile: <span>+91 {getUserdata.mobile}</span></p>
                            <p className="mt-3"><i className="bi bi-geo-alt"></i> Location: <span>{getUserdata.add}</span></p>
                            <p className="mt-3">Description: <span>{getUserdata.desc}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
