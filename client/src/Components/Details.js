import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const Details = () => {
    const [userData, setUserData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const res = await fetch(`/induser/${id}`);
            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await res.json();
            setUserData(data[0]);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getData();
        };
        fetchData(); // Immediately invoke fetchData to fetch data initially

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]); // Add 'id' to the dependency array to fetch data when 'id' changes

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`/deleteuser/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Failed to delete user');
            }
            const deleteData = await res.json();
            console.log('User deleted:', deleteData);
            navigate('/');
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>User Details</h1>

            <div className="card" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <div className="add_btn">
                        <NavLink to={`/edit/${userData.id}`}>
                            <button className="btn btn-primary mx-2">
                                <i className="bi bi-pencil"></i>
                            </button>
                        </NavLink>
                        <button className="btn btn-danger" onClick={() => deleteUser(userData.id)}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">Name: <span>{userData.name}</span></h3>
                            <h3 className="mt-3">Age: <span>{userData.age}</span></h3>
                            <p className="mt-3"><i className="bi bi-envelope"></i> Email: <span>{userData.email}</span></p>
                            <p className="mt-3"><i className="bi bi-briefcase"></i> Occupation: <span>{userData.work}</span></p>
                        </div>
                        <div className="right_view col-lg-6 col-md-6 col-12">
                            <p className="mt-5"><i className="bi bi-phone"></i> Mobile: <span>+91 {userData.mobile}</span></p>
                            <p className="mt-3"><i className="bi bi-geo-alt"></i> Location: <span>{userData.add}</span></p>
                            <p className="mt-3">Description: <span>{userData.desc}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
