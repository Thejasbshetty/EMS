import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { updatedata } from '../context/ContextProvider';

const EditDepartment = () => {
    const { setUPdata } = useContext(updatedata);
    const navigate = useNavigate();
    const { id } = useParams();

    const [inpval, setINP] = useState({
        did: "",
        dname: "",
        description: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/department/${id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch department data');
                }
                const data = await res.json();
                if (data) {
                    setINP(data);
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
        const { did, dname, description } = inpval;

        try {
            const res = await fetch(`/updatedepartment/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    did,
                    dname,
                    description
                })
            });

            if (!res.ok) {
                throw new Error('Failed to update department');
            }

            const data = await res.json();
            setUPdata(data);
            navigate("/departments");
        } catch (error) {
            console.error("Failed to update data:", error);
        }
    };

    return (
        <div className="container">
            <NavLink to="/departments">Back to Departments</NavLink>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="did" className="form-label">Department ID</label>
                        <input type="text" value={inpval.did} onChange={handleChange} name="did" className="form-control" id="did" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="dname" className="form-label">Department Name</label>
                        <input type="text" value={inpval.dname} onChange={handleChange} name="dname" className="form-control" id="dname" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="description" value={inpval.description} onChange={handleChange} className="form-control" id="description" cols="30" rows="5"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EditDepartment;
