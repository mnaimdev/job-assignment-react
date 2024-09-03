import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const User = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`/user`)
            .then(function (response) {
                console.log(response);

                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                    setData(response.data.data);
                    console.log(response.data.data);
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

    const deleteUser = (id) => {
        console.log('Attempting to delete:', id);
        axios.delete(`/user/delete/${id}`)
            .then(function (response) {
                console.log('Delete response:', response);
                if (response.data.status === 'success') {
                    toast.success(response.data.message);

                    setData(prevData => {
                        const newData = prevData.filter(item => item.id !== id);
                        console.log('Updated Data:', newData);
                        return newData;
                    });
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
    }

    return (
        <>
            <div className="container">
                <Link to="/user/create" className="btn btn-primary btn-sm my-3">Create New</Link>
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center m-auto">User List</h3>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>
                                                        <Link to={`/user/edit/${item.id}`} className="btn btn-primary btn-sm">Edit</Link>
                                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => deleteUser(item.id)}>Delete</button>
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

export default User;
