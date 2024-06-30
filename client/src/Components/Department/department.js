import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const DepartmentRegister = () => {
  const [inpval, setINP] = useState({
    did: "",
    dname: "",
  });

  // Handle input changes
  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const addDepartment = async (e) => {
    e.preventDefault();

    const { did, dname } = inpval;

    if (!did.trim()) {
      alert("Department ID is required.");
    } else if (!dname.trim()) {
      alert("Department name is required.");
    } else {
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
        setINP({
          did: "",
          dname: "",
        });
      } catch (error) {
        console.error("Error:", error.message);
        alert("Error adding department.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <NavLink to="/" className="btn btn-secondary mb-3">
        Back to Home
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
              value={inpval.did}
              onChange={setdata}
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
              value={inpval.dname}
              onChange={setdata}
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
