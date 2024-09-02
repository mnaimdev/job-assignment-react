import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const UserEdit = () => {
    const { id } = useParams(); // Get user ID from URL parameters
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '' });

    // Validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('The name field is required')
            .min(2, 'Name must be at least 2 characters long'),
        email: Yup.string()
            .email('Invalid email address')
            .required('The email field is required'),
    });

    // Fetch the user data for editing
    useEffect(() => {
        axios.get(`/user/edit/${id}`)
            .then(response => {
                if (response.data.status === 'success') {
                    setUser(response.data.data);
                } else {
                    toast.error(response.data.message);
                    navigate('/user');
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('Failed to load user data');
                navigate('/user');
            });
    }, [id, navigate]);

    // Handle form submission
    const handleSubmit = (values, { setSubmitting }) => {
        axios.put(`/user/update/${id}`, values)
            .then(response => {
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                    navigate('/user');
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => {
                console.error(error);
                if (error.response && error.response.data && error.response.data.errors) {
                    const errors = error.response.data.errors;
                    if (errors.email) {
                        toast.error(errors.email[0]);
                    } else {
                        toast.error('An error occurred while updating the user');
                    }
                } else {
                    toast.error('An error occurred while updating the user');
                }
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card mt-5">
                        <div className="card-header bg-dark text-white">
                            <h3 className="text-center m-auto">Update User</h3>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={{ name: user.name, email: user.email}}
                                enableReinitialize
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="form-group mb-3">
                                            <label htmlFor="name">Name</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="email">Email</label>
                                            <Field
                                                type="email"
                                                name="email"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                        
                                        <div>
                                            <button
                                                type="submit"
                                                className="btn btn-dark btn-sm"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Updating...' : 'Update'}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEdit;
