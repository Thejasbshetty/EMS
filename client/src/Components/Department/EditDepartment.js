import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { updatedata } from '../context/ContextProvider'; // Adjust the path as needed

const EditDepartment = () => {
    const { setUPdata } = useContext(updatedata); // Ensure useContext usage is correct
    const navigate = useNavigate();
    const { id } = useParams();

    const [inpval, setINP] = useState({
        did: "",
        dname: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/department/${id}`); // Adjust endpoint as per your backend
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
        const { did, dname } = inpval;

        try {
            const res = await fetch(`/updatedepartment/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    did,
                    dname
                })
            });

            if (!res.ok) {
                throw new Error('Failed to update department');
            }

            const data = await res.json();
            setUPdata(data); // Assuming this updates some global context
            navigate("/departments"); // Redirect to departments page
        } catch (error) {
            console.error("Failed to update data:", error);
            // Handle error appropriately, e.g., show error message to user
        }
    };

    return (
        <div className="container">
            <NavLink to="/departments" className="btn btn-secondary mb-3">Back to Departments</NavLink>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="did" className="form-label">Department ID</label>
                        <input type="text" className="form-control" id="did" name="did" value={inpval.did} onChange={handleChange} />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="dname" className="form-label">Department Name</label>
                        <input type="text" className="form-control" id="dname" name="dname" value={inpval.dname} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditDepartment;
