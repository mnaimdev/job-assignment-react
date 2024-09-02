import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AssignRole = () => {
    const [data, setData] = useState([]); // Initialize with an empty array

    useEffect(() => {
        axios.get(`/assign_role`)
        .then(function (response) {
            console.log(response);

            if (response.data.status === 'success') {
                toast.success(response.data.message);
                const fetchedData = response.data.data.map(item => ({
                    id: item.id, // Assuming there's an ID
                    name: item.name,
                    role: item.roles[0] || "No role assigned" // Handling possible missing role
                }));
                setData(fetchedData);
            }

            if (response.data.status === 'error') {
                const errorMessage = response.data.message;
                toast.error(errorMessage);
            }
        })
        .catch(function (error) {
            console.log(error);
            let errors = error.response?.data?.errors || "An error occurred";
            toast.error(errors);
        });
    }, []);

    return (
        <>
            <div className="container">
                <Link to="/assign_role/create" className="btn btn-primary btn-sm my-3">Create New</Link>
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center m-auto">Assigned User List</h3>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.role}</td>
                                                    <td>
                                                        <Link to={`/assign_role/edit/${item.id}`} className="btn btn-primary">Edit</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AssignRole;
