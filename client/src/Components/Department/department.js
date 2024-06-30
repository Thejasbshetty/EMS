import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const DepartmentRegister = () => {
  const [formData, setFormData] = useState({
    did: "",
    dname: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const addDepartment = async (e) => {
    e.preventDefault();

    const { did, dname } = formData;

    if (!did.trim()) {
      alert("Department ID is required.");
      return;
    }

    if (!dname.trim()) {
      alert("Department name is required.");
      return;
    }

    try {
      const res = await fetch("/add-department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          did,
          dname,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add department.");
      }

      const data = await res.json();
      console.log(data);
      alert("Department added successfully.");
      setFormData({
        did: "",
        dname: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error adding department.");
    }
  };

  return (
    <div className="container mt-4">
      <NavLink to="/departments" className="btn btn-secondary mb-3">
        Back to Departments
      </NavLink>
      <form onSubmit={addDepartment}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="did" className="form-label">
              Department ID
            </label>
            <input
              type="text"
              className="form-control"
              id="did"
              name="did"
              value={formData.did}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="dname" className="form-label">
              Department Name
            </label>
            <input
              type="text"
              className="form-control"
              id="dname"
              name="dname"
              value={formData.dname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DepartmentRegister;
