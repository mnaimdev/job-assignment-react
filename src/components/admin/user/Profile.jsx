import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the currently logged-in user's details
        axios.get('/user/profile')
            .then(response => {
                if (response.data.status === 'success') {
                    console.log(response);

                    setUser(response.data.data);
                } else {
                    toast.error('Failed to load user details');
                }
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                toast.error('Failed to load user details');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const logoutUser = () => {
        axios
        .post(`/logout`)
        .then(function (response) {
          if (response.data.status === "success") {
            toast.success(response.data.message);
  
           navigate('/');
          }
  
          if (response.data.status === "error") {
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            <h3 className="text-center m-auto">User Profile</h3>
                        </div>
                        <div className="card-body">
                            {user ? (
                                <>
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <button className='btn btn-sm btn-dark' onClick={() => logoutUser()}>Logout</button>
                                </>
                            ) : (
                                <p>No user details available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
