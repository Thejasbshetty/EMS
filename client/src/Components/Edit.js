import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updatedata } from './context/ContextProvider';

const Edit = () => {
    const { setUPdata } = useContext(updatedata);
    const navigate = useNavigate();
    const { id } = useParams();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: "",
        salary: "",
        dept_id: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/induser/${id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await res.json();
                if (data.length > 0) {
                    setINP(data[0]);
                } else {
                    console.log("No data found");
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setINP((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, work, add, mobile, desc, age, salary, dept_id } = inpval;

        try {
            const res = await fetch(`/updateuser/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, work, add, mobile, desc, age, salary, dept_id
                })
            });

            if (!res.ok) {
                throw new Error('Failed to update user');
            }

            const data = await res.json();
            setUPdata(data);
            navigate("/");
        } catch (error) {
            console.error("Failed to update data:", error);
            // Handle error state or alert user
        }
    };

    return (
        <div className="container">
            {/* <NavLink to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</NavLink> */}
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={handleChange} name="name" className="form-control" id="name" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={inpval.email} onChange={handleChange} name="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="text" value={inpval.age} onChange={handleChange} name="age" className="form-control" id="age" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input type="number" value={inpval.mobile} onChange={handleChange} name="mobile" className="form-control" id="mobile" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="work" className="form-label">Work</label>
                        <input type="text" value={inpval.work} onChange={handleChange} name="work" className="form-control" id="work" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="add" className="form-label">Address</label>
                        <input type="text" value={inpval.address} onChange={handleChange} name="add" className="form-control" id="add" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="salary" className="form-label">Salary</label>
                        <input type="text" value={inpval.salary} onChange={handleChange} name="salary" className="form-control" id="salary" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="dept_id" className="form-label">Department ID</label>
                        <input type="text" value={inpval.dept_id} onChange={handleChange} name="dept_id" className="form-control" id="dept_id" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <textarea name="desc" value={inpval.description} onChange={handleChange} className="form-control" id="desc" cols="30" rows="5"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
