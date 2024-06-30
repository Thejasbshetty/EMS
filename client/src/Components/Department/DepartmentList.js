import React, { useState, useEffect } from "react";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("/api/departments");
        if (!res.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await res.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Departments</h2>
      {departments.length > 0 ? (
        <ul className="list-group">
          {departments.map((department) => (
            <li key={department.did} className="list-group-item">
              {department.dname} (ID: {department.did})
            </li>
          ))}
        </ul>
      ) : (
        <p>No departments found.</p>
      )}
    </div>
  );
};

export default DepartmentList;
