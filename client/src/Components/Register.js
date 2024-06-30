import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { adddata } from './context/ContextProvider';

const Register = () => {
    const { setUdata } = useContext(adddata);

    const [inpval, setINP] = useState({
        name: '',
        email: '',
        age: '',
        mobile: '',
        work: '',
        address: '',
        description: ''
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, work, address, mobile, description, age } = inpval;

        if (!name.trim()) {
            alert('Name is required');
        } else if (!email.trim()) {
            alert('Email is required');
        } else if (!email.includes('@')) {
            alert('Enter a valid email');
        } else if (!age.trim()) {
            alert('Age is required');
        } else if (!mobile.trim()) {
            alert('Mobile is required');
        } else if (!work.trim()) {
            alert('Work is required');
        } else if (!address.trim()) {
            alert('Address is required');
        } else {
            try {
                const res = await fetch('/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        work,
                        address,
                        mobile,
                        description,
                        age
                    })
                });

                if (!res.ok) {
                    throw new Error('Failed to add data');
                }

                const data = await res.json();
                console.log(data);
                setUdata(data);
                alert('Data added successfully');
                setINP({
                    name: '',
                    email: '',
                    age: '',
                    mobile: '',
                    work: '',
                    address: '',
                    description: ''
                });
            } catch (error) {
                console.error('Error:', error.message);
                alert('Error adding data');
            }
        }
    };

    return (
        <div className="container mt-4">
            <NavLink to="/" className="btn btn-secondary mb-3">
                Back to Home
            </NavLink>
            <form>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={inpval.name}
                            onChange={setdata}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={inpval.email}
                            onChange={setdata}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="age" className="form-label">
                            Age
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="age"
                            name="age"
                            value={inpval.age}
                            onChange={setdata}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="mobile" className="form-label">
                            Mobile
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobile"
                            name="mobile"
                            value={inpval.mobile}
                            onChange={setdata}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="work" className="form-label">
                            Work
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="work"
                            name="work"
                            value={inpval.work}
                            onChange={setdata}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={inpval.address}
                            onChange={setdata}
                            required
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={inpval.description}
                            onChange={setdata}
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={addinpdata}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
